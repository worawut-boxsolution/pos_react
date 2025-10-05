// hosting/src/components/pos/CartPanel.jsx
import { useCart } from '@/contexts'
import { Button } from '@/components/ui'

export default function CartPanel({ onCheckout }) {
  const { items, removeItem, totalPrice, totalQty } = useCart()

  return (
    <div className="bg-base-200 h-full flex flex-col">
      <div className="p-4 text-lg font-bold">ตะกร้า ({totalQty})</div>

      <div className="flex-1 overflow-y-auto px-4">
        {items.length === 0 && <p className="text-center text-sm opacity-60">ว่างเปล่า</p>}
        {items.map((i) => (
          <div key={i.id} className="flex justify-between items-center mb-2">
            <div className="flex-1">
              <div className="font-semibold">{i.name}</div>
              <div className="text-sm opacity-70">
                ฿{i.price} x {i.qty}
              </div>
            </div>
            <button className="btn btn-xs btn-error" onClick={() => removeItem(i.id)}>
              ลบ
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 border-t-2 space-y-2">
        <div className="flex justify-between text-lg">
          <span>รวม</span>
          <span className="font-bold">฿{totalPrice}</span>
        </div>
        <Button className="w-full" onClick={onCheckout} disabled={!items.length}>
          ชำระเงิน
        </Button>
      </div>
    </div>
  )
}