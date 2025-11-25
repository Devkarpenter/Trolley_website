import ProductCard from '../../components/ProductCard'

const sample = [
  { id: 1, name: 'Travel Trolley', price: 2999 },
  { id: 2, name: 'Smart Trolley', price: 3599 },
  { id: 3, name: 'Compact Cabin Trolley', price: 2499 },
]

export default function Products() {
  return (
    <div className="max-w-6xl mx-auto p-6 grid sm:grid-cols-2 gap-6">
      {sample.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
