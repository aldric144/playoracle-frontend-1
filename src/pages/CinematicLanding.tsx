import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { TrendingUp, Zap, Target, Award, ChevronRight, Check, Volume2, VolumeX, Info, Clock } from 'lucide-react';
import { VoiceoverSync, NarrationSegment } from '../components/experience/VoiceoverSync';
import { AnnotationOverlay } from '../components/experience/AnnotationOverlay';
import { VisualTimeline } from '../components/experience/VisualTimeline';
import { useDeviceDetection } from '../hooks/useDeviceDetection';

export function CinematicLanding() {
  const navigate = useNavigate();
  const deviceInfo = useDeviceDetection();
  const [isMuted, setIsMuted] = useState(true);
  const [selectedTooltip, setSelectedTooltip] = useState<number | null>(null);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentNarrationSegment, setCurrentNarrationSegment] = useState<NarrationSegment | null>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const intersectionThreshold = deviceInfo.isMobile ? 0.35 : 0.25;

  const triggerHaptic = () => {
    if (deviceInfo.isTouchDevice && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const handleCTAClick = (path: string) => {
    triggerHaptic();
    navigate(path);
  };

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "AI-Powered Predictions",
      description: "Advanced machine learning algorithms analyze thousands of data points to deliver accurate game forecasts.",
      tooltip: "Our neural network processes historical data, player stats, weather conditions, and 50+ other variables to generate predictions with 75%+ accuracy."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "DCI Scoring System",
      description: "Our proprietary Data Confidence Index shows you exactly how reliable each prediction is.",
      tooltip: "DCI scores range from 0-100, measuring prediction confidence based on data quality, historical accuracy, and model consensus."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-Time Analytics",
      description: "Live updates and insights as games unfold, helping you understand the action as it happens.",
      tooltip: "Get live probability updates every 30 seconds during games, with instant notifications for momentum shifts and key plays."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Premium Events",
      description: "Exclusive access to March Madness, Super Bowl, World Series, and championship analytics.",
      tooltip: "Premium events include bracket predictions, upset alerts, player matchup analysis, and exclusive AI insights not available in the free tier."
    }
  ];

  const premiumEvents = [
    {
      name: "March Madness 2025",
      description: "Bracket predictions & upset alerts",
      price: "$9.99",
      expiryDate: new Date('2025-05-07'),
      gradient: "from-orange-500 to-red-600"
    },
    {
      name: "Super Bowl 2026",
      description: "Player matchup analysis",
      price: "$9.99",
      expiryDate: new Date('2026-03-10'),
      gradient: "from-blue-500 to-purple-600"
    },
    {
      name: "World Series 2025",
      description: "Pitcher-batter predictions",
      price: "$9.99",
      expiryDate: new Date('2025-12-30'),
      gradient: "from-green-500 to-teal-600"
    },
    {
      name: "NBA Finals 2025",
      description: "Championship analytics",
      price: "$9.99",
      expiryDate: new Date('2025-07-25'),
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      name: "Racing Championship 2025",
      description: "Track condition insights",
      price: "$9.99",
      expiryDate: new Date('2026-01-30'),
      gradient: "from-red-500 to-pink-600"
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

  const calculateCountdown = (expiryDate: Date) => {
    const now = new Date();
    const diff = expiryDate.getTime() - now.getTime();
    
    if (diff <= 0) return "Expired";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h remaining`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % premiumEvents.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="min-h-screen bg-black text-white overflow-x-hidden"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)'
      }}
    >
      {/* Visual Timeline Background */}
      <VisualTimeline currentSegment={currentNarrationSegment} />

      {/* Annotation Overlay */}
      <AnnotationOverlay currentSegment={currentNarrationSegment} />

      {/* Voiceover Sync Component */}
      <VoiceoverSync
        isMuted={isMuted}
        onSegmentChange={(segment) => setCurrentNarrationSegment(segment)}
      />

      {/* Voice-over mute toggle */}
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: deviceInfo.prefersReducedMotion ? 0 : 0.5 }}
        onClick={() => {
          triggerHaptic();
          setIsMuted(!isMuted);
        }}
        className="fixed top-4 right-4 z-50 bg-gray-900 border border-green-400 rounded-full p-3 hover:bg-gray-800 transition-colors"
        style={{
          top: 'calc(1rem + env(safe-area-inset-top))',
          right: 'calc(1rem + env(safe-area-inset-right))'
        }}
        title={isMuted ? "Unmute narration" : "Mute narration"}
      >
        {isMuted ? <VolumeX className="w-5 h-5 text-green-400" /> : <Volume2 className="w-5 h-5 text-green-400" />}
      </motion.button>

      {/* Narration Status Indicator (for debugging) */}
      {process.env.NODE_ENV === 'development' && currentNarrationSegment && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 right-4 z-50 bg-gray-900 border border-purple-400 rounded-lg p-3 text-xs max-w-xs"
        >
          <div className="text-purple-400 font-bold mb-1">Narration Active</div>
          <div className="text-gray-300">{currentNarrationSegment.text}</div>
          <div className="text-gray-500 mt-1">Visual: {currentNarrationSegment.visualCue}</div>
        </motion.div>
      )}

      {/* Hero Section with Neural Court Background */}
      <motion.div 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden z-10 scene-wrapper"
      >
        {/* Animated Neural Network Background - reduced opacity when narration is active */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${currentNarrationSegment ? 'opacity-10' : 'opacity-30'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-transparent to-transparent animate-pulse" />
          <div
            className="absolute inset-0 ambient-drift"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
              backgroundSize: '200% 200%',
              transform: 'translateZ(0)',
            }}
          />
          {/* Grid overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="text-white">Play</span>
              <motion.span 
                className="text-green-400"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(34, 197, 94, 0.5)',
                    '0 0 40px rgba(34, 197, 94, 0.8)',
                    '0 0 20px rgba(34, 197, 94, 0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Oracle
              </motion.span>
              <span className="text-green-400 text-2xl align-super">™</span>
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-4"
          >
            Master Sports Intelligence with AI
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-12"
          >
            The first AI-powered sports mastery education platform. Learn, predict, and grow your sports IQ—not gambling, pure analytics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCTAClick('/signup')}
              className="bg-green-400 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-500 transition-all flex items-center gap-2 shadow-lg shadow-green-400/50"
            >
              Start Free Today
              <ChevronRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCTAClick('/login')}
              className="bg-transparent border-2 border-green-400 text-green-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-400 hover:text-black transition-all"
            >
              Sign In
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 text-gray-500 text-sm"
          >
            No credit card required • Free forever plan available
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-green-400 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ height: ['0%', '100%', '0%'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 bg-green-400 rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Features Section with Framer Motion */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: intersectionThreshold }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: intersectionThreshold }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-center mb-4"
          >
            Why <span className="text-green-400">PlayOracle™</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: intersectionThreshold }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto"
          >
            Cutting-edge AI technology meets sports analytics to create the ultimate learning platform.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: intersectionThreshold }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: 'rgb(34, 197, 94)' }}
                className="relative bg-gray-800 rounded-lg p-8 border border-gray-700 transition-all cursor-pointer"
                style={{ willChange: 'transform' }}
                onClick={() => {
                  triggerHaptic();
                  setSelectedTooltip(selectedTooltip === index ? null : index);
                }}
              >
                <motion.div
                  animate={{
                    rotate: selectedTooltip === index ? 360 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  className="text-green-400 mb-4"
                >
                  {feature.icon}
                </motion.div>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                  <Info className="w-5 h-5 text-green-400 flex-shrink-0 ml-2" />
                </div>
                <p className="text-gray-400 mb-4">{feature.description}</p>
                
                <AnimatePresence>
                  {selectedTooltip === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-green-400/10 border border-green-400 rounded-lg p-4 mt-4"
                    >
                      <p className="text-sm text-green-400">{feature.tooltip}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3D Event Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: intersectionThreshold }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: intersectionThreshold }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-center mb-4"
          >
            Premium <span className="text-green-400">Event Intelligence</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: intersectionThreshold }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto"
          >
            Unlock exclusive AI-powered analytics for the biggest sporting events of the year.
          </motion.p>

          {/* 3D Carousel Container */}
          <div className="relative h-96 flex items-center justify-center perspective-1000">
            {premiumEvents.map((event, index) => {
              const offset = (index - currentEventIndex + premiumEvents.length) % premiumEvents.length;
              const isCurrent = offset === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    x: `${offset * 100}%`,
                    scale: isCurrent ? 1 : 0.8,
                    opacity: isCurrent ? 1 : 0.5,
                    rotateY: offset * 15,
                    z: isCurrent ? 0 : -100,
                  }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className={`absolute w-80 bg-gradient-to-br ${event.gradient} rounded-lg p-8 shadow-2xl cursor-pointer`}
                  style={{
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                  }}
                  onClick={() => {
                    triggerHaptic();
                    setCurrentEventIndex(index);
                  }}
                >
                  <h3 className="text-2xl font-bold mb-2 text-white">{event.name}</h3>
                  <p className="text-white/90 text-sm mb-4">{event.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-white">{event.price}</span>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{calculateCountdown(event.expiryDate)}</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCTAClick('/signup');
                    }}
                    className="w-full bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                  >
                    Unlock Now
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {/* Carousel Navigation Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {premiumEvents.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  triggerHaptic();
                  setCurrentEventIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentEventIndex ? 'bg-green-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Pricing Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: intersectionThreshold }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: intersectionThreshold }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-center mb-4"
          >
            Choose Your <span className="text-green-400">Plan</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: intersectionThreshold }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto"
          >
            Start free and upgrade anytime. No hidden fees, cancel whenever you want.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: intersectionThreshold }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: tier.highlighted ? 1.02 : 1.05 }}
                className={`rounded-lg p-8 ${
                  tier.highlighted
                    ? 'bg-green-400 text-black border-4 border-green-300 transform scale-105'
                    : 'bg-gray-800 border border-gray-700'
                }`}
                style={{ willChange: 'transform' }}
              >
                {tier.highlighted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-4"
                  >
                    <span className="bg-black text-green-400 px-4 py-1 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </span>
                  </motion.div>
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
                    <motion.li
                      key={fIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: intersectionThreshold }}
                      transition={{ duration: 0.4, delay: fIndex * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <Check className={`w-5 h-5 flex-shrink-0 ${tier.highlighted ? 'text-black' : 'text-green-400'}`} />
                      <span className={tier.highlighted ? 'text-gray-900' : 'text-gray-300'}>
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCTAClick('/signup')}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    tier.highlighted
                      ? 'bg-black text-green-400 hover:bg-gray-900'
                      : 'bg-green-400 text-black hover:bg-green-500'
                  }`}
                >
                  {tier.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: intersectionThreshold }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-black"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: intersectionThreshold }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-center mb-16"
          >
            What Our <span className="text-green-400">Users Say</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: intersectionThreshold }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: 'rgb(34, 197, 94)' }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 transition-all"
                style={{ willChange: 'transform' }}
              >
                <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Final CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: intersectionThreshold }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: intersectionThreshold }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
            Ready to Master <span className="text-green-400">Sports Intelligence</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: intersectionThreshold }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 mb-8"
          >
            Join thousands of sports enthusiasts learning from AI-powered analytics.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: intersectionThreshold }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCTAClick('/signup')}
            className="bg-green-400 text-black px-12 py-4 rounded-lg font-bold text-xl hover:bg-green-500 transition-all inline-flex items-center gap-2 shadow-lg shadow-green-400/50"
          >
            Start Your Free Account
            <ChevronRight className="w-6 h-6" />
          </motion.button>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: intersectionThreshold }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 text-gray-500"
          >
            No credit card required • Free forever plan available
          </motion.p>
        </div>
      </motion.div>

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
        .perspective-1000 {
          perspective: 1000px;
        }
        
        @media (prefers-reduced-motion: no-preference) {
          * {
            scroll-behavior: smooth;
          }
        }
        
        /* GPU acceleration for smooth animations */
        [style*="willChange"] {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
