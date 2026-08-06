import { useEffect, useRef } from 'react'
import './remove-confirmation-modal.css'

interface RemoveConfirmationModalProps {
  isOpen: boolean
  title: string
  message: string
  confirmLabel: string
  onClose: () => void
  onConfirm: () => void
}

function RemoveConfirmationModal({
  isOpen,
  title,
  message,
  confirmLabel,
  onClose,
  onConfirm,
}: RemoveConfirmationModalProps) {
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
      className="rc-modal"
      aria-modal="true"
      aria-label="Confirmar remoção"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose()
      }}
    >
      <div className="rc-modal-content">
        <button className="rc-close" onClick={onClose} aria-label="Fechar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 className="rc-title">{title}</h2>

        <p className="rc-message">
          {message}
        </p>

        <div className="rc-divider" />

        <div className="rc-actions">
          <button className="rc-btn rc-btn-danger" onClick={onConfirm}>
            {confirmLabel}
          </button>
          <button className="rc-btn rc-btn-secondary" onClick={onClose}>
            Continuar comprando
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default RemoveConfirmationModal
