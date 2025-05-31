
import React from 'react';
import { useGame } from '../../context/GameContext';

const GameHUD: React.FC = () => {
  const { state } = useGame();
  
  // Format time as MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="fixed top-0 left-0 w-full p-4 z-30 pointer-events-none">
      <div className="container mx-auto flex justify-between">
        {/* Timer */}
        <div className="cyber-glass p-2 rounded border border-cyber-cyan/50 text-glow-cyan">
          <div className="text-cyber-cyan font-bold">
            {formatTime(state.timeRemaining)}
          </div>
        </div>
        
        {/* Score */}
        <div className="cyber-glass p-2 rounded border border-cyber-magenta/50 text-glow-magenta">
          <div className="text-cyber-magenta font-bold">
            Score: {Math.floor(state.score)}
          </div>
        </div>
      </div>
      
      {/* Bottom HUD */}
      <div className="fixed bottom-4 left-0 w-full flex justify-center">
        <div className="cyber-glass p-2 rounded border border-cyber-yellow/50 text-glow-yellow flex gap-4">
          {/* Integrity bar */}
          <div className="flex items-center gap-2">
            <span className="text-cyber-yellow text-sm">Integrity:</span>
            <div className="w-32 h-3 bg-cyber-bg/70 border border-cyber-yellow/50">
              <div 
                className="h-full bg-cyber-yellow/70"
                style={{ width: `${state.player.integrity}%` }}
              />
            </div>
          </div>
          
          {/* Dash cooldown */}
          <div className="flex items-center gap-2">
            <span className="text-cyber-cyan text-sm">Dash:</span>
            <div className="w-20 h-3 bg-cyber-bg/70 border border-cyber-cyan/50">
              <div 
                className="h-full bg-cyber-cyan/70"
                style={{ width: state.player.canDash ? '100%' : `${(3 - state.player.dashCooldown) / 3 * 100}%` }}
              />
            </div>
          </div>
          
          {/* Combo multiplier */}
          <div className="text-cyber-magenta text-sm">
            Combo: x{state.combo.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHUD;
