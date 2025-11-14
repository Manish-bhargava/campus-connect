// components/AboutUs.jsx


const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">About TechBuddy</h1>
          <p className="text-xl text-gray-300">Connecting Developers Worldwide</p>
        </div>

        {/* Mission Section */}
        <div className="bg-gray-800/50 rounded-2xl p-8 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            TechBuddy is a premier networking platform designed exclusively for developers, 
            programmers, and tech enthusiasts. We bridge the gap between talented developers 
            worldwide, fostering collaboration, knowledge sharing, and professional growth.
          </p>
        </div>

        {/* What We Do */}
        <div className="bg-gray-800/50 rounded-2xl p-8 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700/30 p-6 rounded-xl">
              <div className="bg-blue-500 rounded-full p-3 inline-block mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Developer Networking</h3>
              <p className="text-gray-400">Connect with like-minded developers and expand your professional network</p>
            </div>
            
            <div className="bg-gray-700/30 p-6 rounded-xl">
              <div className="bg-green-500 rounded-full p-3 inline-block mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Collaboration</h3>
              <p className="text-gray-400">Find coding partners and work on exciting projects together</p>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Our Services</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-purple-500 rounded-full p-2 mt-1 mr-4">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Premium Memberships</h3>
                <p className="text-gray-400">Silver and Gold plans with enhanced networking capabilities</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple-500 rounded-full p-2 mt-1 mr-4">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707-9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Developer Matching</h3>
                <p className="text-gray-400">Smart algorithms to connect you with compatible developers</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple-500 rounded-full p-2 mt-1 mr-4">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707-9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Secure Communication</h3>
                <p className="text-gray-400">Built-in chat and collaboration tools</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;