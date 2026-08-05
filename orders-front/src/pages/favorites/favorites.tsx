import { useState, useEffect } from 'react'
import ProductCard from '../../components/product/product-card'
import './favorites.css'

interface FavoriteProduct {
  id: number
  name: string
  base_price: string
  image_url: string
}

function Favorites() {
  const [products, setProducts] = useState<FavoriteProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const userId = localStorage.getItem('userId')

    fetch(`http://localhost:3000/favorites/`, {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar favoritos')
        return res.json()
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="favorites-page">
      <div className="favorites-header">
        <h2 className="favorites-title">Favoritos</h2>
      </div>

      <div className="favorites-grid">
        {loading && <p>Carregando favoritos...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && products.length === 0 && (
          <p>Nenhum favorito encontrado.</p>
        )}
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  )
}

export default Favorites
