
import React from 'react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGame } from '../../context/GameContext';

interface TutorialOverlayProps {
  onClose: () => void;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ onClose }) => {
  const { state } = useGame();
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="cyber-glass p-6 border border-cyber-cyan/50 max-w-2xl w-full">
        <h2 className="text-3xl mb-6 text-cyber-cyan text-glow-cyan">SYSTEM TUTORIAL</h2>
        
        <div className="space-y-6 mb-8">
          {/* Node Types */}
          <div>
            <h3 className="text-xl text-cyber-yellow mb-2">NODE TYPES</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Loop Nodes */}
              <div className="cyber-glass p-3 border border-cyber-cyan/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 flex items-center justify-center bg-cyber-cyan/20 border border-cyber-cyan">
                    <span className="animate-spin">⟳</span>
                  </div>
                  <h4 className="text-cyber-cyan">LOOPS</h4>
                </div>
                <p className="text-sm">Navigate to node and press <span className="text-cyber-yellow">SPACE</span> to hack. Time your hacking when the loop completes its cycle.</p>
              </div>
              
              {/* Conditional Nodes */}
              <div className="cyber-glass p-3 border border-cyber-magenta/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 flex items-center justify-center bg-cyber-magenta/20 border border-cyber-magenta">
                    <span className="text-cyber-magenta">F</span>
                  </div>
                  <h4 className="text-cyber-magenta">CONDITIONALS</h4>
                </div>
                <p className="text-sm">Navigate to node and press <span className="text-cyber-yellow">SPACE</span> to toggle the condition from F to T (true) to complete the hack.</p>
              </div>
              
              {/* Recursion Nodes */}
              <div className="cyber-glass p-3 border border-cyber-yellow/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 flex items-center justify-center bg-cyber-yellow/20 border border-cyber-yellow">
                    <span className="animate-pulse">⦿</span>
                  </div>
                  <h4 className="text-cyber-yellow">RECURSION</h4>
                </div>
                <p className="text-sm">These complex nodes require precise timing. Navigate to node and press <span className="text-cyber-yellow">SPACE</span> during the pulse peak.</p>
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <div>
            <h3 className="text-xl text-cyber-cyan mb-2">CONTROLS</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div className="flex justify-between">
                <span>Movement:</span>
                <span className="text-cyber-cyan">WASD / Arrow Keys</span>
              </div>
              <div className="flex justify-between">
                <span>Hack Node:</span>
                <span className="text-cyber-cyan">SPACE</span>
              </div>
              <div className="flex justify-between">
                <span>Dash:</span>
                <span className="text-cyber-cyan">SHIFT</span>
              </div>
              <div className="flex justify-between">
                <span>Pause:</span>
                <span className="text-cyber-cyan">ESC</span>
              </div>
            </div>
          </div>
          
          {/* Scoring */}
          <Collapsible>
            <CollapsibleTrigger className="text-xl text-cyber-magenta flex items-center gap-2 w-full justify-between">
              SCORING SYSTEM
              <span className="text-sm">(Click to expand)</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <ul className="space-y-1 text-sm list-disc list-inside">
                <li>+100 points for each hacked node</li>
                <li>Combo multiplier increases by 0.1x for consecutive hacks</li>
                <li>-10 points per second of inactivity</li>
                <li>Unlock higher difficulties with 75%+ efficiency</li>
              </ul>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Gameplay Tips */}
          <div className="p-3 border border-cyber-yellow/30 bg-cyber-yellow/10">
            <h4 className="text-cyber-yellow mb-1">HACKER TIPS</h4>
            <p className="text-sm">Stay moving to avoid idle penalties. Use dash ability to quickly move across the grid. Prioritize nodes that match your hacking style.</p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={onClose} 
                  className="bg-cyber-cyan hover:bg-cyber-cyan/80 text-black px-8"
                >
                  START HACKING
                </Button>
              </TooltipTrigger>
              <TooltipContent className="border-cyber-cyan bg-black/80 text-cyber-cyan">
                Press to close tutorial and begin
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-cyber-cyan/50">
            Tutorial can be reviewed at any time from the pause menu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;
