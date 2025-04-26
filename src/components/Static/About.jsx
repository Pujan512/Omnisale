
import React from 'react';
import { useNavigate } from 'react-router';

const About = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-white min-h-screen main">
      <div className="py-16 px-4 text-center border-b border-zinc-200">
        <h1 className="text-3xl font-bold text-zinc-700 mb-2">About OmniSale</h1>
        <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
          The simple way to buy and sell in Nepal
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
          <div className="md:w-1/2">
            <img 
              src='/OmniLogo.png'
              alt="Omnisale"
              className="w-full h-auto max-w-md mx-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-zinc-700 mb-4">Our Marketplace</h2>
            <p className="text-zinc-600 mb-4">
              OmniSale connects buyers and sellers across Nepal with a secure platform to trade everything from electronics to home goods.
            </p>
            <p className="text-zinc-600">
              Founded in 2024, we're committed to making online commerce simple, safe, and accessible for everyone.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 border border-zinc-200 rounded-lg">
            <div className="text-zinc-700 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-700 mb-2">Secure Payments</h3>
            <p className="text-zinc-500">
              Khalti integration with buyer protection
            </p>
          </div>

          <div className="p-6 border border-zinc-200 rounded-lg">
            <div className="text-zinc-700 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-700 mb-2">12+ Categories</h3>
            <p className="text-zinc-500">
              Everything from electronics to groceries
            </p>
          </div>

          <div className="p-6 border border-zinc-200 rounded-lg">
            <div className="text-zinc-700 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-700 mb-2">Fast Delivery</h3>
            <p className="text-zinc-500">
              Reliable shipping across Nepal
            </p>
          </div>
        </div>

        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-zinc-700 mb-4">Ready to get started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/')} className="cursor-pointer bg-zinc-700 hover:bg-zinc-800 text-white px-6 py-2 rounded-md font-medium transition-colors">
              Start Shopping
            </button>
            <button onClick={() => navigate('/signup')} className="cursor-pointer border border-zinc-700 text-zinc-700 hover:bg-zinc-50 px-6 py-2 rounded-md font-medium transition-colors">
              Become a Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;