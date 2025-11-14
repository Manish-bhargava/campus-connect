

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300">Get in touch with our team</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-3 mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Email Address</h3>
                  <p className="text-gray-400">support@techbuddy.work.gd</p>
                  <p className="text-gray-400">business@techbuddy.work.gd</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-500 rounded-full p-3 mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Phone Number</h3>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                  <p className="text-gray-400 text-sm">Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-500 rounded-full p-3 mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Business Address</h3>
                  <p className="text-gray-400">123 Tech Street</p>
                  <p className="text-gray-400">San Francisco, CA 94105</p>
                  <p className="text-gray-400">United States</p>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="mt-8 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <h4 className="text-white font-semibold mb-2">Response Time</h4>
              <p className="text-blue-300 text-sm">
                We typically respond to all inquiries within 24 hours during business days.
              </p>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-white mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Subject</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Billing Issue</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white mb-2">Message</label>
                <textarea 
                  rows="4"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Describe your inquiry in detail..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;