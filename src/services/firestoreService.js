// hosting/src/services/firestoreService.js
import { db  } from '@/firebase'
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore'
/*import { collection, addDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore'*/

/* ===== Products ===== */
export const getProductsStream = (callback) => {
  const q = collection(db, 'products')
  return onSnapshot(q, (snap) => {
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    callback(list)
  })
}

export const addProduct = (data) => addDoc(collection(db, 'products'), data)

/* ===== Orders ===== */
export const addOrder = (data) =>
  addDoc(collection(db, 'orders'), {
    ...data,
    createdAt: serverTimestamp()
  })

export const getOrdersByBranch = (branchId) => {
  const q = query(collection(db, 'orders'), where('branchId', '==', branchId))
  return getDocs(q)
}

/* ===== Inventory ===== */
export const getInventoryStream = (branchId, callback) => {
  const q = query(collection(db, 'inventory'), where('branchId', '==', branchId))
  return onSnapshot(q, (snap) => {
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    callback(list)
  })
}