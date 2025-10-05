// hosting/src/pages/ProductsPage.jsx
import { useState } from 'react'
import { useProducts } from '@/hooks/useProducts'
import { addProduct } from '@/services/firestoreService'
import { Card, Input, Button, Table } from '@/components/ui'

export default function ProductsPage() {
  const { products } = useProducts()
  const [form, setForm] = useState({ name: '', price: '', cost: '', category: '', sku: '' })

  const handleAdd = async (e) => {
    e.preventDefault()
    await addProduct({ ...form, price: Number(form.price), cost: Number(form.cost) })
    setForm({ name: '', price: '', cost: '', category: '', sku: '' })
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">จัดการสินค้า</h2>

      <Card>
        <form onSubmit={handleAdd} className="space-y-4">
          <Input label="ชื่อสินค้า" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="ราคาขาย" type="number" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <Input label="ต้นทุน" type="number" required value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} />
          </div>
          <Input label="หมวดหมู่" required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <Input label="SKU" required value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
          <Button>เพิ่มสินค้า</Button>
        </form>
      </Card>

      <Table headers={['ชื่อ', 'หมวด', 'ราคา', 'ต้นทุน']}>
        {products.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.category}</td>
            <td>฿{p.price}</td>
            <td>฿{p.cost}</td>
          </tr>
        ))}
      </Table>
    </div>
  )
}