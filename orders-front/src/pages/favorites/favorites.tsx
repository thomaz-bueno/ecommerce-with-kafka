import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../../components/product/product-card'
import './favorites.css'

interface FavoriteProduct {
  id: number
  product_id: number
  name: string
  base_price: string
  image_url: string
}

function Favorites() {
  const navigate = useNavigate()
  const [products, setProducts] = useState<FavoriteProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/favorites/`, {
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
          <div className="empty-favorites">
            <div className="empty-favorites-icon-wrapper">
              <svg className="empty-favorites-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h2 className="empty-favorites-title">Nenhum favorito encontrado</h2>
            <p className="empty-favorites-subtitle">Explore nossos produtos e adicione seus favoritos</p>
            <button className="empty-favorites-btn" onClick={() => navigate('/')}>
              Explorar produtos
            </button>
          </div>
        )}
        {products.map((product) => (
          <ProductCard key={product.id} id={product.product_id} name={product.name} base_price={product.base_price} image_url={product.image_url} />
        ))}
      </div>
    </section>
  )
}

export default Favorites
