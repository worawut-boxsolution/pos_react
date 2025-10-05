// hosting/src/services/inventory.service.js
import { db } from '@/firebase'
import { collection, doc, setDoc, updateDoc, onSnapshot, query, where } from 'firebase/firestore'

export const getInventoryStream = (branchId, callback) => {
  const q = query(collection(db, 'inventory'), where('branchId', '==', branchId))
  return onSnapshot(q, (snap) => {
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    callback(list)
  })
}

export const adjustStock = async (branchId, productId, qtyDelta) => {
  const id = `${branchId}_${productId}`
  const ref = doc(db, 'inventory', id)
  await updateDoc(ref, {
    qty: qtyDelta // บวก/ลบตามที่ส่งมา
  })
}

export const createInventory = async (branchId, productId, initialQty = 0, lowStockThreshold = 10) => {
  const id = `${branchId}_${productId}`
  await setDoc(doc(db, 'inventory', id), {
    branchId,
    productId,
    qty: initialQty,
    lowStockThreshold
  })
}