
import Hero from '../components/Hero'
import  FeaturedProducts  from '../components/FeaturedProducts'
import Category from '../components/Category'
import Why from '../components/Why'
import Testimonials from '../components/Testimonials'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <Hero />
      <FeaturedProducts />
      <Category />
      <Why />
      <Testimonials />
    </div>
  )
}
