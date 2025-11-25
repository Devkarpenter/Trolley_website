'use client'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-white mb-10 shadow-sm">
      
      {/* Decorative gradient circles */}
      <div className="absolute -top-10 -left-10 w-60 h-60 bg-blue-200/40 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300/30 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10 relative">
        
        {/* LEFT TEXT */}
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight drop-shadow-sm">
            Travel Smarter with <span className="text-blue-600">Premium Trolleys</span>
          </h1>

          <p className="text-lg text-gray-700 mt-4 max-w-xl">
            Discover a new level of comfort and durability.  
            Our trolleys are engineered with lightweight frames,  
            smooth wheels, and shock-resistant material — built  
            to make every journey effortless and stylish.
          </p>

          <div className="flex gap-4 mt-8">
            <Link 
              href="/products" 
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg"
            >
              Explore Collection
            </Link>

            <Link 
              href="/about" 
              className="border border-gray-400 hover:border-gray-600 transition-all duration-300 text-gray-700 px-6 py-3 rounded-lg font-semibold"
            >
              Learn More
            </Link>
          </div>

          {/* Highlights */}
          <div className="flex gap-6 mt-10 text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>  
              <p className="font-medium">Ultra Lightweight</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛡️</span>  
              <p className="font-medium">High Durability</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <p className="font-medium">Smooth Glide Wheels</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE BOX */}
        <div className="w-full md:w-1/3">
          <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 flex items-center justify-center h-64 md:h-80 border border-white/40">
            <span className="text-8xl md:text-9xl drop-shadow-sm">🧳</span>

            {/* Floating label */}
            <div className="absolute bottom-4 right-4 bg-blue-600 text-white text-sm px-3 py-1 rounded-full shadow-md">
              Best Seller
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

