// hosting/src/pages/LoginPage.jsx
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { Input, Button } from '@/components/ui'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, pass)
      nav('/pos')
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form onSubmit={handleLogin} className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">POSME Login</h2>
        <Input label="อีเมล" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="รหัสผ่าน" type="password" required value={pass} onChange={(e) => setPass(e.target.value)} />
        <Button className="mt-4 w-full" disabled={loading}>{loading ? 'กำลังเข้า...' : 'เข้าระบบ'}</Button>
      </form>
    </div>
  )
}