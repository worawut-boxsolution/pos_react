// hosting/src/services/auth.service.js
import { auth } from '@/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { db } from '@/firebase'
import { doc, setDoc } from 'firebase/firestore'

export const registerUser = async ({ email, password, displayName, role = 'cashier', branchId }) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(cred.user, { displayName })

  await setDoc(doc(db, 'users', cred.user.uid), {
    email,
    displayName,
    role,
    branchId,
    createdAt: new Date()
  })
  return cred.user
}

export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)