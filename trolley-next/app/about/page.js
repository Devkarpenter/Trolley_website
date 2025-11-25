export default function About() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">About TrolleyMart</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Founded in 2015, TrolleyMart has been committed to providing high-quality trolleys and luggage solutions for travelers worldwide. We believe every journey deserves a reliable travel companion.
          </p>
          <p className="text-gray-700 mb-4">
            Our products are crafted with premium materials and designed with both style and durability in mind. From casual travelers to business professionals, we have the perfect trolley for your needs.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            To make travel convenient, affordable, and enjoyable for everyone by offering innovative trolley designs and exceptional customer service.
          </p>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Our Values</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Quality & Durability</li>
              <li>✓ Customer Satisfaction</li>
              <li>✓ Innovation & Design</li>
              <li>✓ Sustainability</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
