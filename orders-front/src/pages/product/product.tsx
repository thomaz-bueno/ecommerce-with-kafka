import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../contexts/CartContext'
import AddToCartModal from '../../components/add-to-cart-modal/add-to-cart-modal'
import './product.css'

interface ProductData {
  id: number
  name: string
  description: string
  base_price: string
  image_url: string
  is_liked: boolean
  selectedColor: string
  availableColors: string[]
  variants: {
    id: number
    product_id: number
    color: string
    size: string
    price: string
    stock: number
  }[]
}

const colorMap: Record<string, string> = {
  white: '#d6cfc5',
  gray: '#b8b8b8',
  black: '#3a3a3a',
}

function Product() {
  const { id } = useParams()
  const { fetchCart } = useCart()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [product, setProduct] = useState<ProductData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState(0)
  const [activeThumb, setActiveThumb] = useState(0)
  const [color, setColor] = useState('white');
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const isToggling = useRef(false)

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}?color=${color}`, {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar produto')
        return res.json()
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id, color])

  useEffect(() => {
    if (product && selectedSize === null) {
      const firstSize = [...new Set(product.variants.map((v) => v.size))][0]
      if (firstSize) setSelectedSize(firstSize)
    }
  }, [product, selectedSize])

  useEffect(() => {
    if (product) setIsLiked(product.is_liked)
  }, [product])

  if (loading) return <p>Carregando produto...</p>
  if (error) return <p>{error}</p>
  if (!product) return null

  const sizes = [...new Set(product.variants.map((v) => v.size))]

  function addToCart() {
    const price = parseFloat(product!.base_price)

    fetch('http://localhost:3000/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        product_id: product!.id,
        name: product!.name,
        price,
        color,
        size: selectedSize,
        quantity: 1,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao adicionar no carrinho')
        return res.json()
      })
      .then(() => {
        fetchCart()
        setIsModalOpen(true)
      })
      .catch((err) => setError(err.message))
  }

  function toggleFavorite() {
    if (isToggling.current) return
    isToggling.current = true

    setIsLiked((prev) => !prev)

    fetch('http://localhost:3000/favorites/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ product_id: product.id }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao favoritar')
        return res.json()
      })
      .catch(() => {
        setIsLiked((prev) => !prev)
      })
      .finally(() => {
        isToggling.current = false
      })
  }

  return (
    <div className="product-page">
      <AddToCartModal
        isOpen={isModalOpen}
        product={{
          name: product.name,
          category: "Shoe",
          color,
          size: selectedSize || '',
          price: `R$ ${product.base_price}`,
          image_url: product.image_url,
        }}
        onClose={() => setIsModalOpen(false)}
        onGoToCart={() => {
          setIsModalOpen(false)
          navigate('/cart')
        }}
        onContinueShopping={() => setIsModalOpen(false)}
      />

      <nav className="breadcrumb">
        <a href="#">Clothes and shoes</a>
        <span>/</span>
        <a href="#">Shoes</a>
        <span>/</span>
        <a href="#">{product.name}</a>
      </nav>

      <div className="product-layout">
        <div className="product-gallery">
          <div className="main-image">
            <img src={product.image_url} alt={product.name} />
          </div>
          <div className="thumbnails">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`thumbnail ${i === activeThumb ? 'active' : ''}`}
                onClick={() => setActiveThumb(i)}
              >
                <img src={product.image_url} alt={`Thumbnail ${i + 1}`} />
              </div>
            ))}
            <span className="thumbnail-more">+4 more</span>
          </div>
        </div>

        <div className="product-info">
          <div className="brand-row">
            <span className="brand-name">{product.name}</span>
            <span className="sku">ID: {product.id}</span>
          </div>

          <h1 className="product-title">{product.name}</h1>

          <div className="rating">
            <div className="stars">
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star-half-alt" />
            </div>
            <span className="reviews-count">42 reviews</span>
          </div>

          <div className="price">R$ {product.base_price}</div>

          <div className="color-selector">
            <div className="color-label">
              Color <span>/</span> <span>{product.availableColors[selectedColor]}</span>
            </div>
            <div className="color-options">
              {product.availableColors.map((c, i) => (
                <div
                  key={c}
                  className={`color-swatch ${i === selectedColor ? 'active' : ''}`}
                  onClick={() => { setSelectedColor(i); setColor(c) }}
                >
                  <div style={{ backgroundColor: colorMap[c] }} />
                </div>
              ))}
            </div>
          </div>

          <div className="size-selector">
            <div className="size-header">
              <span className="size-label">Size</span>
              <span className="size-type">/ EU Men</span>
            </div>
            <div className="size-grid">
              {sizes.map((s) => (
                <button
                  key={s}
                  className={`size-btn ${s === selectedSize ? 'active' : ''}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <a href="#" className="size-guide">Size guide</a>
          </div>

          <div className="product-actions">
            <button
              className="add-to-cart"
              onClick={() => {
                if (!isAuthenticated) {
                  navigate('/login')
                  return
                }
                addToCart()
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              Add to cart
            </button>
            <button className="wishlist-btn" onClick={toggleFavorite}>
              <svg viewBox="0 0 24 24" fill={isLiked ? '#e53e3e' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          <div className="free-delivery">
            <i className="fas fa-truck" />
            Free delivery on orders over $30.0
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product