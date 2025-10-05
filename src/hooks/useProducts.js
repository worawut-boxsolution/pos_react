// hosting/src/hooks/useProducts.js
import { useEffect, useState } from 'react'
import { getProductsStream } from '@/services/firestoreService'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsub = getProductsStream(
      (list) => {
        setProducts(list)
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )
    return unsub // cleanup ตอน unmount
  }, [])

  return { products, loading, error }
}