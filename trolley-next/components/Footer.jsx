"use client"
import Link from 'next/link'
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">TrolleyMart</h3>
            <p className="text-sm mb-4">Your trusted destination for premium trolleys and travel solutions.</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <FiMapPin className="w-4 h-4" />
                <span>123 Travel Street, City, ST 12345</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="w-4 h-4" />
                <a href="tel:+1234567890" className="hover:text-blue-400">+1 (234) 567-890</a>
              </div>
              <div className="flex items-center gap-2">
                <FiMail className="w-4 h-4" />
                <a href="mailto:support@trolleymart.com" className="hover:text-blue-400">support@trolleymart.com</a>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-blue-400">All Trolleys</Link></li>
              <li><Link href="#" className="hover:text-blue-400">Travel Bags</Link></li>
              <li><Link href="#" className="hover:text-blue-400">Cabin Luggage</Link></li>
              <li><Link href="#" className="hover:text-blue-400">Business Cases</Link></li>
              <li><Link href="#" className="hover:text-blue-400">Accessories</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-blue-400">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-blue-400">Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-blue-400">Returns & Exchanges</Link></li>
              <li><Link href="#" className="hover:text-blue-400">FAQ</Link></li>
              <li><Link href="#" className="hover:text-blue-400">Track Order</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-400">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-blue-400">Warranty</Link></li>
              <li><Link href="#" className="hover:text-blue-400">Cookies Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-400">Sitemap</Link></li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Connected</h4>
            <p className="text-sm mb-3">Subscribe for exclusive offers and updates.</p>
            <form className="mb-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 bg-gray-800 text-white rounded text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium transition-colors">
                Subscribe
              </button>
            </form>
            <div className="flex gap-3">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><FiFacebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><FiTwitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><FiInstagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><FiLinkedin className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>© {new Date().getFullYear()} TrolleyMart. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white">Accessibility</Link>
            <Link href="#" className="hover:text-white">Security</Link>
            <Link href="#" className="hover:text-white">Sustainability</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
