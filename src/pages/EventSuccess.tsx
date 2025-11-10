import { useNavigate } from 'react-router-dom';
import { CheckCircle, Trophy } from 'lucide-react';
import { Button } from '../components/ui/button';

export function EventSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-gray-900 rounded-lg p-8 border border-green-400 text-center">
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold text-green-400 mb-4">
            Purchase Successful!
          </h1>
          
          <p className="text-gray-300 mb-6">
            Your premium event access has been activated. You can now access exclusive AI-powered analytics
            and predictions for your purchased event.
          </p>

          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-bold text-white">What's Next?</h2>
            </div>
            <ul className="text-left text-gray-300 space-y-2">
              <li>✅ Access your event dashboard from the Premium Events section</li>
              <li>✅ View AI-powered predictions and analytics</li>
              <li>✅ Get real-time insights and Coach's Corner analysis</li>
              <li>✅ Track your prediction accuracy and compete on leaderboards</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-green-400 text-black hover:bg-green-500 font-bold py-3"
            >
              Go to Dashboard
            </Button>
            <p className="text-gray-400 text-sm">
              Note: This is a mock success page. Stripe integration is currently disabled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
