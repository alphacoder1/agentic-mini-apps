import React from 'react';
import { Zap } from 'lucide-react';

interface VoteButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const VoteButton: React.FC<VoteButtonProps> = ({ 
  onClick, 
  disabled = false, 
  loading = false, 
  className = '' 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative w-full py-3 px-6 
        bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600
        hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700
        text-white font-bold text-lg
        rounded-xl shadow-lg
        transition-all duration-300 ease-in-out
        transform hover:scale-105 hover:shadow-xl
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        focus:outline-none focus:ring-4 focus:ring-orange-300
        border-2 border-orange-400 hover:border-orange-500
        ${loading ? 'animate-pulse' : ''}
        ${className}
      `}
      style={{
        background: disabled || loading 
          ? '#9CA3AF' 
          : undefined,
        boxShadow: disabled || loading 
          ? 'none' 
          : '0 0 20px rgba(249, 147, 26, 0.3), 0 4px 15px rgba(0, 0, 0, 0.2)'
      }}
    >
      {/* Lightning glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 hover:opacity-20 transition-opacity duration-300" />
      
      {/* Button content */}
      <div className="relative flex items-center justify-center gap-2">
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Zapping...</span>
          </>
        ) : (
          <>
            <span>Vote with</span>
            <Zap className="w-6 h-6 text-yellow-200 drop-shadow-sm" />
          </>
        )}
      </div>
      
      {/* Subtle inner shadow for depth */}
      <div className="absolute inset-0 rounded-xl shadow-inner opacity-30 pointer-events-none" />
    </button>
  );
};

export default VoteButton;