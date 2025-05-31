
import React from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { useAudio } from '../context/AudioContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

const Settings = () => {
  const { isMuted, toggleMute, playSfx } = useAudio();
  
  return (
    <MainLayout>
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-cyber-cyan text-glow-cyan">SETTINGS</h1>
        
        <div className="cyber-glass border border-cyber-cyan/30 p-6 mb-10 rounded-md">
          <h2 className="text-xl mb-6 text-cyber-magenta border-b border-cyber-magenta/30 pb-2">
            Audio Settings
          </h2>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <label htmlFor="mute-toggle" className="text-white">
                Mute All Audio
              </label>
              <Switch
                id="mute-toggle"
                checked={isMuted}
                onCheckedChange={() => {
                  toggleMute();
                  if (!isMuted) playSfx('click');
                }}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-white">Music Volume</label>
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                disabled={isMuted}
                className={isMuted ? "opacity-50" : ""}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-white">SFX Volume</label>
              <Slider
                defaultValue={[75]}
                max={100}
                step={1}
                disabled={isMuted}
                className={isMuted ? "opacity-50" : ""}
              />
            </div>
          </div>
        </div>
        
        <div className="cyber-glass border border-cyber-cyan/30 p-6 mb-10 rounded-md">
          <h2 className="text-xl mb-6 text-cyber-magenta border-b border-cyber-magenta/30 pb-2">
            Display Settings
          </h2>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <label htmlFor="particles-toggle" className="text-white">
                Enable Particles
              </label>
              <Switch id="particles-toggle" defaultChecked />
            </div>
            
            <div className="flex justify-between items-center">
              <label htmlFor="bloom-toggle" className="text-white">
                Bloom Effect
              </label>
              <Switch id="bloom-toggle" defaultChecked />
            </div>
            
            <div className="flex justify-between items-center">
              <label htmlFor="grid-toggle" className="text-white">
                Show Grid
              </label>
              <Switch id="grid-toggle" defaultChecked />
            </div>
          </div>
        </div>
        
        <div className="cyber-glass border border-cyber-cyan/30 p-6 rounded-md mb-10">
          <h2 className="text-xl mb-6 text-cyber-magenta border-b border-cyber-magenta/30 pb-2">
            Game Settings
          </h2>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <label htmlFor="show-tutorial" className="text-white">
                Show Tutorial
              </label>
              <Switch id="show-tutorial" defaultChecked />
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Button 
            variant="outline" 
            className="border-cyber-yellow text-cyber-yellow border-glow-yellow"
            onClick={() => {
              // Reset all settings to default
              playSfx('click');
            }}
          >
            Reset to Defaults
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
