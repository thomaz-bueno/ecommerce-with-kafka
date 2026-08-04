import { useEffect, useRef } from 'react'
import './add-to-cart-modal.css'

interface ProductInfo {
  name: string
  category?: string
  color: string
  size: string
  price: string
  image_url: string
}

interface AddToCartModalProps {
  isOpen: boolean
  product: ProductInfo | null
  onClose: () => void
  onGoToCart: () => void
  onContinueShopping: () => void
}

function AddToCartModal({
  isOpen,
  product,
  onClose,
  onGoToCart,
  onContinueShopping,
}: AddToCartModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleClose = () => onClose()
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  if (!product) return null

  return (
    <dialog
      ref={dialogRef}
      className="atc-modal"
      aria-modal="true"
      aria-label="Produto adicionado ao carrinho"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose()
      }}
    >
      <div className="atc-modal-content">
        <button className="atc-close" onClick={onClose} aria-label="Fechar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 className="atc-title">Produto adicionado ao carrinho</h2>

        <div className="atc-product">
          <div className="atc-image">
            <img src={product.image_url} alt={product.name} />
          </div>
          <div className="atc-info">
            <span className="atc-name">{product.name}</span>
            {product.category && (
              <span className="atc-category">{product.category}</span>
            )}
            <span className="atc-color">{product.color}</span>
            <span className="atc-size">Size {product.size}</span>
            <span className="atc-price">{product.price}</span>
          </div>
        </div>

        <div className="atc-divider" />

        <div className="atc-actions">
          <button className="atc-btn atc-btn-primary" onClick={onGoToCart}>
            Ir para o carrinho
          </button>
          <button className="atc-btn atc-btn-secondary" onClick={onContinueShopping}>
            Continuar comprando
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default AddToCartModal
