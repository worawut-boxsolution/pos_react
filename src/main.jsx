import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'
import { AuthProvider, BranchProvider, CartProvider } from '@/contexts'
import '@/App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BranchProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </BranchProvider>
    </AuthProvider>
  </React.StrictMode>
)