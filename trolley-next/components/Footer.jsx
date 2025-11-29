"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#0d0f1f] text-white py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Col 1 */}
        <div>
          <h3 className="text-xl font-bold mb-4">Trolley Store</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Premium trolley bags for travel lovers. Designed with durability,
            comfort & style in mind.
          </p>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Shop</li>
            <li>Categories</li>
            <li>Contact</li>
            <li>About</li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>FAQ</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>Warranty</li>
          </ul>
        </div>

        {/* Col 4 — Newsletter */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to get travel tips & latest offers.
            </p>

            <form className="mb-4">
              <input
                type="email"
                placeholder="Your email"
                autoComplete="off"
                data-lpignore="true"
                data-form-type="other"
                className="w-full px-4 py-2 bg-[#141824] text-white rounded-lg text-sm placeholder-gray-400 outline-none border border-gray-700 focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                data-lpignore="true"
                data-form-type="other"
                className="w-full mt-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-2 rounded-lg font-semibold"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <p className="text-center text-gray-400 mt-12 text-sm">
        © {new Date().getFullYear()} Trolley Store. All rights reserved.
      </p>
    </footer>
  );
}
