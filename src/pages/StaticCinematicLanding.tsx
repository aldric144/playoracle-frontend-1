import { useNavigate } from 'react-router-dom';
import { TrendingUp, Zap, Target, Award, ChevronRight, Check } from 'lucide-react';
import { useFadeInOnView } from '../hooks/useFadeInOnView';
import '../styles/static-cinematic.css';

export function StaticCinematicLanding() {
  const navigate = useNavigate();
  const heroRef = useFadeInOnView();
  const subtitleRef = useFadeInOnView();
  const ctaRef = useFadeInOnView();

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
    <main className="static-landing">
      {/* Grid overlay - static, no animation */}
      <div className="grid-overlay" />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative">
        <div className="max-w-4xl text-center relative z-10">
          <h1 
            ref={heroRef as any} 
            className="fade-in hero-title hero-heading mb-6"
          >
            <span className="text-white">Play</span>
            <span className="text-green-400">Oracle</span>
            <span className="text-green-400 align-super text-2xl">™</span>
          </h1>
          
          <p 
            ref={subtitleRef as any} 
            className="fade-in text-xl sm:text-2xl text-gray-300 mb-4"
          >
            Master Sports Intelligence with AI
          </p>
          
          <p className="fade-in text-lg text-gray-400 max-w-3xl mx-auto mb-12">
            The first AI-powered sports mastery education platform. Learn, predict, and grow your sports IQ—not gambling, pure analytics.
          </p>
          
          <div 
            ref={ctaRef as any} 
            className="fade-in flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => navigate('/signup')}
              className="cta-static bg-green-400 text-black px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-green-400/50 flex items-center gap-2"
            >
              Start Free Today
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="cta-static bg-transparent border-2 border-green-400 text-green-400 px-8 py-4 rounded-lg font-bold text-lg"
            >
              Sign In
            </button>
          </div>
          
          <p className="mt-6 text-sm text-gray-500">
            No credit card required • Free forever plan available
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why <span className="text-green-400">PlayOracle</span>?
            </h2>
            <p className="text-xl text-gray-400">
              Cutting-edge AI technology meets sports analytics
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="feature-card fade-in">
                <div className="text-green-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your <span className="text-green-400">Plan</span>
            </h2>
            <p className="text-xl text-gray-400">
              Start free, upgrade anytime
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index} 
                className={`pricing-card fade-in ${tier.highlighted ? 'featured' : ''}`}
              >
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-gray-400 ml-2">/ {tier.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/signup')}
                  className={`cta-static w-full py-3 rounded-lg font-semibold ${
                    tier.highlighted
                      ? 'bg-green-400 text-black'
                      : 'bg-transparent border-2 border-green-400 text-green-400'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-spacing bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our Users <span className="text-green-400">Say</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card fade-in">
                <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-spacing">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Master <span className="text-green-400">Sports Intelligence</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of sports enthusiasts learning from AI-powered analytics.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="cta-static bg-green-400 text-black px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-green-400/50 flex items-center gap-2 mx-auto"
          >
            Start Your Free Account
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="mt-6 text-sm text-gray-500">
            No credit card required • Free forever plan available
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-2">PlayOracle™</h3>
              <p className="text-gray-400">AI-powered sports analytics and learning platform.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Premium Events</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
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
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p className="mb-2">
              PlayOracle™ is an analytical and learning tool, not a gambling platform. 
              Predictions are educational insights based on public data.
            </p>
            <p>© 2025 PlayOracle™ Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
