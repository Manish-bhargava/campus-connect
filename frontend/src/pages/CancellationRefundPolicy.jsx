

const CancellationRefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Cancellation & Refund Policy</h1>
          <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <div className="prose prose-invert max-w-none">
            <div className="mb-8 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <p className="text-blue-300">
                <strong>Summary:</strong> You can cancel your premium membership at any time. Refunds are available within 14 days of initial purchase under specific conditions.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">1. Membership Cancellation</h2>
              
              <h3 className="text-xl font-semibold text-white mb-2">How to Cancel</h3>
              <ul className="text-gray-300 list-disc list-inside space-y-2 mb-4">
                <li>Login to your TechBuddy account</li>
                <li>Navigate to the Premium page</li>
                <li>Click on "Cancel Subscription"</li>
                <li>Follow the cancellation prompts</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-2">Cancellation Effects</h3>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                <li>Cancellation stops automatic renewal</li>
                <li>You retain access until the end of your billing period</li>
                <li>No partial refunds for unused time</li>
                <li>You can resubscribe at any time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">2. Refund Policy</h2>
              
              <h3 className="text-xl font-semibold text-white mb-2">Refund Eligibility</h3>
              <ul className="text-gray-300 list-disc list-inside space-y-2 mb-4">
                <li>Refund requests must be made within 14 days of purchase</li>
                <li>Only initial purchases are eligible for refunds</li>
                <li>Renewals and additional purchases are non-refundable</li>
                <li>Refunds are not available for partially used periods</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-2">Non-Refundable Situations</h3>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                <li>If you have used premium features extensively</li>
                <li>Violation of terms of service</li>
                <li>Account suspension due to policy violations</li>
                <li>Change of mind after 14 days</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">3. How to Request a Refund</h2>
              <ol className="text-gray-300 list-decimal list-inside space-y-2">
                <li>Contact our support team at support@techbuddy.work.gd</li>
                <li>Include your account email and purchase details</li>
                <li>Explain the reason for your refund request</li>
                <li>We will process your request within 7 business days</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. Processing Refunds</h2>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                <li>Approved refunds are processed within 7-10 business days</li>
                <li>Refunds are issued to the original payment method</li>
                <li>Bank processing times may vary</li>
                <li>You will receive email confirmation once processed</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Special Circumstances</h2>
              
              <h3 className="text-xl font-semibold text-white mb-2">Technical Issues</h3>
              <p className="text-gray-300 mb-4">
                If you experience persistent technical issues that prevent you from using our service, contact support immediately. We will work to resolve the issue or provide appropriate compensation.
              </p>

              <h3 className="text-xl font-semibold text-white mb-2">Billing Errors</h3>
              <p className="text-gray-300">
                If you believe you have been billed in error, contact us within 60 days of the charge. We will investigate and correct any verified errors.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Contact Information</h2>
              <p className="text-gray-300 mb-2">
                For cancellation and refund inquiries:
              </p>
              <p className="text-blue-400">support@techbuddy.work.gd</p>
              <p className="text-gray-300 mt-2">
                Response time: Within 24 hours during business days
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefundPolicy;