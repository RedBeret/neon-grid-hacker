
import React, { useEffect, useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import GameGrid from '../components/Game/GameGrid';
import GameHUD from '../components/Game/GameHUD';
import GameControls from '../components/Game/GameControls';
import TutorialOverlay from '../components/Game/TutorialOverlay';
import { useGame, Difficulty } from '../context/GameContext';
import { useAudio } from '../context/AudioContext';
import { Button } from '@/components/ui/button';

const Play = () => {
  const { state, dispatch } = useGame();
  const { playSfx } = useAudio();
  const [showControls, setShowControls] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  // Start a new game when difficulty is selected
  const handleStartGame = (difficulty: Difficulty) => {
    dispatch({ type: 'START_GAME', difficulty });
    playSfx('click');
    setShowTutorial(true);
  };
  
  // Handle node interaction
  const handleNodeClick = (x: number, y: number) => {
    if (state.status !== 'playing') return;
    
    // Move player to the node
    dispatch({ type: 'MOVE_PLAYER', x, y });
    
    // If the player is already at this node, solve it
    if (state.player.x === x && state.player.y === y) {
      dispatch({ type: 'SOLVE_NODE', x, y });
      playSfx('solve');
    }
  };
  
  // Pause game with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && state.status === 'playing') {
        dispatch({ type: 'PAUSE_GAME' });
        playSfx('click');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.status, dispatch]);
  
  // Render different screens based on game status
  const renderGameContent = () => {
    switch (state.status) {
      case 'idle':
        return renderDifficultySelect();
      case 'playing':
        return renderGameplay();
      case 'paused':
        return renderPauseMenu();
      case 'gameOver':
        return renderGameOver();
      default:
        return renderDifficultySelect();
    }
  };
  
  // Difficulty selection screen
  const renderDifficultySelect = () => {
    const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'expert', 'master'];
    
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl mb-8 text-cyber-cyan text-glow-cyan">SELECT DIFFICULTY</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md mb-8">
          {difficulties.map((diff, index) => (
            <Button
              key={diff}
              onClick={() => handleStartGame(diff)}
              className={`
                py-6
                ${index === 0 ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                ${index === 1 ? 'bg-blue-600 hover:bg-blue-700' : ''}
                ${index === 2 ? 'bg-amber-600 hover:bg-amber-700' : ''}
                ${index === 3 ? 'bg-orange-600 hover:bg-orange-700' : ''}
                ${index === 4 ? 'bg-red-600 hover:bg-red-700' : ''}
                text-white uppercase
              `}
            >
              {diff}
            </Button>
          ))}
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => setShowControls(!showControls)}
          className="border-cyber-cyan text-cyber-cyan"
        >
          {showControls ? 'Hide' : 'Show'} Controls
        </Button>
        
        {showControls && <GameControls />}
      </div>
    );
  };
  
  // Main gameplay
  const renderGameplay = () => {
    return (
      <>
        <GameHUD />
        <GameGrid onNodeClick={handleNodeClick} />
        {showTutorial && (
          <TutorialOverlay onClose={() => setShowTutorial(false)} />
        )}
      </>
    );
  };
  
  // Pause menu
  const renderPauseMenu = () => {
    return (
      <div className="cyber-glass p-8 border border-cyber-cyan/50 max-w-md mx-auto">
        <h2 className="text-3xl mb-6 text-cyber-cyan text-glow-cyan">PAUSED</h2>
        
        <div className="space-y-4">
          <Button 
            onClick={() => {
              dispatch({ type: 'RESUME_GAME' });
              playSfx('click');
            }}
            className="w-full bg-cyber-cyan hover:bg-cyber-cyan/80 text-black"
          >
            Resume Game
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowTutorial(true)}
            className="w-full border-cyber-yellow text-cyber-yellow"
          >
            Show Tutorial
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => {
              dispatch({ type: 'END_GAME' });
              playSfx('click');
            }}
            className="w-full border-cyber-magenta text-cyber-magenta"
          >
            Quit Game
          </Button>
        </div>
      </div>
    );
  };
  
  // Game over screen
  const renderGameOver = () => {
    const efficiency = Math.min(100, Math.round((state.score / 1500) * 100)); // 15 nodes would be a perfect game
    
    return (
      <div className="cyber-glass p-8 border border-cyber-cyan/50 max-w-md mx-auto">
        <h2 className="text-3xl mb-2 text-cyber-cyan text-glow-cyan">SYSTEM BREACH TERMINATED</h2>
        <p className="mb-6 text-cyber-yellow">Connection lost</p>
        
        <div className="space-y-2 mb-6">
          <div className="flex justify-between">
            <span>Difficulty:</span>
            <span className="text-cyber-cyan">{state.difficulty.toUpperCase()}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Final Score:</span>
            <span className="text-cyber-magenta">{Math.floor(state.score)}</span>
          </div>
          
          <div className="flex justify-between">
            <span>High Score:</span>
            <span className="text-cyber-yellow">{Math.floor(state.highScore)}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Efficiency:</span>
            <span className="text-cyber-cyan">{efficiency}%</span>
          </div>
        </div>
        
        {efficiency >= 75 && state.difficulty !== 'master' && (
          <div className="mb-6 p-3 border border-cyber-yellow/50 bg-cyber-yellow/10">
            <p className="text-cyber-yellow">
              New difficulty tier unlocked!
            </p>
          </div>
        )}
        
        <div className="space-y-4">
          <Button 
            onClick={() => {
              dispatch({ type: 'START_GAME', difficulty: state.difficulty });
              playSfx('click');
            }}
            className="w-full bg-cyber-cyan hover:bg-cyber-cyan/80 text-black"
          >
            Play Again
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => {
              dispatch({ type: 'END_GAME' });
              playSfx('click');
            }}
            className="w-full border-cyber-magenta text-cyber-magenta"
          >
            Back to Menu
          </Button>
        </div>
      </div>
    );
  };
  
  return (
    <MainLayout hideNavigation={state.status === 'playing'}>
      {renderGameContent()}
    </MainLayout>
  );
};

export default Play;

