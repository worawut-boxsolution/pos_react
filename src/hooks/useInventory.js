// hosting/src/hooks/useInventory.js
import { useEffect, useState } from 'react'
import { getInventoryStream } from '@/services/firestoreService'

export const useInventory = (branchId) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!branchId) return
    const unsub = getInventoryStream(branchId, (list) => {
      setItems(list)
      setLoading(false)
    })
    return unsub
  }, [branchId])

  return { items, loading }
}