import React, { useState } from 'react';

interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({ 
  frontContent, 
  backContent, 
  className = '' 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`flip-card-container ${className}`}>
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        {/* Front Face */}
        <div className="flip-card-front">
          {frontContent}
          <button
            onClick={handleFlip}
            className="absolute bottom-4 right-4 px-4 py-2 bg-emerald-500 text-black rounded-lg hover:bg-emerald-600 active:bg-emerald-700 transition-colors text-sm font-medium shadow-lg shadow-emerald-500/20 touch-manipulation min-h-[44px] min-w-[44px]"
          >
            View History
          </button>
        </div>

        {/* Back Face */}
        <div className="flip-card-back">
          {backContent}
          <button
            onClick={handleFlip}
            className="absolute bottom-4 right-4 px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 active:bg-zinc-500 transition-colors text-sm font-medium shadow-lg touch-manipulation min-h-[44px] min-w-[44px]"
          >
            Back to Live
          </button>
        </div>
      </div>

      <style>{`
        .flip-card-container {
          perspective: 1000px;
          width: 100%;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .flip-card {
          position: relative;
          width: 100%;
          min-height: 600px;
          max-height: 85vh;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          will-change: transform;
        }

        .flip-card.flipped {
          transform: rotateY(180deg);
          animation: fadeScaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes fadeScaleIn {
          0% {
            opacity: 0.8;
            transform: rotateY(180deg) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: rotateY(180deg) scale(1);
          }
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          min-height: 600px;
          max-height: 85vh;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 0.5rem;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          display: flex;
          flex-direction: column;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }

        @media (max-width: 768px) {
          .flip-card-container {
            min-height: 500px;
          }
          
          .flip-card,
          .flip-card-front,
          .flip-card-back {
            min-height: 500px;
            max-height: 85vh;
          }
        }

        @media (max-width: 480px) {
          .flip-card-container {
            min-height: 450px;
          }
          
          .flip-card,
          .flip-card-front,
          .flip-card-back {
            min-height: 450px;
            max-height: 90vh;
          }
        }
      `}</style>
    </div>
  );
};

export default FlipCard;
