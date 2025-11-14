import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [processingType, setProcessingType] = useState(null);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });
      setIsUserPremium(res.data.isPremium);
    } catch (err) {
      console.error("Failed to verify premium status:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      setProcessingType(type);
      const order = await axios.post(
        BASE_URL + "/payment/create",
        {
          membershipType: type,
        },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "TechBuddy",
        description: "Unlock premium features and connect with developers",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#3B82F6",
        },
        handler: async function (response) {
          await verifyPremiumUser();
          setProcessingType(null);
        },
        modal: {
          ondismiss: function() {
            setProcessingType(null);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Failed to create order:", err);
      setProcessingType(null);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-white">Checking your membership...</h2>
          </div>
        </div>
      </div>
    );
  }

  // Premium user state
  if (isUserPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-6 inline-block mb-6">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Premium Membership Active! 🎉</h1>
            <p className="text-xl text-gray-300 mb-8">
              Thank you for being a valued TechBuddy Premium member. Enjoy all the exclusive features!
            </p>
            <div className="bg-gray-800 rounded-2xl p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-white mb-4">Your Benefits:</h3>
              <ul className="text-gray-300 space-y-2 text-left">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Unlimited Connection Requests
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Priority Profile Visibility
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified Blue Badge
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Advanced Search Filters
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Free user - pricing plans
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Upgrade to Premium</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Unlock exclusive features and accelerate your developer networking journey
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Silver Plan */}
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-600 shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="text-center mb-6">
              <div className="bg-gradient-to-br from-gray-400 to-gray-600 rounded-full p-4 inline-block mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Silver Plan</h2>
              <div className="text-4xl font-bold text-white mb-2">₹499</div>
              <p className="text-gray-400">3 months</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-300">
                <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Unlimited Chat with Connections
              </li>
              <li className="flex items-center text-gray-300">
                <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                100 Connection Requests per day
              </li>
              <li className="flex items-center text-gray-300">
                <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified Blue Badge
              </li>
              <li className="flex items-center text-gray-300">
                <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Basic Search Filters
              </li>
            </ul>

            <button
              onClick={() => handleBuyClick("silver")}
              disabled={processingType}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:transform-none transition-all duration-300"
            >
              {processingType === "silver" ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                "Get Silver Plan"
              )}
            </button>
          </div>

          {/* Gold Plan - Featured */}
          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-8 border border-yellow-400 shadow-2xl transform hover:scale-105 transition-all duration-300 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-white text-orange-600 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                MOST POPULAR
              </span>
            </div>
            
            <div className="text-center mb-6">
              <div className="bg-white/20 rounded-full p-4 inline-block mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707-9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Gold Plan</h2>
              <div className="text-4xl font-bold text-white mb-2">₹899</div>
              <p className="text-white/80">6 months</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-white">
                <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707-9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Everything in Silver, plus:
              </li>
              <li className="flex items-center text-white">
                <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707-9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Unlimited Connection Requests
              </li>
              <li className="flex items-center text-white">
                <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707-9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Priority Profile Visibility
              </li>
              <li className="flex items-center text-white">
                <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707-9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Advanced Search Filters
              </li>
              <li className="flex items-center text-white">
                <svg className="w-5 h-5 text-white mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707-9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Early Access to New Features
              </li>
            </ul>

            <button
              onClick={() => handleBuyClick("gold")}
              disabled={processingType}
              className="w-full bg-white text-orange-600 font-bold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:transform-none transition-all duration-300"
            >
              {processingType === "gold" ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-orange-600 mr-2"></div>
                  Processing...
                </div>
              ) : (
                "Get Gold Plan"
              )}
            </button>
          </div>
        </div>

        {/* Features Comparison */}
        <div className="max-w-4xl mx-auto mt-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">All Premium Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-gray-800/50 rounded-xl p-6">
              <div className="bg-blue-500 rounded-full p-3 inline-block mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Expand Network</h4>
              <p className="text-gray-400">Connect with unlimited developers and grow your professional circle</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6">
              <div className="bg-green-500 rounded-full p-3 inline-block mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Verified Badge</h4>
              <p className="text-gray-400">Get the blue verification badge and build trust in the community</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6">
              <div className="bg-purple-500 rounded-full p-3 inline-block mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Advanced Search</h4>
              <p className="text-gray-400">Find the perfect developer match with powerful filtering options</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;