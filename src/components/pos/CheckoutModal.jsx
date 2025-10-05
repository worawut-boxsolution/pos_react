// hosting/src/components/pos/CheckoutModal.jsx
import { useState } from 'react'
import { Button, Input, Modal } from '@/components/ui'
import { useCart } from '@/contexts'
import { addOrder } from '@/services/firestoreService'
import { useAuth } from '@/contexts'
import { usePrint } from '@/hooks/usePrint'

export default function CheckoutModal({ open, onClose }) {
  const { items, totalPrice, clearCart } = useCart()
  const { user, branchId } = useAuth()
  const { printReceipt } = usePrint()

  const [paid, setPaid] = useState('')
  const change = Math.max(0, Number(paid) - totalPrice)

  const handlePay = async () => {
    if (!user) return
    /*const order = {
      branchId,
      staffId: user.uid,
      items: items.map((i) => ({
        productId: i.id,
        name: i.name,
        price: i.price,
        quantity: i.qty,
      })),
      total: totalPrice,
      paid: Number(paid),
      change,
      paidBy: 'cash',
      printed: false,
    }*/
   const order = {
  branchId,
  staffId: user.uid,
  items: items.map(i => ({
    productId: i.id,
    name: i.name,
    price: Number(i.price || 0),
    quantity: Number(i.qty || 0)
  })),
  total: Number(totalPrice || 0),
  paid: Number(paid || 0),
  change: Number(change || 0),
  paidBy: 'cash',
  printed: false
}
    const doc = await addOrder(order)
    printReceipt({ ...order, id: doc.id })
    clearCart()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <h3 className="font-bold text-lg">ชำระเงิน</h3>
      <div className="py-4 space-y-3">
        <div className="flex justify-between text-xl">
          <span>ยอดรวม</span>
          <span>฿{totalPrice}</span>
        </div>

        <Input
          label="รับเงิน (฿)"
          type="number"
          value={paid}
          onChange={(e) => setPaid(e.target.value)}
          autoFocus
        />

        {change > 0 && (
          <div className="flex justify-between text-success">
            <span>เงินทอน</span>
            <span>฿{change.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="modal-action">
        <Button onClick={handlePay} disabled={Number(paid) < totalPrice}>
          พิมพ์ใบเสร็จ
        </Button>
        <button className="btn btn-ghost" onClick={onClose}>
          ยกเลิก
        </button>
      </div>
    </Modal>
  )
}