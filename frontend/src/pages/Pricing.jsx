// components/Pricing.jsx
import React from 'react';

const Pricing = () => {
  const features = [
    'Unlimited Profile Views',
    'Basic Search Filters',
    'Up to 50 Connection Requests per month',
    'Standard Customer Support',
    'Community Access'
  ];

  const silverFeatures = [
    'Everything in Free, plus:',
    'Unlimited Connection Requests',
    'Advanced Search Filters',
    'Priority Profile Visibility',
    'Verified Blue Badge',
    'Enhanced Matching Algorithm',
    'Email Support'
  ];

  const goldFeatures = [
    'Everything in Silver, plus:',
    'Top Priority in Search Results',
    'Early Access to New Features',
    'Dedicated Account Manager',
    'Custom Profile Themes',
    'Advanced Analytics',
    '24/7 Priority Support',
    'API Access (where available)'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Pricing Plans</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the plan that works best for your networking needs. All plans include our core features with additional benefits for premium members.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Free</h2>
              <div className="text-4xl font-bold text-white mb-2">$0</div>
              <p className="text-gray-400">Forever free</p>
            </div>

            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707-9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Get Started Free
            </button>
          </div>

          {/* Silver Plan */}
          <div className="bg-gray-800 rounded-2xl p-8 border-2 border-blue-500 transform scale-105 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </span>
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Silver</h2>
              <div className="text-4xl font-bold text-white mb-2">$9.99</div>
              <p className="text-gray-400">per month</p>
            </div>

            <ul className="space-y-4 mb-8">
              {silverFeatures.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707-9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Start Silver Plan
            </button>
          </div>

          {/* Gold Plan */}
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-yellow-500">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Gold</h2>
              <div className="text-4xl font-bold text-white mb-2">$19.99</div>
              <p className="text-gray-400">per month</p>
            </div>

            <ul className="space-y-4 mb-8">
              {goldFeatures.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707-9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Start Gold Plan
            </button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">💳 Payment Methods</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Credit/Debit Cards (Visa, MasterCard, American Express)</li>
              <li>• PayPal</li>
              <li>• Bank Transfer (Enterprise plans)</li>
              <li>• Cryptocurrency (Coming soon)</li>
            </ul>
          </div>

          <div className="bg-gray-800/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">🔄 Billing Cycle</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Monthly or annual billing available</li>
              <li>• Automatic renewal</li>
              <li>• Cancel anytime</li>
              <li>• 14-day money-back guarantee</li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Can I switch plans?</h3>
              <p className="text-gray-400">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Is there a free trial?</h3>
              <p className="text-gray-400">We offer a 14-day money-back guarantee instead of a free trial for premium features.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Do you offer discounts?</h3>
              <p className="text-gray-400">Yes! We offer 20% discount for annual billing and special rates for students and educational institutions.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-400">We accept all major credit cards, PayPal, and will soon support cryptocurrency payments.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;