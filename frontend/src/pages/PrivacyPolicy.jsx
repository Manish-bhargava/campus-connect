// components/PrivacyPolicy.jsx


const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <div className="prose prose-invert max-w-none">
            <div className="mb-8 p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
              <p className="text-yellow-300 text-sm">
                <strong>Note:</strong> This is a sample privacy policy. Please consult with legal professionals to ensure compliance with applicable laws in your jurisdiction.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-white mb-2">Personal Information</h3>
              <ul className="text-gray-300 list-disc list-inside space-y-2 mb-4">
                <li>Name, email address, and contact information</li>
                <li>Profile information including skills, experience, and preferences</li>
                <li>Payment information for premium services</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-2">Technical Information</h3>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Usage data and analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                <li>To provide and maintain our services</li>
                <li>To process your payments and manage your account</li>
                <li>To connect you with other developers</li>
                <li>To send you important updates and notifications</li>
                <li>To improve our platform and user experience</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">3. Data Sharing and Disclosure</h2>
              <p className="text-gray-300 mb-4">
                We do not sell your personal information to third parties. We may share your information with:
              </p>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                <li>Service providers who assist in operating our platform</li>
                <li>Other users as part of the networking features (with your consent)</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners in case of mergers or acquisitions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
              <p className="text-gray-300">
                We implement appropriate security measures to protect your personal information, including encryption, access controls, and regular security assessments.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                <li>Access and review your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
              <p className="text-gray-300">
                For privacy-related questions or to exercise your rights, contact us at:
              </p>
              <p className="text-blue-400 mt-2">privacy@techbuddy.work.gd</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;