

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Terms & Conditions</h1>
          <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <div className="prose prose-invert max-w-none">
            <div className="mb-8 p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
              <p className="text-yellow-300 text-sm">
                <strong>Important:</strong> These terms govern your use of TechBuddy. By using our services, you agree to these terms.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300">
                By accessing and using TechBuddy, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">2. User Accounts</h2>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                <li>You must be at least 18 years old to create an account</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You must provide accurate and complete information</li>
                <li>You are responsible for all activities under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">3. Premium Services</h2>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                <li>Premium memberships are billed in advance</li>
                <li>All fees are non-refundable except as required by law</li>
                <li>We reserve the right to change pricing with 30 days notice</li>
                <li>Automatic renewal unless canceled before renewal date</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. User Conduct</h2>
              <p className="text-gray-300 mb-4">You agree not to:</p>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                <li>Harass, abuse, or harm other users</li>
                <li>Post inappropriate or offensive content</li>
                <li>Use the service for any illegal purpose</li>
                <li>Impersonate any person or entity</li>
                <li>Attempt to gain unauthorized access to other accounts</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
              <p className="text-gray-300">
                All content on TechBuddy, including text, graphics, logos, and software, is the property of TechBuddy and protected by intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Termination</h2>
              <p className="text-gray-300">
                We may suspend or terminate your account at our sole discretion for violations of these terms. You may terminate your account at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-300">
                TechBuddy shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">8. Changes to Terms</h2>
              <p className="text-gray-300">
                We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Contact Information</h2>
              <p className="text-gray-300">
                Questions about these terms should be sent to: legal@techbuddy.work.gd
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;