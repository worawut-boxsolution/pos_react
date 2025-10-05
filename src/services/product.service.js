// hosting/src/services/product.service.js
import { db } from '@/firebase'
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, orderBy } from 'firebase/firestore'

export const getProducts = async () => {
  const snap = await getDocs(collection(db, 'products'))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const getProductsByCategory = async (category) => {
  const q = query(collection(db, 'products'), where('category', '==', category))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const addProduct = (data) => addDoc(collection(db, 'products'), data)

export const updateProduct = (id, data) => updateDoc(doc(db, 'products', id), data)

export const deleteProduct = (id) => deleteDoc(doc(db, 'products', id))