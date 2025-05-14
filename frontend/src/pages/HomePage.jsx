import React from 'react'
import CategoryItem from '../components/CategoryItem';
import TestimonialAccordion from '../components/TestimonialAccordion';
import Footer from '../components/Footer';
import AffiliateForm from '../components/AffiliateForm';

const HomePage = () => {

  const categories = [
    { href: "/jigsimuronebottle", name: "jigsimur one bottle", price: "17000", imageUrl: "/jigsimuronebottle.jpg" },
    { href: "/jigsimurtwobottles", name: "jigsimur two bottles", price: "34000", imageUrl: "/jigsimurtwobottles.jpg" },
    { href: "/jigsimurthreebottles", name: "jigsimur three bottles", price: "51000", imageUrl: "/jigsimurthreebottles.jpg" },
    { href: "/jigsimurfourbottle", name: "jigsimur four bottles", price: "68000", imageUrl: "/jigsimurfourbottle.jpg" },
    { href: "/jigsimurfivebottle", name: "jigsimur five bottle", price: "85000", imageUrl: "/jigsimurfivebottle.jpg" },
    { href: "/jigsimursixbottles", name: "jigsimur six bottles", price: "100500", imageUrl: "/jigsimursixbottles.jpg" },
    // { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
  ];

  return (
    <div className='relative min-h-screen text-white overflow-hidden'>
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
      <h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
					Jigsimur Works and it Pays!!!
				</h1>
				<p className='text-center text-xl text-gray-300 mb-12'>
					Natural Health Drink JIGSIMUR (Aloe Ferox)
				</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>
      </div>
      <TestimonialAccordion />
      <AffiliateForm />
      <Footer />
    </div>
  )
}

export default HomePage