// hosting/src/pages/SetupPage.jsx
import { useNavigate } from 'react-router-dom'
import { addProduct } from '@/services/product.service'
import { Button, Input } from '@/components/ui'

const sampleProducts = [
  { name: 'ลาเต้เย็น', price: 60, cost: 25, category: 'เครื่องดื่ม', sku: 'LAT001' },
  { name: 'คาปูชิโน่ร้อน', price: 55, cost: 23, category: 'เครื่องดื่ม', sku: 'CAP001' },
  { name: 'ข้าวกะเพราไข่ดาว', price: 45, cost: 30, category: 'อาหาร', sku: 'KAP001' }
]

export default function SetupPage() {
  const nav = useNavigate()

  const createSample = async () => {
    for (const p of sampleProducts) await addProduct(p)
    nav('/pos')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">ยินดีต้อนรับสู่ POSME</h2>
        <p className="mb-6">ยังไม่มีสินค้าในระบบ กรุณาเพิ่มอย่างน้อย 1 รายการ</p>
        <Button onClick={createSample}>สร้างสินค้าตัวอย่าง</Button>
        <div className="divider">หรือ</div>
        <Button className="btn-ghost" onClick={() => nav('/products')}>เพิ่มสินค้าเอง</Button>
      </div>
    </div>
  )
}