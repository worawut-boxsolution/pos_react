// hosting/src/components/pos/ProductGrid.jsx
import { useProducts } from '@/hooks/useProducts'
import { useCart } from '@/contexts'

export default function ProductGrid({ category = '' }) {
  const { products, loading } = useProducts()
  const { addItem } = useCart()

  const list = category
    ? products.filter((p) => p.category === category)
    : products

  if (loading) return <p className="p-4">กำลังโหลดสินค้า...</p>

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {list.map((p) => (
        <button
          key={p.id}
          onClick={() => addItem(p)}
          className="btn h-32 flex-col items-center justify-center text-sm"
        >
          {p.name}
          <span className="text-success">฿{p.price}</span>
        </button>
      ))}
    </div>
  )
}