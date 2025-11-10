import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/login">
          <Button variant="outline" size="sm" className="mb-6 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>
        </Link>

        <h1 className="text-3xl font-bold text-green-400 mb-6">Privacy Policy</h1>
        
        <div className="space-y-6 text-zinc-300">
          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">1. Information We Collect</h2>
            <p className="mb-2">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Account information (name, email address, password)</li>
              <li>Subscription and payment information (processed securely through Stripe)</li>
              <li>Prediction history and analytics preferences</li>
              <li>Usage data and interaction with the Platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">2. How We Use Your Information</h2>
            <p className="mb-2">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Provide, maintain, and improve the Platform</li>
              <li>Process your subscription and payments</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Personalize your experience and provide tailored analytics</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, prevent, and address technical issues and security threats</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">3. Information Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>With service providers who perform services on our behalf (e.g., Stripe for payment processing)</li>
              <li>To comply with legal obligations or respond to lawful requests</li>
              <li>To protect the rights, property, or safety of PlayOracle™, our users, or others</li>
              <li>In connection with a merger, acquisition, or sale of assets (with notice to users)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">5. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide you with the Platform and fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">6. Your Rights and Choices</h2>
            <p className="mb-2">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Access and update your account information at any time</li>
              <li>Request deletion of your account and associated data</li>
              <li>Opt out of promotional communications</li>
              <li>Request a copy of your personal data</li>
              <li>Object to processing of your personal information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">7. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to collect information about your browsing activities and to remember your preferences. You can control cookies through your browser settings, but disabling cookies may affect your ability to use certain features of the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">8. Third-Party Services</h2>
            <p>
              The Platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read the privacy policies of any third-party services you access through the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">9. Children's Privacy</h2>
            <p>
              The Platform is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us to request deletion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country. By using the Platform, you consent to the transfer of your information to these countries.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">11. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on the Platform and updating the "Last Updated" date. Your continued use of the Platform after such changes constitutes your acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our privacy practices, please contact us through the Platform's support channels.
            </p>
          </section>

          <div className="mt-8 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
            <p className="text-sm text-zinc-400">
              Last Updated: November 9, 2025
            </p>
            <p className="text-sm text-zinc-400 mt-2">
              © 2025 PlayOracle™ Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
