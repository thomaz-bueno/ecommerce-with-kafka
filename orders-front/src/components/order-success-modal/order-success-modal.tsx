import { useEffect, useRef } from 'react'
import './order-success-modal.css'

interface OrderSuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

function OrderSuccessModal({ isOpen, onClose }: OrderSuccessModalProps) {
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

  return (
    <dialog
      ref={dialogRef}
      className="os-modal"
      aria-modal="true"
      aria-label="Pedido realizado com sucesso"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose()
      }}
    >
      <div className="os-modal-content">
        <div className="os-icon-wrapper">
          <svg className="os-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="24" cy="24" r="22" />
            <path d="M14 24l7 7 13-13" />
          </svg>
        </div>

        <h2 className="os-title">Pedido realizado</h2>

        <p className="os-message">Seu pedido foi recebido com sucesso.</p>

        <div className="os-divider" />

        <div className="os-actions">
          <button className="os-btn os-btn-primary" onClick={onClose}>
            Continuar
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default OrderSuccessModal
