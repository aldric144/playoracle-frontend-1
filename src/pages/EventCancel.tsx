import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

export function EventCancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-700 text-center">
          <XCircle className="w-20 h-20 text-gray-400 mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Purchase Cancelled
          </h1>
          
          <p className="text-gray-400 mb-8">
            Your purchase was cancelled. No charges were made to your account.
            You can try again anytime to unlock premium event access.
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-green-400 text-black hover:bg-green-500 font-bold py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <p className="text-gray-400 text-sm">
              Note: This is a mock cancel page. Stripe integration is currently disabled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
