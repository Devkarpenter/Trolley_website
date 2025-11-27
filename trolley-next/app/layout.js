import '../styles/globals.css'
import { CartProvider } from '../context/cart-context'
import { AuthProvider } from '../context/auth-context'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Script from "next/script"   // ⭐ ADD THIS

export const metadata = {
  title: 'Trolley Store',
  description: 'Simple trolley ecommerce demo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ⭐ Load Google Identity BEFORE anything else */}
        <Script 
          src="https://accounts.google.com/gsi/client"
          strategy="beforeInteractive"
        />
      </head>

      <body>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="min-h-[60vh]">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
