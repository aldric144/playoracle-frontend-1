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
            className="absolute bottom-4 right-4 px-4 py-2 bg-emerald-500 text-black rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium shadow-lg shadow-emerald-500/20"
          >
            View History
          </button>
        </div>

        {/* Back Face */}
        <div className="flip-card-back">
          {backContent}
          <button
            onClick={handleFlip}
            className="absolute bottom-4 right-4 px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors text-sm font-medium shadow-lg"
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
        }

        .flip-card {
          position: relative;
          width: 100%;
          min-height: 600px;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .flip-card.flipped {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          min-height: 600px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 0.5rem;
          overflow-y: auto;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default FlipCard;
