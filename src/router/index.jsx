// hosting/src/router/index.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy } from 'react'
import ProtectedRoute from './ProtectedRoute'
import RoleRoute from './RoleRoute'
import SetupPage from '@/pages/SetupPage' // <- นำเข้าแล้ว

// lazy-load pages
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const PosPage = lazy(() => import('@/pages/PosPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const ProductsPage = lazy(() => import('@/pages/ProductsPage'))

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/setup', // <- หน้า Setup (ไม่ต้อง Protected)
    element: <SetupPage />
  },
  {
    path: '/',
    element: <Navigate to="/setup" replace /> // <- เปลี่ยนมาชี้ /setup ก่อน
  },
  {
    path: '/pos',
    element: (
      <ProtectedRoute>
        <PosPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <RoleRoute allowed={['admin', 'manager']}>
          <DashboardPage />
        </RoleRoute>
      </ProtectedRoute>
    )
  },
  {
    path: '/products',
    element: (
      <ProtectedRoute>
        <RoleRoute allowed={['admin', 'manager']}>
          <ProductsPage />
        </RoleRoute>
      </ProtectedRoute>
    )
  }
])