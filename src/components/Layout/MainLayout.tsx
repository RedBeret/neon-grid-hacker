
import React from 'react';
import { Link } from 'react-router-dom';
import { useAudio } from '../../context/AudioContext';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
  hideNavigation?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, hideNavigation = false }) => {
  const { isMuted, toggleMute, playSfx } = useAudio();

  const handleMuteToggle = () => {
    toggleMute();
    playSfx('click');
  };

  return (
    <div className="min-h-screen bg-cyber-bg cyber-grid relative overflow-hidden">
      {/* Background effect elements */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none">
        {/* Top glow */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-500/20 to-transparent"></div>
        
        {/* Side glows */}
        <div className="absolute top-1/4 left-0 w-32 h-1/2 bg-gradient-to-r from-magenta-500/20 to-transparent"></div>
        <div className="absolute top-1/4 right-0 w-32 h-1/2 bg-gradient-to-l from-cyan-500/20 to-transparent"></div>
        
        {/* Bottom glow */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-yellow-500/10 to-transparent"></div>
      </div>
      
      {/* Container for content */}
      <div className="container mx-auto py-6 z-10 relative min-h-screen flex flex-col">
        {/* Header with logo */}
        <header className="flex justify-between items-center mb-6">
          <Link to="/" onClick={() => playSfx('click')}>
            <h1 className="text-4xl font-bold text-cyber-cyan text-glow-cyan">
              CODE<span className="text-cyber-magenta text-glow-magenta">BREAKER</span>
            </h1>
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMuteToggle}
            className="text-cyber-cyan hover:text-cyber-yellow hover:bg-cyber-bg/50"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </Button>
        </header>
        
        {/* Main content */}
        <main className="flex-1 z-10 relative">
          {children}
        </main>
        
        {/* Navigation */}
        {!hideNavigation && (
          <nav className="mt-8 border-t border-cyber-cyan/30 pt-4">
            <ul className="flex justify-center gap-6 flex-wrap">
              <li>
                <Link 
                  to="/" 
                  className="text-cyber-cyan hover:text-cyber-yellow transition-colors text-glow-cyan"
                  onClick={() => playSfx('click')}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/play" 
                  className="text-cyber-cyan hover:text-cyber-yellow transition-colors text-glow-cyan"
                  onClick={() => playSfx('click')}
                >
                  Play
                </Link>
              </li>
              <li>
                <Link 
                  to="/leaderboard" 
                  className="text-cyber-cyan hover:text-cyber-yellow transition-colors text-glow-cyan"
                  onClick={() => playSfx('click')}
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/settings" 
                  className="text-cyber-cyan hover:text-cyber-yellow transition-colors text-glow-cyan"
                  onClick={() => playSfx('click')}
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link 
                  to="/credits" 
                  className="text-cyber-cyan hover:text-cyber-yellow transition-colors text-glow-cyan"
                  onClick={() => playSfx('click')}
                >
                  Credits
                </Link>
              </li>
            </ul>
          </nav>
        )}
        
        {/* Footer */}
        <footer className="text-center text-cyber-cyan/40 mt-4 text-sm">
          &copy; {new Date().getFullYear()} CodeBreaker: Hack the Grid
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
