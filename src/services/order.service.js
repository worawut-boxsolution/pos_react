// hosting/src/services/order.service.js
import { db } from '@/firebase'
import { collection, addDoc, getDocs, query, where, orderBy, limit, serverTimestamp } from 'firebase/firestore'

export const addOrder = (data) =>
  addDoc(collection(db, 'orders'), {
    ...data,
    createdAt: serverTimestamp()
  })

export const getOrdersByBranch = async (branchId, dateFrom?, dateTo?) => {
  let q = query(
    collection(db, 'orders'),
    where('branchId', '==', branchId),
    orderBy('createdAt', 'desc')
  )
  if (dateFrom && dateTo) {
    q = query(q, where('createdAt', '>=', dateFrom), where('createdAt', '<=', dateTo))
  }
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const getRecentOrders = (branchId, limitCount = 20) =>
  getDocs(
    query(
      collection(db, 'orders'),
      where('branchId', '==', branchId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    )
  )