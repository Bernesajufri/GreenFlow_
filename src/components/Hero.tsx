import React from 'react';
import plant1 from '@/assets/plant1.jpg'

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Hero Section */}
      <section className="bg-teal-100 rounded-xl m-6 p-10 flex items-center relative overflow-hidden">
        <div>
          <h1 className="text-4xl font-bold mb-4">Buy your <br /> dream plants</h1>
          <p className="text-gray-500 mb-4">100+ Customers</p>
          <div className="flex items-center justify-center gap-4">
            <p className="text-gray-500">see more of our</p>
            <button className="bg-white border shadow-red rounded-full px-4 py-2 font-medium">
              products
            </button>
          </div>

        </div>
        <div className="absolute right-10 bottom-0">
          <img src="assets/promoPlant.png" alt="Plant" className="h-64" />
        </div>
      </section>

      {/* Best Selling Plants */}
      <section className="m-6">
        <h2 className="text-3xl font-bold mb-2">Best Selling Plants</h2>
        <p className="text-gray-500 mb-6">Easiest way to healthy life by buying your favorite plants</p>


        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="border rounded-xl p-4 text-center">
            <img src="assets/plant1.jpg" alt="Natural Plants" className="mx-auto mb-4 h-40" />
            <p>Natural Plants</p>
            <p className="text-gray-500">₱ 1,400.00</p>
          </div>
          <div className="border rounded-xl p-4 text-center">
            <img src="assets/plant1.jpg" alt="Artificial Plants" className="mx-auto mb-4 h-40" />
            <p>Artificial Plants</p>
            <p className="text-gray-500">₱ 900.00</p>
          </div>
          <div className="border rounded-xl p-4 text-center">
            <img src="assets/plant1.jpg" alt="Artificial Plants" className="mx-auto mb-4 h-40" />
            <p>Artificial Plants</p>
            <p className="text-gray-500">₱ 3,500.00</p>
          </div>
        </div>

        <button className="bg-teal-100 px-4 py-2 rounded-full font-medium m-2">See more →</button>
      </section>
    </div>
  );
}
