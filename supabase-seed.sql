-- =============================================
-- SEED DATA: Sample Products for Testing
-- Run this in Supabase SQL Editor after running supabase-schema.sql
-- =============================================

-- =============================================
-- PROMOTE TO ADMIN: Run this AFTER registering your account
-- Replace 'your@email.com' with your registered email
-- =============================================
-- UPDATE public.profiles SET role = 'admin'
-- WHERE id = (SELECT id FROM auth.users WHERE email = 'your@email.com');

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
