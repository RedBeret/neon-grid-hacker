
import React, { useMemo } from 'react';
import { useGame, Node } from '../../context/GameContext';
import { useAudio } from '../../context/AudioContext';

interface GridProps {
  onNodeClick: (x: number, y: number) => void;
}

const GameGrid: React.FC<GridProps> = ({ onNodeClick }) => {
  const { state } = useGame();
  const { playSfx } = useAudio();
  
  const grid = state.grid;
  
  // Calculate isometric positions
  const getIsometricPosition = (x: number, y: number) => {
    // Isometric transformation
    const isoX = (x - y) * 30; // Tile width/2
    const isoY = (x + y) * 15; // Tile height/2
    
    return { x: isoX + 200, y: isoY + 50 }; // Center in the container
  };
  
  const handleNodeClick = (x: number, y: number) => {
    playSfx('click');
    onNodeClick(x, y);
  };
  
  const renderNode = (node: Node) => {
    const { x, y } = getIsometricPosition(node.x, node.y);
    
    // Determine node style based on type and color
    let baseColor = '';
    switch (node.color) {
      case 'cyan':
        baseColor = 'bg-cyber-cyan/20 border-cyber-cyan hover:bg-cyber-cyan/30';
        break;
      case 'magenta':
        baseColor = 'bg-cyber-magenta/20 border-cyber-magenta hover:bg-cyber-magenta/30';
        break;
      case 'yellow':
        baseColor = 'bg-cyber-yellow/20 border-cyber-yellow hover:bg-cyber-yellow/30';
        break;
      default:
        baseColor = 'bg-cyber-cyan/20 border-cyber-cyan hover:bg-cyber-cyan/30';
    }
    
    // Adjust appearance based on solved state
    const solvedStyle = node.solved
      ? 'opacity-50'
      : 'border-glow-' + node.color;

    // Highlight the node the player is currently on
    const isActive =
      state.player.x === node.x && state.player.y === node.y;
    const activeStyle = isActive
      ? 'animate-pulse-glow ring-2 ring-cyber-cyan/70'
      : '';
    
    return (
      <button
        key={node.id}
        className={`absolute w-12 h-6 ${baseColor} ${solvedStyle} ${activeStyle} transform rotate-45 cursor-cyber transition-all duration-300 hover:scale-105`}
        style={{ 
          left: `${x}px`, 
          top: `${y}px`,
        }}
        disabled={node.solved || state.status !== 'playing'}
        onClick={() => handleNodeClick(node.x, node.y)}
      >
        {/* Node content based on type */}
        <div className="absolute inset-0 flex items-center justify-center -rotate-45 text-xs">
          {node.type === 'loop' && <span className="animate-spin">⟳</span>}
          {node.type === 'conditional' && <span className="text-glow-cyan">{node.solved ? 'T' : 'F'}</span>}
          {node.type === 'recursion' && <span className="animate-pulse">⦿</span>}
        </div>
      </button>
    );
  };
  
  // Render player
  const renderPlayer = () => {
    if (!state.player || state.grid.length === 0) return null;
    
    const { x, y } = getIsometricPosition(state.player.x, state.player.y);
    
    return (
      <div
        className="absolute w-6 h-6 bg-white rounded-full animate-pulse-glow z-20"
        style={{ 
          left: `${x + 3}px`, 
          top: `${y - 6}px`,
          boxShadow: '0 0 10px #00eaff, 0 0 15px #00eaff',
        }}
      />
    );
  };
  
  // Memoize grid rendering for performance
  const gridNodes = useMemo(() => {
    if (!grid || grid.length === 0) return null;

    return grid.flatMap((row) =>
      row.map((node) => renderNode(node))
    );
  }, [grid, state.status, state.player]);
  
  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      {/* Grid container */}
      {gridNodes}
      {renderPlayer()}
    </div>
  );
};

export default GameGrid;
