// hosting/src/components/pos/CategoryTabs.jsx
const categories = ['เครื่องดื่ม', 'อาหาร', 'ของหวาน', 'อื่น ๆ']

export default function CategoryTabs({ value, onChange }) {
  return (
    <div className="tabs tabs-boxed">
      <button
        className={`tab ${!value ? 'tab-active' : ''}`}
        onClick={() => onChange('')}
      >
        ทั้งหมด
      </button>
      {categories.map((c) => (
        <button
          key={c}
          className={`tab ${value === c ? 'tab-active' : ''}`}
          onClick={() => onChange(c)}
        >
          {c}
        </button>
      ))}
    </div>
  )
}