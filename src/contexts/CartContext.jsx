import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
    const [items, setItems] = useState([])

    function addToCart(product, quantity = 1) {
        setItems(prev => {
            const existing = prev.find(item => item.product_id === product.id)
            if (existing) {
                return prev.map(item =>
                    item.product_id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            }
            return [...prev, {
                product_id: product.id,
                product_name: product.name,
                price: Number(product.price),
                image_url: product.image_url,
                quantity,
            }]
        })
    }

    function removeFromCart(productId) {
        setItems(prev => prev.filter(item => item.product_id !== productId))
    }

    function updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }
        setItems(prev => prev.map(item =>
            item.product_id === productId ? { ...item, quantity } : item
        ))
    }

    function clearCart() {
        setItems([])
    }

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const value = {
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
