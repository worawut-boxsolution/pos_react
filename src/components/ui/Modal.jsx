// hosting/src/components/ui/Modal.jsx
import { createPortal } from 'react-dom'

export default function Modal({ open, onClose, children }) {
  if (!open) return null

  return createPortal(
    <div className="modal modal-open">
      <div className="modal-box relative">
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}