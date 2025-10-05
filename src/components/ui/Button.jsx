// hosting/src/components/ui/Button.jsx
export default function Button({ children, onClick, className = '', ...props }) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-primary ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}