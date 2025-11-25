export function FeaturedProducts() {
  const products = [
    { id: 1, name: "AeroLite Pro 360°", price: "₹4,999", emoji: "🧳" },
    { id: 2, name: "Voyager Max 2.0", price: "₹6,499", emoji: "🎒" },
    { id: 3, name: "Titan HardShell", price: "₹7,999", emoji: "🛄" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">Featured Products</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="text-7xl text-center mb-4">{p.emoji}</div>
            <h3 className="text-xl font-semibold text-gray-900 text-center">{p.name}</h3>
            <p className="text-center text-blue-600 font-bold mt-2">{p.price}</p>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
export default FeaturedProducts;
