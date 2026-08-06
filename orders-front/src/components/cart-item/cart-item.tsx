import { useState, useEffect, useRef } from 'react'
import './cart-item.css'

interface CartItemProps {
  id: number
  product_id: number
  image_url: string
  name: string
  color: string
  size: string
  quantity: number
  price: string
  is_liked: boolean
  availableSizes: string[]
  onRemove: () => void
  onQuantityChange: (cartItemId: number, newQuantity: number) => void
  onSizeChange: (cartItemId: number, newSize: string) => void
  onItemRemoved: (cartItemId: number) => void
}

function CartItem({
  id,
  product_id,
  image_url,
  name,
  color,
  size,
  quantity,
  price,
  is_liked,
  availableSizes,
  onRemove,
  onQuantityChange,
  onSizeChange,
  onItemRemoved,
}: CartItemProps) {
  const totalPrice = (parseFloat(price) * quantity).toFixed(2)
  const capitalizedColor = color.charAt(0).toUpperCase() + color.slice(1)
  const [isLiked, setIsLiked] = useState(is_liked)
  const isToggling = useRef(false)

  const [isQuantityOpen, setIsQuantityOpen] = useState(false)
  const [currentQuantity, setCurrentQuantity] = useState(quantity)
  const quantityRef = useRef<HTMLDivElement>(null)
  const pendingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [isSizeOpen, setIsSizeOpen] = useState(false)
  const [currentSize, setCurrentSize] = useState(size)
  const sizeRef = useRef<HTMLDivElement>(null)
  const pendingSizeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setCurrentQuantity(quantity)
  }, [quantity])

  useEffect(() => {
    setCurrentSize(size)
  }, [size])

  useEffect(() => {
    setIsLiked(is_liked)
  }, [is_liked])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (quantityRef.current && !quantityRef.current.contains(e.target as Node)) {
        setIsQuantityOpen(false)
      }
      if (sizeRef.current && !sizeRef.current.contains(e.target as Node)) {
        setIsSizeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    return () => {
      if (pendingTimeout.current) clearTimeout(pendingTimeout.current)
      if (pendingSizeTimeout.current) clearTimeout(pendingSizeTimeout.current)
    }
  }, [])

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

  function handleSelectQuantity(newQuantity: number) {
    if (newQuantity === currentQuantity) {
      setIsQuantityOpen(false)
      return
    }

    setCurrentQuantity(newQuantity)
    setIsQuantityOpen(false)
    onQuantityChange(id, newQuantity)

    if (pendingTimeout.current) clearTimeout(pendingTimeout.current)

    pendingTimeout.current = setTimeout(() => {
      fetch('http://localhost:3000/cart/update-quantity', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ cart_item_id: id, quantity: newQuantity }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'removed') {
            onItemRemoved(id)
          }
        })
        .catch((err) => {
          console.error(err)
          setCurrentQuantity(quantity)
          onQuantityChange(id, quantity)
        })
    }, 500)
  }

  function handleSelectSize(newSize: string) {
    if (newSize === currentSize) {
      setIsSizeOpen(false)
      return
    }

    setCurrentSize(newSize)
    setIsSizeOpen(false)
    onSizeChange(id, newSize)

    if (pendingSizeTimeout.current) clearTimeout(pendingSizeTimeout.current)

    pendingSizeTimeout.current = setTimeout(() => {
      fetch('http://localhost:3000/cart/update-size', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ cart_item_id: id, size: newSize }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'failed') {
            setCurrentSize(size)
            onSizeChange(id, size)
          }
        })
        .catch((err) => {
          console.error(err)
          setCurrentSize(size)
          onSizeChange(id, size)
        })
    }, 500)
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
                <div className="size-dropdown-wrapper" ref={sizeRef}>
                  <button
                    className="meta-btn"
                    onClick={() => setIsSizeOpen((prev) => !prev)}
                  >
                    Size {currentSize}
                    <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {isSizeOpen && (
                    <div className="size-dropdown">
                      {availableSizes.map((s) => (
                        <button
                          key={s}
                          className={`size-option ${s === currentSize ? 'active' : ''}`}
                          onClick={() => handleSelectSize(s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="quantity-dropdown-wrapper" ref={quantityRef}>
                  <button
                    className="meta-btn"
                    onClick={() => setIsQuantityOpen((prev) => !prev)}
                  >
                    Quantity {currentQuantity}
                    <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {isQuantityOpen && (
                    <div className="quantity-dropdown">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          className={`quantity-option ${num === currentQuantity ? 'active' : ''}`}
                          onClick={() => handleSelectQuantity(num)}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
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
            <button className="action-icon" aria-label="Remove item" onClick={onRemove}>
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
