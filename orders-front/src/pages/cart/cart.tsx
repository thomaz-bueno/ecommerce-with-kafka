import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CartItem from '../../components/cart-item/cart-item'
import RemoveConfirmationModal from '../../components/modal-remove-confirmation/remove-confirmation-modal'
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
  availableSizes: string[]
}

function Cart() {
  const navigate = useNavigate()
  const [bannerVisible, setBannerVisible] = useState(true)
  const [items, setItems] = useState<CartItemData[]>([])
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const [itemToRemove, setItemToRemove] = useState<CartItemData | null>(null)
  const [isClearModalOpen, setIsClearModalOpen] = useState(false)

  useEffect(() => {
    const userId = localStorage.getItem('userId')

    fetch('http://localhost:3000/cart', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err))
  }, [])

  function handleOpenRemoveModal(item: CartItemData) {
    setItemToRemove(item)
    setIsRemoveModalOpen(true)
  }

  function handleCloseRemoveModal() {
    setIsRemoveModalOpen(false)
    setItemToRemove(null)
  }

  function handleConfirmRemove() {
    if (!itemToRemove) return

    fetch(`http://localhost:3000/cart/remove/${itemToRemove.id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'removed') {
          setItems((prev) => prev.filter((item) => item.id !== itemToRemove.id))
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        handleCloseRemoveModal()
      })
  }

  function handleQuantityChange(cartItemId: number, newQuantity: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  function handleItemRemoved(cartItemId: number) {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId))
  }

  function handleSizeChange(cartItemId: number, newSize: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, size: newSize } : item
      )
    )
  }

  function handleConfirmClear() {
    fetch('http://localhost:3000/cart/clear', {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'cleared') {
          setItems([])
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsClearModalOpen(false)
      })
  }

  const subtotal = items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
  const shipping = items.length > 0 ? 250 : 0
  const total = subtotal + shipping

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-left">
          {items.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon-wrapper">
                <svg className="empty-cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <h2 className="empty-cart-title">Seu carrinho está vazio</h2>
              <p className="empty-cart-subtitle">Adicione itens ao carrinho para continuar</p>
              <button className="empty-cart-btn" onClick={() => navigate('/')}>
                Fazer compras
              </button>
            </div>
          ) : (
            <>
              <div className="bag-header">
                <h1 className="bag-title">Carrinho</h1>
                <a className="clear-cart-link" onClick={() => setIsClearModalOpen(true)}>
                  Limpar carrinho
                </a>
              </div>

              {items.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  product_id={item.product_id}
                  image_url={item.image_url}
                  name={item.name}
                  color={item.color}
                  size={item.size}
                  quantity={item.quantity}
                  price={item.price}
                  is_liked={item.is_liked}
                  availableSizes={item.availableSizes}
                  onRemove={() => handleOpenRemoveModal(item)}
                  onQuantityChange={handleQuantityChange}
                  onSizeChange={handleSizeChange}
                  onItemRemoved={handleItemRemoved}
                />
              ))}
            </>
          )}
        </div>

        <div className="cart-right">
          <h2 className="summary-title">Resumo</h2>

          <div className="summary-row">
            <div className="summary-label">
              Subtotal
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

      <RemoveConfirmationModal
        isOpen={isRemoveModalOpen}
        title="Remover item"
        message={`Tem certeza que deseja remover ${itemToRemove?.name ?? ''} do carrinho?`}
        confirmLabel="Remover"
        onClose={handleCloseRemoveModal}
        onConfirm={handleConfirmRemove}
      />

      <RemoveConfirmationModal
        isOpen={isClearModalOpen}
        title="Limpar carrinho"
        message="Tem certeza que deseja remover todos os itens do carrinho?"
        confirmLabel="Limpar"
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={handleConfirmClear}
      />
    </div>
  )
}

export default Cart
