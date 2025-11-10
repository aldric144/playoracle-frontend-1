import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Zap, Target, Award, ChevronRight, Check } from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "AI-Powered Predictions",
      description: "Advanced machine learning algorithms analyze thousands of data points to deliver accurate game forecasts."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "DCI Scoring System",
      description: "Our proprietary Data Confidence Index shows you exactly how reliable each prediction is."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-Time Analytics",
      description: "Live updates and insights as games unfold, helping you understand the action as it happens."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Premium Events",
      description: "Exclusive access to March Madness, Super Bowl, World Series, and championship analytics."
    }
  ];

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "Basic game predictions",
        "DCI scoring",
        "Weekly analytics",
        "Community access"
      ],
      cta: "Get Started Free",
      highlighted: false
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      features: [
        "Everything in Free",
        "Advanced analytics",
        "Historical data access",
        "Priority support",
        "Ad-free experience"
      ],
      cta: "Start Pro Trial",
      highlighted: true
    },
    {
      name: "Oracle Elite",
      price: "$199",
      period: "per year",
      features: [
        "Everything in Pro",
        "All premium events included",
        "Exclusive AI insights",
        "Personal analytics dashboard",
        "Early access to new features"
      ],
      cta: "Go Elite",
      highlighted: false
    }
  ];

  const testimonials = [
    {
      name: "Michael R.",
      role: "Sports Analyst",
      quote: "PlayOracle has transformed how I analyze games. The DCI scoring system is a game-changer."
    },
    {
      name: "Sarah K.",
      role: "Fantasy League Champion",
      quote: "The March Madness predictions helped me win my bracket pool for the first time in 5 years!"
    },
    {
      name: "David L.",
      role: "Sports Enthusiast",
      quote: "Finally, an analytics platform that's educational and not about gambling. Love it!"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-green-400 via-transparent to-transparent"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div 
            className="mb-8 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="text-white">Play</span>
              <span className="text-green-400">Oracle</span>
              <span className="text-green-400 text-2xl align-super">™</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-4">
              Master Sports Intelligence with AI
            </p>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              The first AI-powered sports mastery education platform. Learn, predict, and grow your sports IQ—not gambling, pure analytics.
            </p>
          </div>

          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
          >
            <button
              onClick={() => navigate('/signup')}
              className="bg-green-400 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-500 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Start Free Today
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-transparent border-2 border-green-400 text-green-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-400 hover:text-black transition-all"
            >
              Sign In
            </button>
          </div>

          <p className="mt-8 text-gray-500 text-sm opacity-0 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            No credit card required • Free forever plan available
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-green-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
            Why <span className="text-green-400">PlayOracle™</span>?
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Cutting-edge AI technology meets sports analytics to create the ultimate learning platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-8 border border-gray-700 hover:border-green-400 transition-all transform hover:scale-105"
                style={{
                  opacity: scrollY > 300 ? 1 : 0,
                  transform: scrollY > 300 ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease-out ${index * 0.1}s`
                }}
              >
                <div className="text-green-400 mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Events Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
            Premium <span className="text-green-400">Event Intelligence</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Unlock exclusive AI-powered analytics for the biggest sporting events of the year.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {['March Madness', 'Super Bowl', 'World Series', 'NBA Finals', 'Racing Championship'].map((event, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-green-400 transition-all"
              >
                <h3 className="text-xl font-bold mb-2">{event}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Deep analytics, bracket predictions, and real-time insights.
                </p>
                <span className="text-green-400 font-bold">$9.99 per event</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
            Choose Your <span className="text-green-400">Plan</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Start free and upgrade anytime. No hidden fees, cancel whenever you want.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`rounded-lg p-8 ${
                  tier.highlighted
                    ? 'bg-green-400 text-black border-4 border-green-300 transform scale-105'
                    : 'bg-gray-800 border border-gray-700'
                }`}
              >
                {tier.highlighted && (
                  <div className="text-center mb-4">
                    <span className="bg-black text-green-400 px-4 py-1 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className={tier.highlighted ? 'text-gray-800' : 'text-gray-400'}>
                    {' '}/{tier.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <Check className={`w-5 h-5 flex-shrink-0 ${tier.highlighted ? 'text-black' : 'text-green-400'}`} />
                      <span className={tier.highlighted ? 'text-gray-900' : 'text-gray-300'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/signup')}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    tier.highlighted
                      ? 'bg-black text-green-400 hover:bg-gray-900'
                      : 'bg-green-400 text-black hover:bg-green-500'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">
            What Our <span className="text-green-400">Users Say</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Master <span className="text-green-400">Sports Intelligence</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of sports enthusiasts learning from AI-powered analytics.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="bg-green-400 text-black px-12 py-4 rounded-lg font-bold text-xl hover:bg-green-500 transition-all transform hover:scale-105 inline-flex items-center gap-2"
          >
            Start Your Free Account
            <ChevronRight className="w-6 h-6" />
          </button>
          <p className="mt-6 text-gray-500">
            No credit card required • Free forever plan available
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-white">Play</span>
                <span className="text-green-400">Oracle</span>
                <span className="text-green-400 text-sm align-super">™</span>
              </h3>
              <p className="text-gray-400">
                AI-powered sports analytics and learning platform.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-green-400 transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-green-400 transition-colors">Pricing</a></li>
                <li><a href="#events" className="hover:text-green-400 transition-colors">Premium Events</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/terms-of-use" className="hover:text-green-400 transition-colors">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="/privacy-policy" className="hover:text-green-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p className="mb-4">
              PlayOracle™ is an analytical and learning tool, not a gambling platform. 
              Predictions are educational insights based on public data.
            </p>
            <p>© 2025 PlayOracle™ Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}
