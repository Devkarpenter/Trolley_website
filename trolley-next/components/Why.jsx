export function Why() {
  const features = [
    { emoji: "⚡", text: "Ultra-lightweight Material" },
    { emoji: "🛡️", text: "High Durability Protection" },
    { emoji: "🚀", text: "Smooth 360° Wheels" },
    { emoji: "🔒", text: "TSA-Approved Locks" },
    { emoji: "💼", text: "Premium Design Finish" },
    { emoji: "📦", text: "5-Year Warranty" },
  ];

  return (
    <section className="bg-blue-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">Why Choose Us</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((f, index) => (
            <div key={index} className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
              <div className="text-5xl">{f.emoji}</div>
              <p className="mt-3 font-medium text-gray-800 text-lg">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Why;
