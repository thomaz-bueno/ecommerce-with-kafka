import { useState, useEffect } from 'react'
import CartItem from '../../components/cart-item/cart-item'
import './cart.css'

interface CartItemData {
  id: number
  product_id: number
  name: string
  price: string
  color: string
  size: string
  quantity: number
  is_liked: boolean
  image_url: string
}

function Cart() {
  const [bannerVisible, setBannerVisible] = useState(true)
  const [items, setItems] = useState<CartItemData[]>([])

  useEffect(() => {
    const userId = localStorage.getItem('userId')

    fetch('http://localhost:3000/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id: userId }),
    })
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err))
  }, [])

  const subtotal = items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
  const shipping = items.length > 0 ? 250 : 0
  const total = subtotal + shipping

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-left">

          <h1 className="bag-title">Carrinho</h1>

          {items.map((item) => (
            <CartItem
              key={item.id}
              image_url={item.image_url}
              name={item.name}
              color={item.color}
              size={item.size}
              quantity={item.quantity}
              price={item.price}
              is_liked={item.is_liked}
            />
          ))}
        </div>

        <div className="cart-right">
          <h2 className="summary-title">Resumo</h2>

          <div className="summary-row">
            <div className="summary-label">
              Subtotal
              <span className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </span>
            </div>
            <span className="summary-value">R$ {subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Valor estimado do frete</span>
            <span className="summary-value">R$ {shipping.toFixed(2)}</span>
          </div>

          <div className="summary-divider" />

          <div className="summary-row summary-total">
            <span className="summary-label total-label">Total</span>
            <span className="summary-value total-value">R$ {total.toFixed(2)}</span>
          </div>

          <div className="checkout-buttons">
            <button className="checkout-btn guest-btn">Finalizar pedido</button>
            <button className="checkout-btn member-btn">Continuar comprando</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
