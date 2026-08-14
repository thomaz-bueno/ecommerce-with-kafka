import { useEffect, useRef } from 'react'
import './order-error-modal.css'

interface OrderErrorModalProps {
  isOpen: boolean
  onClose: () => void
  onRetry?: () => void
}

function OrderErrorModal({ isOpen, onClose, onRetry }: OrderErrorModalProps) {
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

  function handleRetry() {
    onClose()
    onRetry?.()
  }

  return (
    <dialog
      ref={dialogRef}
      className="oe-modal"
      aria-modal="true"
      aria-label="Erro ao finalizar pedido"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose()
      }}
    >
      <div className="oe-modal-content">
        <div className="oe-icon-wrapper">
          <svg className="oe-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="24" cy="24" r="22" />
            <line x1="16" y1="16" x2="32" y2="32" />
            <line x1="32" y1="16" x2="16" y2="32" />
          </svg>
        </div>

        <h2 className="oe-title">Não foi possível finalizar</h2>

        <p className="oe-message">
          Ocorreu um problema ao processar seu pedido. Tente novamente.
        </p>

        <div className="oe-divider" />

        <div className="oe-actions">
          <button className="oe-btn oe-btn-primary" onClick={handleRetry}>
            Tentar novamente
          </button>
          <button className="oe-btn oe-btn-secondary" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default OrderErrorModal
