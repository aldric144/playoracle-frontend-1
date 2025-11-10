import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { Trophy, Calendar, Lock, TrendingUp, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

export function EventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      verifyAccess();
    }
  }, [slug]);

  const verifyAccess = async () => {
    try {
      const response = await api.verifyEventAccess(slug!);
      setEvent(response.event);
      setHasAccess(response.has_access);
    } catch (error) {
      console.error('Failed to verify access:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = async () => {
    try {
      const response = await api.mockEventCheckout(slug!, 'single');
      
      if (response.success) {
        alert(`✅ ${response.message}\n\nYou now have access to ${event.name}!`);
        verifyAccess();
      }
    } catch (error: any) {
      alert(`❌ ${error.message || 'Failed to unlock event'}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Loading event...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Event not found</p>
          <Button onClick={() => navigate('/dashboard')} className="bg-green-400 text-black hover:bg-green-500">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Trophy className="w-8 h-8 text-green-400" />
              <h1 className="text-2xl font-bold text-green-400">PlayOracle</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!hasAccess ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 text-center">
              <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-white mb-4">{event.name}</h1>
              <p className="text-gray-400 mb-8">
                This premium event is locked. Unlock it to access exclusive AI-powered analytics and predictions.
              </p>
              
              <div className="bg-gray-800 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-green-400 mb-4">What You'll Get:</h3>
                <ul className="text-left text-gray-300 space-y-2">
                  <li>✅ AI-powered predictions with DCI scoring</li>
                  <li>✅ Real-time analytics and insights</li>
                  <li>✅ Coach's Corner expert analysis</li>
                  <li>✅ Historical matchup data</li>
                  <li>✅ Exclusive event coverage</li>
                </ul>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleUnlock}
                  className="w-full bg-green-400 text-black px-8 py-4 rounded font-bold hover:bg-green-500 transition-colors text-lg"
                >
                  Unlock for $9.99 (Single Event)
                </button>
                <button
                  onClick={handleUnlock}
                  className="w-full bg-gray-700 text-white px-8 py-4 rounded font-bold hover:bg-gray-600 transition-colors text-lg"
                >
                  Season Pass - $29.99
                </button>
                <p className="text-gray-400 text-sm">
                  Note: Stripe integration is currently disabled. This is a mock checkout for testing.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-900 rounded-lg p-8 border border-green-400 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-green-400">{event.name}</h1>
                <span className="bg-green-400 text-black text-sm font-bold px-4 py-2 rounded">
                  UNLOCKED
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center text-gray-400 mb-2">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span className="font-bold">Event Status</span>
                  </div>
                  <p className="text-white text-lg capitalize">{event.status}</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center text-gray-400 mb-2">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    <span className="font-bold">AI Analytics</span>
                  </div>
                  <p className="text-green-400 text-lg font-bold">Active</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center text-gray-400 mb-2">
                    <Trophy className="w-5 h-5 mr-2" />
                    <span className="font-bold">Access Level</span>
                  </div>
                  <p className="text-white text-lg">Premium</p>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Event Analytics Dashboard</h2>
                <p className="text-gray-400 mb-6">
                  Welcome to your exclusive {event.name} analytics dashboard. Here you'll find AI-powered predictions,
                  real-time insights, and comprehensive coverage of all event games.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <h3 className="text-lg font-bold text-green-400 mb-2">Upcoming Predictions</h3>
                    <p className="text-gray-400">AI predictions will appear here as games are scheduled.</p>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <h3 className="text-lg font-bold text-green-400 mb-2">Live Analytics</h3>
                    <p className="text-gray-400">Real-time game analytics and momentum tracking.</p>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <h3 className="text-lg font-bold text-green-400 mb-2">Coach's Corner</h3>
                    <p className="text-gray-400">Expert analysis and strategic insights.</p>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <h3 className="text-lg font-bold text-green-400 mb-2">Historical Data</h3>
                    <p className="text-gray-400">Past matchups and performance trends.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
