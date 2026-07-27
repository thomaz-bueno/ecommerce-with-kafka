import { useState } from 'react'
import tenis from '../../assets/tenis.png'
import './product.css'

const thumbnails = [tenis, tenis, tenis, tenis]

const colors = [
  { name: 'White', bg: '#d6cfc5' },
  { name: 'Gray', bg: '#b8b8b8' },
  { name: 'Dark', bg: '#3a3a3a' },
]

const sizes = ['40.5', '41', '42', '43', '43.5', '44', '44.5', '45', '46']

function Product() {
  const [selectedSize, setSelectedSize] = useState('41')
  const [selectedColor, setSelectedColor] = useState(0)
  const [activeThumb, setActiveThumb] = useState(0)

  return (
    <div className="product-page">
      <nav className="breadcrumb">
        <a href="#">Clothes and shoes</a>
        <span>/</span>
        <a href="#">Shoes</a>
        <span>/</span>
        <a href="#">DQ</a>
      </nav>

      <div className="product-layout">
        <div className="product-gallery">
          <div className="main-image">
            <img src={tenis} alt="Shoes DQ Zig Kinetica 3" />
          </div>
          <div className="thumbnails">
            {thumbnails.map((src, i) => (
              <div
                key={i}
                className={`thumbnail ${i === activeThumb ? 'active' : ''}`}
                onClick={() => setActiveThumb(i)}
              >
                <img src={src} alt={`Thumbnail ${i + 1}`} />
              </div>
            ))}
            <span className="thumbnail-more">+4 more</span>
          </div>
        </div>

        <div className="product-info">
          <div className="brand-row">  
            <span className="brand-name">DQ</span>
            <span className="sku">HR1325R00--8</span>
          </div>

          <h1 className="product-title">Shoes DQ Zig Kinetica 3</h1>

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

          <div className="price">$199.00</div>

          <div className="color-selector">
            <div className="color-label">
              Color <span>/</span> <span>{colors[selectedColor].name}</span>
            </div>
            <div className="color-options">
              {colors.map((c, i) => (
                <div
                  key={i}
                  className={`color-swatch ${i === selectedColor ? 'active' : ''}`}
                  onClick={() => setSelectedColor(i)}
                >
                  <div style={{ backgroundColor: c.bg }} />
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
            <button className="add-to-cart">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              Add to cart
            </button>
            <button className="wishlist-btn">
              <i className="far fa-heart" />
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
