import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useAudio } from '../context/AudioContext';

const Index = () => {
  const { playSfx } = useAudio();

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] relative">
        {/* Glowing title */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-center">
          <span className="text-cyber-cyan text-glow-cyan animate-pulse-glow">CODE</span>
          <span className="text-cyber-magenta text-glow-magenta">BREAKER</span>
        </h1>
        <h2 className="text-2xl md:text-3xl mb-12 text-cyber-yellow text-glow-yellow">
          HACK THE GRID
        </h2>
        
        {/* Game description */}
        <div className="cyber-glass border border-cyber-cyan/30 p-6 mb-10 max-w-md text-center">
          <p className="mb-4">
            Navigate the neon grid, solve coding puzzles, and increase your score before time runs out.
          </p>
          <p className="text-cyber-cyan">
            Can you break through the system's defenses?
          </p>
        </div>
        
        {/* Play button */}
        <Link to="/play">
          <Button 
            className="bg-cyber-cyan hover:bg-cyber-cyan/80 text-black px-10 py-6 text-xl border border-cyber-cyan border-glow-cyan"
            onClick={() => playSfx('click')}
          >
            START HACKING
          </Button>
        </Link>
        
        {/* Decorative elements */}
        <div className="absolute left-0 top-1/4 w-32 h-32 border border-cyber-yellow/30 rotate-45 animate-pulse opacity-20"></div>
        <div className="absolute right-0 bottom-1/4 w-20 h-20 border border-cyber-magenta/30 rotate-12 animate-pulse opacity-20"></div>
        
        {/* Feature highlights */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="cyber-glass p-4 border border-cyber-cyan/30">
            <h3 className="text-cyber-cyan mb-2">90-SECOND RUNS</h3>
            <p className="text-sm">Race against the clock to hack as many nodes as possible before time expires.</p>
          </div>
          
          <div className="cyber-glass p-4 border border-cyber-magenta/30">
            <h3 className="text-cyber-magenta mb-2">CODING PUZZLES</h3>
            <p className="text-sm">Solve puzzles based on programming concepts: loops, conditionals, and recursion.</p>
          </div>
          
          <div className="cyber-glass p-4 border border-cyber-yellow/30">
            <h3 className="text-cyber-yellow mb-2">SKILL PROGRESSION</h3>
            <p className="text-sm">Master each difficulty tier to unlock increasingly challenging levels.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
