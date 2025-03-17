import React from 'react'
import Hero from '@/components/Hero'
import Layout from '@/components/Layout'
import About from '@/components/AboutUs'
import Testimonials from '@/components/Testimonials'

function page() {
  return (
    <>
      <Hero />
      <About />
      <Testimonials />
    </>
  )
}

export default page
