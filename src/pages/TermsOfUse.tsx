import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function TermsOfUse() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/login">
          <Button variant="outline" size="sm" className="mb-6 border-zinc-700 text-zinc-300 hover:bg-zinc-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>
        </Link>

        <h1 className="text-3xl font-bold text-green-400 mb-6">Terms of Use</h1>
        
        <div className="space-y-6 text-zinc-300">
          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using PlayOracle™ ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Use, please do not use the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">2. Description of Service</h2>
            <p>
              PlayOracle™ is an educational sports analytics platform that provides AI-powered predictions, statistical analysis, and learning tools. The Platform is designed for entertainment and educational purposes only and is NOT a gambling platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">3. No Gambling or Wagering</h2>
            <p>
              PlayOracle™ does not facilitate, encourage, or support gambling, betting, or wagering of any kind. All predictions and analytics are provided for educational and entertainment purposes only. Users are prohibited from using the Platform for any gambling-related activities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">4. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">5. Intellectual Property</h2>
            <p>
              All content, features, and functionality of the Platform, including but not limited to text, graphics, logos, icons, images, audio clips, video clips, data compilations, and software, are the exclusive property of PlayOracle™ Technologies and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">6. Disclaimer of Warranties</h2>
            <p>
              The Platform and all predictions, analytics, and content are provided "as is" without warranty of any kind, either express or implied. PlayOracle™ does not guarantee the accuracy, completeness, or usefulness of any predictions or analytics provided through the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">7. Limitation of Liability</h2>
            <p>
              PlayOracle™ Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Platform, including but not limited to any losses or damages arising from decisions made based on predictions or analytics provided by the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">8. Subscription and Payment</h2>
            <p>
              Certain features of the Platform require a paid subscription. By subscribing, you agree to pay all applicable fees and charges. All payments are processed securely through Stripe. Subscriptions automatically renew unless cancelled before the renewal date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">9. Prohibited Uses</h2>
            <p>
              You may not use the Platform to: (a) engage in any unlawful activity; (b) violate any applicable laws or regulations; (c) infringe upon the rights of others; (d) transmit any harmful code or malware; (e) attempt to gain unauthorized access to the Platform or related systems; (f) use the Platform for gambling or wagering purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">10. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account and access to the Platform at our sole discretion, without notice, for conduct that we believe violates these Terms of Use or is harmful to other users, us, or third parties, or for any other reason.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Use at any time. We will notify users of any material changes by posting the new Terms of Use on the Platform. Your continued use of the Platform after such modifications constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">12. Governing Law</h2>
            <p>
              These Terms of Use shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-green-400 mb-3">13. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Use, please contact us through the Platform's support channels.
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
