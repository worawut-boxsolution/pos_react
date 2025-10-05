// hosting/src/components/ui/Input.jsx
export default function Input({ label, ...props }) {
  return (
    <div className="form-control w-full">
      {label && <label className="label">{label}</label>}
      <input className="input input-bordered" {...props} />
    </div>
  )
}