// hosting/src/hooks/useOrders.js
import { useEffect, useState } from 'react'
import { getOrdersByBranch } from '@/services/firestoreService'

export const useOrders = (branchId) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!branchId) return
    getOrdersByBranch(branchId).then((snap) => {
      setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
  }, [branchId])

  return { orders, loading }
}