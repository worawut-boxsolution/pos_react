// hosting/src/contexts/CartContext.jsx
import { createContext, useContext, useReducer } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const exist = state.find(i => i.id === action.item.id)
      if (exist) {
        return state.map(i =>
          i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...state, { ...action.item, qty: 1 }]
    }
    case 'REMOVE':
      return state.filter(i => i.id !== action.id)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [items, dispatch] = useReducer(cartReducer, [])

  const addItem    = item => dispatch({ type: 'ADD', item })
  const removeItem = id   => dispatch({ type: 'REMOVE', id })
  const clearCart  = ()  => dispatch({ type: 'CLEAR' })

  const totalQty   = items.reduce((s, i) => s + i.qty, 0)
  const totalPrice = items.reduce((s, i) => s + i.qty * i.price, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, totalQty, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)