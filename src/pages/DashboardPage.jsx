// hosting/src/pages/DashboardPage.jsx
import { useOrders } from '@/hooks/useOrders'
import { useBranch } from '@/contexts'
import { Card, Table } from '@/components/ui'

export default function DashboardPage() {
  const { currentBranch } = useBranch()
  const { orders, loading } = useOrders(currentBranch)

  const totalSales = orders.reduce((s, o) => s + o.total, 0)

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">ภาพรวมร้าน</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="text-3xl font-bold text-success">{orders.length}</div>
          <div className="text-sm opacity-70">จำนวนบิลวันนี้</div>
        </Card>
        <Card>
          <div className="text-3xl font-bold text-info">฿{totalSales.toFixed(2)}</div>
          <div className="text-sm opacity-70">ยอดขายรวม</div>
        </Card>
        <Card>
          <div className="text-3xl font-bold text-warning">
            {orders.length ? (totalSales / orders.length).toFixed(2) : 0}
          </div>
          <div className="text-sm opacity-70">ยอดเฉลี่ยต่อบิล</div>
        </Card>
      </div>

      <h3 className="text-xl font-semibold">รายการล่าสุด</h3>
      {loading && <p>กำลังโหลด...</p>}
      {!loading && (
        <Table headers={['เวลา', 'ยอด', 'พนักงาน']}>
          {orders.slice(0, 20).map((o) => (
            <tr key={o.id}>
              <td>{new Date(o.createdAt?.seconds * 1000).toLocaleTimeString()}</td>
              <td>฿{o.total}</td>
              <td>{o.staffEmail || '-'}</td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  )
}