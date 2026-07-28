import { useState, useEffect } from 'react'
import { type ProductProps } from '../components/product/product-card'

export function useProducts() {
  const [products, setProducts] = useState<ProductProps[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar produtos')
        return res.json()
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { products, loading, error }
}
