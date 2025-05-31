
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-cyber-bg cyber-grid flex items-center justify-center relative overflow-hidden">
      {/* Background overlay effects */}
      <div className="absolute top-0 left-0 w-full h-screen pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyber-magenta/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cyber-cyan/20 to-transparent"></div>
      </div>
      
      <div className="cyber-glass border border-cyber-cyan/50 p-10 max-w-md text-center relative z-10 animate-glitch">
        <h1 className="text-9xl font-bold mb-4 text-cyber-cyan text-glow-cyan animate-pulse-glow">404</h1>
        <h2 className="text-2xl mb-6 text-cyber-magenta text-glow-magenta">SYSTEM ERROR</h2>
        <p className="mb-8 text-cyber-yellow">
          Connection lost. The node you're looking for has been disconnected or doesn't exist.
        </p>
        
        <Link to="/">
          <Button className="bg-cyber-cyan hover:bg-cyber-cyan/80 text-black border-glow-cyan">
            RETURN TO MAIN GRID
          </Button>
        </Link>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 border border-cyber-magenta animate-pulse opacity-20"></div>
      <div className="absolute top-20 right-20 w-32 h-32 border border-cyber-cyan animate-float opacity-20 rotate-45"></div>
    </div>
  );
};

export default NotFound;
