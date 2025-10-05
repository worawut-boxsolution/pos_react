// hosting/src/components/pos/NumPad.jsx
export default function NumPad({ onInput, onClear }) {
  const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
  return (
    <div className="grid grid-cols-3 gap-2">
      {nums.map((n) => (
        <button
          key={n}
          className="btn btn-lg"
          onClick={() => onInput(n)}
        >
          {n}
        </button>
      ))}
      <button className="btn btn-lg btn-error col-span-3" onClick={onClear}>
        ล้าง
      </button>
    </div>
  )
}