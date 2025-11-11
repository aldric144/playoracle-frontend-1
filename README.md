# PlayOracle™ Frontend

AI-powered sports analytics and learning platform - Frontend application.

## Overview

PlayOracle™ is a subscription-based sports intelligence platform that provides AI-powered predictions, DCI (Decision Confidence Index) scoring, and comprehensive analytics across 18+ sports.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **State Management**: React Context + Hooks
- **API Client**: Fetch API with Bearer token authentication

## Features

- 🎯 AI-powered game predictions with DCI scoring
- 📊 Real-time sports data integration (SportsDataIO)
- 🏆 18+ sport dashboards (NFL, NBA, MLB, NHL, Soccer, Boxing, MMA, Tennis, Volleyball, Rugby, Cricket, Golf, Table Tennis, NASCAR, MotoGP, Cycling, Formula 1, College Football)
- 🎮 Interactive FlipCard components with 3D animations
- 📱 Mobile-optimized with GPU acceleration and touch zones
- 🌙 Dark theme with emerald accent colors
- 🔐 JWT-based authentication
- 📈 Historical season archives with AI commentary
- 🎪 Premium event subscriptions
- 🏅 Predictive accuracy leaderboard

## Environment Setup

Create a `.env.production` file with:

```env
VITE_API_URL=https://playoracle-api.onrender.com
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The frontend is deployed to Vercel/DevinApps and connects to the backend at:
- **Backend**: https://playoracle-api.onrender.com
- **Frontend**: https://sports-iq-app-qy6on1ii.devinapps.com

## Related Repositories

- **Backend**: [aldric144/playoracle-backend](https://github.com/aldric144/playoracle-backend)

## Phase 12.1: Mobile & UI Optimization

Recent optimizations include:
- GPU acceleration with `will-change: transform`
- Touch-optimized buttons (44px minimum)
- Momentum scrolling for mobile
- Responsive layouts across all dashboards
- Performance: <2s FCP, 60fps animations, <0.1 CLS

## License

© 2025 PlayOracle™ Technologies. All rights reserved.
