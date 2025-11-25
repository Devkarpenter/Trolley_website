export function Testimonials() {
  const testimonials = [
    {
      name: "Rohit Sharma",
      feedback: "The smooth wheels and build quality are just amazing! Best purchase.",
      emoji: "⭐",
    },
    {
      name: "Anjali Verma",
      feedback: "Lightweight and durable. Perfect for frequent travel.",
      emoji: "⭐",
    },
    {
      name: "Vikram Patel",
      feedback: "Stylish and very strong. I really loved the premium feel.",
      emoji: "⭐",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">What Our Customers Say</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition">
            <div className="text-yellow-500 text-4xl mb-2">{t.emoji.repeat(5)}</div>
            <p className="text-gray-700 italic">"{t.feedback}"</p>
            <p className="mt-4 font-semibold text-gray-900">— {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Testimonials;