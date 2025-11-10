import { useState, useEffect } from 'react';
import { Lock, Calendar, TrendingUp } from 'lucide-react';
import { api } from '../../lib/api';

interface PremiumEvent {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: string;
  start_date: string;
  end_date: string;
  expiration_date: string;
  has_access: boolean;
  is_expired: boolean;
  can_unlock: boolean;
  price_single: number;
  price_season: number;
}

export function EventCarousel() {
  const [events, setEvents] = useState<PremiumEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<PremiumEvent | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await api.getEventsList();
      setEvents(response.events);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = async (event: PremiumEvent) => {
    try {
      const response = await api.mockEventCheckout(event.slug, 'single');
      
      if (response.success) {
        alert(`✅ ${response.message}\n\nYou now have access to ${event.name}!`);
        loadEvents();
      }
    } catch (error: any) {
      alert(`❌ ${error.message || 'Failed to unlock event'}`);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h2 className="text-2xl font-bold text-green-400 mb-4">Premium Events</h2>
        <p className="text-gray-400">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-green-400 mb-2">Premium Events</h2>
          <p className="text-gray-400">Unlock exclusive AI-powered analytics for major sporting events</p>
        </div>
        <TrendingUp className="text-green-400" size={32} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className={`bg-gray-800 rounded-lg p-4 border ${
              event.has_access ? 'border-green-400' : 'border-gray-700'
            } hover:border-green-400 transition-colors cursor-pointer`}
            onClick={() => setSelectedEvent(event)}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-white">{event.name}</h3>
              {event.has_access ? (
                <span className="bg-green-400 text-black text-xs font-bold px-2 py-1 rounded">
                  UNLOCKED
                </span>
              ) : event.is_expired ? (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  EXPIRED
                </span>
              ) : (
                <Lock className="text-gray-400" size={20} />
              )}
            </div>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>

            <div className="flex items-center text-gray-400 text-xs mb-3">
              <Calendar size={14} className="mr-1" />
              <span>{formatDate(event.start_date)} - {formatDate(event.end_date)}</span>
            </div>

            {!event.has_access && (
              <div className="flex items-center justify-between">
                <span className={`font-bold ${event.is_expired ? 'text-gray-500' : 'text-green-400'}`}>
                  ${event.price_single}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!event.is_expired) {
                      handleUnlock(event);
                    }
                  }}
                  disabled={event.is_expired}
                  className={`px-4 py-2 rounded font-bold transition-colors text-sm ${
                    event.is_expired
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-green-400 text-black hover:bg-green-500'
                  }`}
                >
                  {event.is_expired ? 'Expired' : 'Unlock Now'}
                </button>
              </div>
            )}

            {event.has_access && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/events/${event.slug}`;
                }}
                className="w-full bg-green-400 text-black px-4 py-2 rounded font-bold hover:bg-green-500 transition-colors text-sm"
              >
                View Analytics
              </button>
            )}
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <p className="text-gray-400 text-center py-8">No premium events available at this time.</p>
      )}

      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full border border-green-400"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-green-400">{selectedEvent.name}</h2>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-300 mb-6">{selectedEvent.description}</p>

            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex items-center text-gray-400 mb-2">
                <Calendar size={16} className="mr-2" />
                <span className="font-bold">Event Dates:</span>
              </div>
              <p className="text-white ml-6">
                {formatDate(selectedEvent.start_date)} - {formatDate(selectedEvent.end_date)}
              </p>
              <p className="text-gray-400 text-sm ml-6 mt-1">
                Access expires: {formatDate(selectedEvent.expiration_date)}
              </p>
            </div>

            {selectedEvent.has_access ? (
              <button
                onClick={() => window.location.href = `/events/${selectedEvent.slug}`}
                className="w-full bg-green-400 text-black px-6 py-3 rounded font-bold hover:bg-green-500 transition-colors"
              >
                View Event Analytics
              </button>
            ) : selectedEvent.is_expired ? (
              <div className="bg-red-900 border border-red-500 rounded-lg p-4 text-center">
                <p className="text-red-400 font-bold mb-2">This Event Has Expired</p>
                <p className="text-gray-400 text-sm">
                  Access expired on {formatDate(selectedEvent.expiration_date)}. This event can no longer be unlocked.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => handleUnlock(selectedEvent)}
                  className="w-full bg-green-400 text-black px-6 py-3 rounded font-bold hover:bg-green-500 transition-colors"
                >
                  Unlock for ${selectedEvent.price_single} (Single Event)
                </button>
                <button
                  onClick={() => handleUnlock(selectedEvent)}
                  className="w-full bg-gray-700 text-white px-6 py-3 rounded font-bold hover:bg-gray-600 transition-colors"
                >
                  Season Pass - ${selectedEvent.price_season}
                </button>
                <p className="text-gray-400 text-sm text-center">
                  Note: Stripe integration is currently disabled. This is a mock checkout for testing.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
