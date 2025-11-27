"use client"
import Link from 'next/link'
import { motion } from "framer-motion"   // ⭐ Added animation library

import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
} from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-[#0d0f16] text-gray-300 mt-20 relative overflow-hidden">

      {/* ⭐ Animated glowing background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/5 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-14">

        {/* ⭐ Smooth fade-in for entire footer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-5 gap-10"
        >

          {/* ---------------- COMPANY INFO ---------------- */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-white font-extrabold text-2xl tracking-tight mb-4"
            >
              TrolleyMart
            </motion.h3>

            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Your trusted destination for premium trolleys and smart travel gear.
            </p>

            {/* Company contact info */}
            <div className="space-y-3 text-sm">

              <div className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition">
                <FiMapPin className="w-4 h-4" />
                <span>123 Travel Street, Mumbai, India</span>
              </div>

              <a href="tel:+91000000000" className="flex items-center gap-2 hover:text-blue-400 transition">
                <FiPhone className="w-4 h-4" />
                +91 00000 00000
              </a>

              <a href="mailto:support@trolleymart.com" className="flex items-center gap-2 hover:text-blue-400 transition">
                <FiMail className="w-4 h-4" />
                support@trolleymart.com
              </a>

            </div>
          </div>

          {/* ---------------- PRODUCTS ---------------- */}
          <FooterColumn title="Products" items={[
            ["All Trolleys", "/products"],
            ["Travel Bags", "#"],
            ["Cabin Luggage", "#"],
            ["Business Cases", "#"],
            ["Accessories", "#"],
          ]} />

          {/* ---------------- SUPPORT ---------------- */}
          <FooterColumn title="Support" items={[
            ["Contact Us", "/contact"],
            ["Shipping Info", "#"],
            ["Returns & Exchanges", "#"],
            ["FAQ", "#"],
            ["Track Order", "#"],
          ]} />

          {/* ---------------- LEGAL ---------------- */}
          <FooterColumn title="Legal" items={[
            ["Privacy Policy", "#"],
            ["Terms of Service", "#"],
            ["Warranty", "#"],
            ["Cookies Policy", "#"],
            ["Sitemap", "#"],
          ]} />

          {/* ---------------- NEWSLETTER ---------------- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className=""
          >
            <h4 className="text-white font-semibold text-lg mb-4">Stay Updated</h4>
            <p className="text-sm text-gray-400 mb-3">
              Get exclusive offers & the latest product updates.
            </p>

            {/* Newsletter input */}
            <form className="mb-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 bg-[#141824] text-white rounded-lg text-sm 
                           placeholder-gray-500 focus:outline-none focus:ring-2 
                           focus:ring-blue-500 transition"
              />

              <button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 
                  hover:from-blue-700 hover:to-indigo-700 text-white py-2 mt-2 rounded-lg 
                  text-sm font-medium shadow-md shadow-blue-900/20 transition-all"
              >
                Subscribe
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex gap-4">
              {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.15, color: "#60a5fa" }}
                  className="cursor-pointer text-gray-400 hover:text-blue-400 transition"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

        </motion.div>

        {/* ---------------- DIVIDER ---------------- */}
        <div className="border-t border-gray-800 my-10"></div>

        {/* ---------------- BOTTOM BAR ---------------- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500"
        >
          <p>© {new Date().getFullYear()} TrolleyMart — All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            {["Accessibility", "Security", "Sustainability"].map((t, i) => (
              <Link
                key={i}
                href="#"
                className="hover:text-blue-400 transition"
              >
                {t}
              </Link>
            ))}
          </div>
        </motion.div>

      </div>
    </footer>
  )
}

/* ⭐ Reusable Footer Column Component (Modern + Animated) */
function FooterColumn({ title, items }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h4 className="text-white font-semibold text-lg mb-4">{title}</h4>
      <ul className="space-y-2">
        {items.map(([label, link], i) => (
          <li key={i}>
            <Link
              href={link}
              className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
