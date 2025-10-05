// hosting/src/pages/PosPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartProvider } from '@/contexts'
import { ProductGrid, CartPanel, CheckoutModal, CategoryTabs } from '@/components/pos'
import { useProducts } from '@/hooks/useProducts'

export default function PosPage() {
  const nav = useNavigate()
  const { products, loading } = useProducts()
  const [openCheckout, setOpenCheckout] = useState(false)
  const [category, setCategory] = useState('')

  // ตรวจสอบหลังจากโหลดเสร็จ
  useEffect(() => {
    if (!loading && products.length === 0) nav('/setup')
  }, [loading, products, nav])

  // รอโหลด หรือยังไม่มีสินค้า (ยังไม่ redirect) ให้แสดง loading ก่อน
  if (loading) return <p className="p-4">กำลังโหลดสินค้า...</p>

  return (
    <CartProvider>
      <div className="h-screen flex flex-col">
        <header className="bg-primary text-primary-content p-4 shadow">
          <h1 className="text-2xl font-bold">POSME</h1>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* ซ้าย: สินค้า */}
          <section className="w-2/3 flex flex-col">
            <CategoryTabs value={category} onChange={setCategory} />
            <ProductGrid category={category} />
          </section>

          {/* ขวา: ตะกร้า */}
          <aside className="w-1/3 border-l">
            <CartPanel onCheckout={() => setOpenCheckout(true)} />
          </aside>
        </div>

        <CheckoutModal open={openCheckout} onClose={() => setOpenCheckout(false)} />
      </div>
    </CartProvider>
  )
}