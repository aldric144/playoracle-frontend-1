import { useNavigate } from 'react-router-dom';
import { TrendingUp, Target, Zap, Award, ChevronRight, Check, Calendar, Trophy } from 'lucide-react';
import '../styles/landing-lite.css';

export function LandingPageLite() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "AI-Powered Predictions",
      description: "Neural networks analyze thousands of data points to forecast game outcomes with unprecedented accuracy."
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "DCI Scoring",
      description: "Your Decision Confidence Index in real time. Know exactly how reliable each prediction is before you commit."
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Live Analytics",
      description: "Real-time insights as games unfold. See momentum shifts, probability updates, and key play analysis instantly."
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Premium Events",
      description: "Unlock March Madness to Super Bowl and beyond. Exclusive AI insights for championship moments."
    }
  ];

  const premiumEvents = [
    {
      slug: "march-madness-2025",
      title: "March Madness 2025",
      emoji: "🏀",
      gradient: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
      dates: "Mar 10 - Apr 7, 2025",
      price: "$9.99",
      expiryDate: new Date('2025-04-07')
    },
    {
      slug: "super-bowl-2026",
      title: "Super Bowl 2026",
      emoji: "🏈",
      gradient: "linear-gradient(135deg, #4A90E2 0%, #7B68EE 100%)",
      dates: "Jan 10 - Feb 8, 2026",
      price: "$9.99",
      expiryDate: new Date('2026-02-08')
    },
    {
      slug: "world-series-2025",
      title: "World Series 2025",
      emoji: "⚾",
      gradient: "linear-gradient(135deg, #00E676 0%, #00BFA5 100%)",
      dates: "Oct 10 - Oct 30, 2025",
      price: "$9.99",
      expiryDate: new Date('2025-10-30')
    },
    {
      slug: "nba-finals-2025",
      title: "NBA Finals 2025",
      emoji: "🏆",
      gradient: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
      dates: "Jun 1 - Jun 25, 2025",
      price: "$9.99",
      expiryDate: new Date('2025-06-25')
    },
    {
      slug: "racing-championship-2025",
      title: "Racing Championship 2025",
      emoji: "🏎️",
      gradient: "linear-gradient(135deg, #E91E63 0%, #FF6B9D 100%)",
      dates: "Nov 1 - Nov 30, 2025",
      price: "$9.99",
      expiryDate: new Date('2025-11-30')
    }
  ];

  const pricingPlans = [
    {
      tier: "Free Scout",
      price: "$0",
      period: "forever",
      features: [
        "3 AI forecasts per week",
        "Basic DCI scoring",
        "Community access",
        "Weekly analytics digest"
      ],
      cta: "Start Free Today",
      featured: false
    },
    {
      tier: "Pro Analyst",
      price: "$14.99",
      period: "per month",
      features: [
        "Unlimited AI forecasts",
        "All sports + Coach's Corner™",
        "Advanced analytics dashboard",
        "Priority support",
        "Ad-free experience"
      ],
      cta: "Start Pro Trial",
      featured: true
    },
    {
      tier: "Oracle Elite Annual",
      price: "$199",
      period: "per year",
      features: [
        "Everything in Pro Analyst",
        "All Premium Events included",
        "Exclusive AI insights",
        "Personal analytics dashboard",
        "Early access to new features"
      ],
      cta: "Go Elite",
      featured: false
    }
  ];

  const testimonials = [
    {
      name: "Marcus J.",
      role: "Sports Analyst",
      initials: "MJ",
      color: "#4A90E2",
      quote: "PlayOracle™ changed the way I watch sports — it's like seeing the future. The DCI scoring system is incredibly accurate."
    },
    {
      name: "Sarah K.",
      role: "Fantasy League Champion",
      initials: "SK",
      color: "#00E676",
      quote: "I've won my bracket pool three years in a row using PlayOracle's March Madness predictions. The AI insights are unmatched."
    },
    {
      name: "David L.",
      role: "Sports Enthusiast",
      initials: "DL",
      color: "#FF6B35",
      quote: "Finally, an analytics platform that's educational and not about gambling. PlayOracle helps me understand the game at a deeper level."
    }
  ];

  const isEventExpired = (expiryDate: Date) => {
    return new Date() > expiryDate;
  };

  return (
    <div className="landing-lite">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background" />
        <div className="hero-content">
          <h1 className="hero-headline">
            The Game <span className="hero-headline-emerald">Thinks</span>.
            <br />
            You React <span className="hero-headline-emerald">First</span>.
          </h1>
          <p className="hero-subheadline">
            AI-powered sports intelligence that lets you see the play before it happens.
          </p>
          <div className="hero-cta-group">
            <button
              onClick={() => navigate('/signup')}
              className="cta-primary"
            >
              Start Free Today
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="cta-secondary"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="features-title">
            Intelligence That <span style={{ color: 'var(--emerald)' }}>Moves Faster</span> Than The Game
          </h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Events Carousel */}
      <section className="events-section">
        <div className="events-container">
          <h2 className="events-title">
            Unlock <span style={{ color: 'var(--emerald)' }}>Championship</span> Moments
          </h2>
          <div className="events-carousel">
            {premiumEvents.map((event) => {
              const expired = isEventExpired(event.expiryDate);
              return (
                <div
                  key={event.slug}
                  className={`event-card ${expired ? 'expired' : ''}`}
                >
                  <div
                    className="event-image"
                    style={{ background: event.gradient }}
                  >
                    {event.emoji}
                  </div>
                  <h3 className="event-title">{event.title}</h3>
                  <div className="event-dates">
                    <Calendar className="w-4 h-4" />
                    {event.dates}
                  </div>
                  <div className="event-price">{event.price}</div>
                  <button
                    onClick={() => navigate('/login')}
                    className="event-cta"
                    disabled={expired}
                  >
                    {expired ? 'Expired' : 'Unlock Now'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="pricing-section">
        <div className="pricing-container">
          <h2 className="pricing-title">
            Choose Your <span style={{ color: 'var(--emerald)' }}>Intelligence Level</span>
          </h2>
          <p className="pricing-subtitle">
            Start free, upgrade when you're ready to dominate
          </p>
          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`pricing-card ${plan.featured ? 'featured' : ''}`}
              >
                <h3 className="pricing-tier">{plan.tier}</h3>
                <div className="pricing-price">{plan.price}</div>
                <div className="pricing-period">{plan.period}</div>
                <ul className="pricing-features">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="pricing-feature">
                      <Check className="w-5 h-5 pricing-feature-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/signup')}
                  className={`pricing-cta ${plan.featured ? 'primary' : 'secondary'}`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <h2 className="testimonials-title">
            Trusted By <span style={{ color: 'var(--emerald)' }}>Thousands</span> Of Sports Minds
          </h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div
                  className="testimonial-avatar"
                  style={{ background: testimonial.color }}
                >
                  {testimonial.initials}
                </div>
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <div className="testimonial-author">{testimonial.name}</div>
                <div className="testimonial-role">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="final-cta-section">
        <div className="final-cta-container">
          <h2 className="final-cta-headline">
            Ready to Play <span style={{ color: 'var(--emerald)' }}>Smarter</span>?
          </h2>
          <p className="final-cta-subheadline">
            Join tens of thousands of fans using AI to predict the game.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="cta-primary"
          >
            Start Free Today
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="final-cta-disclaimer">
            No credit card required. Free forever plan available.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div>
              <div className="footer-brand">
                <Trophy className="w-6 h-6" style={{ color: 'var(--emerald)' }} />
                <span>Play<span className="footer-brand-emerald">Oracle</span></span>
              </div>
              <p className="footer-description">
                AI-powered sports analytics and learning platform. Master the game with intelligence.
              </p>
            </div>
            <div>
              <h4 className="footer-section-title">Product</h4>
              <ul className="footer-links">
                <li><a href="#features" className="footer-link">Features</a></li>
                <li><a href="#pricing" className="footer-link">Pricing</a></li>
                <li><a href="#events" className="footer-link">Premium Events</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-section-title">Legal</h4>
              <ul className="footer-links">
                <li><a href="/terms-of-use" className="footer-link">Terms of Use</a></li>
                <li><a href="/privacy-policy" className="footer-link">Privacy Policy</a></li>
                <li><a href="mailto:support@playoracle.com" className="footer-link">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-disclaimer">
              PlayOracle™ does not provide or promote gambling. For entertainment and analytics only.
              All predictions are educational insights based on public data and statistical analysis.
            </p>
            <p className="footer-copyright">
              © 2025 PlayOracle™ Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
