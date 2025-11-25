export function ShopByCategory() {
  const categories = [
    { name: "Carry-on Bags", emoji: "🧳" },
    { name: "Large Trolleys", emoji: "🛄" },
    { name: "Business Travel", emoji: "💼" },
    { name: "Kids Travel", emoji: "🎒" },
    { name: "Premium Edition", emoji: "✨" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">Shop by Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {categories.map((c, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg transition cursor-pointer">
            <div className="text-6xl">{c.emoji}</div>
            <p className="mt-4 font-semibold text-gray-800">{c.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ShopByCategory;