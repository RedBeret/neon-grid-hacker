
import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';

const GameControls: React.FC = () => {
  const { state, dispatch } = useGame();
  const { playSfx } = useAudio();
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (state.status !== 'playing') return;
    
    const { x, y } = state.player;
    let newX = x;
    let newY = y;
    
    // Movement with WASD or arrow keys
    switch (e.key.toLowerCase()) {
      case 'w':
      case 'arrowup':
        newY = Math.max(0, y - 1);
        break;
      case 'a':
      case 'arrowleft':
        newX = Math.max(0, x - 1);
        break;
      case 's':
      case 'arrowdown':
        newY = Math.min(state.grid.length - 1, y + 1);
        break;
      case 'd':
      case 'arrowright':
        newX = Math.min(state.grid[0]?.length - 1 || 0, x + 1);
        break;
      case ' ':
        // Space to interact with the current node
        if (
          state.grid[y]?.[x] &&
          !state.grid[y][x].solved
        ) {
          dispatch({ type: 'SOLVE_NODE', x, y });
          playSfx('solve');
        }
        break;
      case 'shift':
        // Shift to dash
        if (state.player.canDash) {
          dispatch({ type: 'DASH' });
          playSfx('dash');
          // Dash moves the player 2 cells in the current direction
          // For simplicity, we'll just move 2 cells in a random valid direction
          const directions = [
            { x: 0, y: -1 }, // Up
            { x: -1, y: 0 }, // Left
            { x: 0, y: 1 },  // Down
            { x: 1, y: 0 },  // Right
          ];
          
          // Filter valid moves
          const validMoves = directions.filter(dir => {
            const nextX = x + dir.x;
            const nextY = y + dir.y;
            return (
              nextX >= 0 &&
              nextX < state.grid[0]?.length &&
              nextY >= 0 &&
              nextY < state.grid.length
            );
          });
          
          if (validMoves.length > 0) {
            const randomDir = validMoves[Math.floor(Math.random() * validMoves.length)];
            dispatch({ 
              type: 'MOVE_PLAYER', 
              x: Math.min(Math.max(0, x + randomDir.x * 2), state.grid[0]?.length - 1 || 0), 
              y: Math.min(Math.max(0, y + randomDir.y * 2), state.grid.length - 1 || 0)
            });
          }
        }
        break;
      default:
        break;
    }
    
    // Update player position if it has changed
    if (newX !== x || newY !== y) {
      dispatch({ type: 'MOVE_PLAYER', x: newX, y: newY });
      playSfx('click');
    }
  };
  
  // Set up keyboard controls
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.status, state.player.x, state.player.y, state.player.canDash, state.grid]);
  
  return (
    <div className="mt-4 cyber-glass p-4 rounded-md border border-cyber-cyan/50">
      <h2 className="text-cyber-cyan mb-3 text-glow-cyan">Controls</h2>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-white mb-1">Movement:</p>
          <p className="text-cyber-cyan/70">WASD / Arrow Keys</p>
        </div>
        
        <div>
          <p className="text-white mb-1">Interact:</p>
          <p className="text-cyber-cyan/70">Space</p>
        </div>
        
        <div>
          <p className="text-white mb-1">Dash:</p>
          <p className="text-cyber-cyan/70">Shift</p>
        </div>
        
        <div>
          <p className="text-white mb-1">Pause:</p>
          <p className="text-cyber-cyan/70">Esc</p>
        </div>
      </div>
    </div>
  );
};

export default GameControls;
