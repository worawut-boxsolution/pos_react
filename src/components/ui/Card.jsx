// hosting/src/components/ui/Card.jsx`
export default function Card({ children, className = '' }) {
  return (
    <div className={`card card-bordered bg-base-100 shadow ${className}`}>
      <div className="card-body">{children}</div>
    </div>
  )
}