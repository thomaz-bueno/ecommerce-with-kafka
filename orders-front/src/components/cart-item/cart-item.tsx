import { useState, useEffect, useRef } from 'react'
import './cart-item.css'

interface CartItemProps {
  product_id: number
  image_url: string
  name: string
  color: string
  size: string
  quantity: number
  price: string
  is_liked: boolean
}

function CartItem({ product_id, image_url, name, color, size, quantity, price, is_liked }: CartItemProps) {
  const totalPrice = (parseFloat(price) * quantity).toFixed(2)
  const capitalizedColor = color.charAt(0).toUpperCase() + color.slice(1)
  const [isLiked, setIsLiked] = useState(is_liked)
  const isToggling = useRef(false)

  useEffect(() => {
    setIsLiked(is_liked)
  }, [is_liked])

  function toggleFavorite() {
    if (isToggling.current) return
    isToggling.current = true

    setIsLiked((prev) => !prev)

    fetch('http://localhost:3000/favorites/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ product_id: product_id }),
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
    <>
      <div className="cart-item">
        <div className="item-image">
          <img src={image_url} alt={name} />
        </div>

        <div className="item-details">
          <div className="item-info">
            <div className="item-text">
              <h3 className="item-name">{name}</h3>
              <p className="item-color">{capitalizedColor}</p>
              <div className="item-meta">
                <button className="meta-btn">
                  Size {size}
                  <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <button className="meta-btn">
                  Quantity {quantity}
                  <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>
            </div>
            <span className="item-price">R$ {totalPrice}</span>
          </div>

          <div className="item-actions">
            <button className="action-icon" aria-label="Add to favorites" onClick={toggleFavorite}>
              <svg viewBox="0 0 24 24" fill={isLiked ? '#e53e3e' : 'none'} stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
            <button className="action-icon" aria-label="Remove item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="cart-divider" />
    </>
  )
}

export default CartItem
