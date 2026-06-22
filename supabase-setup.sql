-- =============================================
-- COMPLETE SETUP: Schema + Seed Data
-- Run this ONCE in Supabase SQL Editor
-- (If schema already exists, skip to INSERT section at bottom)
-- =============================================

-- 1. PROFILES TABLE (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name text,
    email text,
    phone text,
    address text,
    role text NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member')),
    tier text NOT NULL DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
    points integer NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    price numeric(12,2) NOT NULL,
    stock integer NOT NULL DEFAULT 0,
    image_url text,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    order_number text UNIQUE NOT NULL,
    status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
    subtotal numeric(12,2) NOT NULL,
    discount_percent integer NOT NULL DEFAULT 0,
    discount_amount numeric(12,2) NOT NULL DEFAULT 0,
    total numeric(12,2) NOT NULL,
    points_earned integer NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- 4. ORDER_ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id uuid NOT NULL REFERENCES public.products(id),
    product_name text NOT NULL,
    price numeric(12,2) NOT NULL,
    quantity integer NOT NULL,
    subtotal numeric(12,2) NOT NULL
);

-- HELPER FUNCTION
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER AS $$
    SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin');
$$;

-- TRIGGER: Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)));
    RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- TRIGGER: Auto-update tier when points change
CREATE OR REPLACE FUNCTION public.update_tier_on_points()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
    IF NEW.points >= 5000 THEN NEW.tier := 'platinum';
    ELSIF NEW.points >= 3000 THEN NEW.tier := 'gold';
    ELSIF NEW.points >= 1000 THEN NEW.tier := 'silver';
    ELSE NEW.tier := 'bronze';
    END IF;
    RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS trg_update_tier ON public.profiles;
CREATE TRIGGER trg_update_tier BEFORE UPDATE OF points ON public.profiles
    FOR EACH ROW WHEN (OLD.points IS DISTINCT FROM NEW.points) EXECUTE FUNCTION public.update_tier_on_points();

-- TRIGGER: Add points when order created
CREATE OR REPLACE FUNCTION public.add_points_on_order()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE v_points integer;
BEGIN
    v_points := floor(NEW.subtotal / 1000)::integer;
    UPDATE public.orders SET points_earned = v_points WHERE id = NEW.id;
    UPDATE public.profiles SET points = points + v_points WHERE id = NEW.user_id;
    RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS trg_add_points ON public.orders;
CREATE TRIGGER trg_add_points AFTER INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION public.add_points_on_order();

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (idempotent)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admin full access profiles" ON public.profiles;
DROP POLICY IF EXISTS "Anyone can read active products" ON public.products;
DROP POLICY IF EXISTS "Admin can insert products" ON public.products;
DROP POLICY IF EXISTS "Admin can update products" ON public.products;
DROP POLICY IF EXISTS "Admin can delete products" ON public.products;
DROP POLICY IF EXISTS "Members can create own orders" ON public.orders;
DROP POLICY IF EXISTS "Members can view own orders" ON public.orders;
DROP POLICY IF EXISTS "Admin full access orders" ON public.orders;
DROP POLICY IF EXISTS "Members can insert own order items" ON public.order_items;
DROP POLICY IF EXISTS "Members can view own order items" ON public.order_items;
DROP POLICY IF EXISTS "Admin full access order items" ON public.order_items;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admin full access profiles" ON public.profiles FOR ALL USING (public.is_admin());
CREATE POLICY "Anyone can read active products" ON public.products FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Admin can insert products" ON public.products FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin can update products" ON public.products FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin can delete products" ON public.products FOR DELETE USING (public.is_admin());
CREATE POLICY "Members can create own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Members can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin full access orders" ON public.orders FOR ALL USING (public.is_admin());
CREATE POLICY "Members can insert own order items" ON public.order_items FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Members can view own order items" ON public.order_items FOR SELECT USING (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Admin full access order items" ON public.order_items FOR ALL USING (public.is_admin());

-- Order number generator
CREATE OR REPLACE FUNCTION public.generate_order_number() RETURNS text LANGUAGE plpgsql AS $$
DECLARE v_number text; v_exists boolean;
BEGIN LOOP
    v_number := 'ORD-' || to_char(now(), 'YYYYMMDD') || '-' || lpad(floor(random() * 10000)::text, 4, '0');
    SELECT EXISTS(SELECT 1 FROM public.orders WHERE order_number = v_number) INTO v_exists;
    EXIT WHEN NOT v_exists;
END LOOP; RETURN v_number; END; $$;

CREATE OR REPLACE FUNCTION public.get_tier_discount(p_tier text) RETURNS integer LANGUAGE sql IMMUTABLE AS $$
    SELECT CASE p_tier WHEN 'platinum' THEN 20 WHEN 'gold' THEN 15 WHEN 'silver' THEN 10 WHEN 'bronze' THEN 5 ELSE 0 END;
$$;

-- =============================================
-- SEED: Sample Products (12 items)
-- =============================================
INSERT INTO products (name, description, price, stock, image_url, is_active) VALUES
('Nasi Goreng Spesial', 'Nasi goreng dengan telur, ayam, dan sayuran segar', 35000, 50, 'https://images.unsplash.com/photo-1512053404322-77293a55ec4b?w=300', true),
('Mie Ayam Bakso', 'Mie ayam dengan bakso sapi pilihan dan kuah kaldu', 30000, 40, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300', true),
('Ayam Geprek', 'Ayam crispy dengan sambal geprek level pilihan', 28000, 60, 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300', true),
('Es Teh Manis', 'Es teh manis segar dengan gula asli', 8000, 100, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300', true),
('Jus Alpukat', 'Jus alpukat segar dengan susu coklat', 18000, 35, 'https://images.unsplash.com/photo-1623063742761-8abc6f3b8b01?w=300', true),
('Sate Ayam (10 tusuk)', 'Sate ayam bumbu kacang dengan lontong', 32000, 45, 'https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=300', true),
('Rendang Sapi', 'Rendang sapi empuk dengan bumbu rempah khas Padang', 45000, 25, 'https://images.unsplash.com/photo-1628289547035-5c4894862984?w=300', true),
('Gado-Gado', 'Sayuran segar dengan bumbu kacang dan kerupuk', 22000, 30, 'https://images.unsplash.com/photo-1511690743698-d9d18f7e20f1?w=300', true),
('Bakso Super', 'Bakso sapi jumbo dengan mie dan tahu', 35000, 50, 'https://images.unsplash.com/photo-1583835746434-cf1534674b41?w=300', true),
('Es Jeruk Segar', 'Es jeruk peras segar dengan madu alami', 12000, 80, 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300', true),
('Soto Ayam', 'Soto ayam kuning dengan nasi dan emping', 27000, 40, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=300', true),
('Pecel Lele', 'Lele goreng crispy dengan sambal dan lalapan', 25000, 55, 'https://images.unsplash.com/photo-1580405708370-1dbf539c1216?w=300', true);
