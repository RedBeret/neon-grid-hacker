import React from 'react';
import MainLayout from '../components/Layout/MainLayout';

const Credits = () => {
  const creditEntries = [
    {
      category: 'Development',
      items: [
        { name: 'YOU', role: 'Game Designer & Creative Director' }
      ]
    },
    {
      category: 'Technologies',
      items: [
        { name: 'React', role: 'UI Framework' },
        { name: 'Tailwind CSS', role: 'Styling' },
        { name: 'Three.js / React Three Fiber', role: '3D Rendering Engine' }
      ]
    },
    {
      category: 'Special Thanks',
      items: [
        { name: 'Cyberpunk 2077', role: 'Visual Inspiration' },
        { name: 'Tron', role: 'Aesthetic Inspiration' },
        { name: 'Open Source Community', role: 'Tools & Libraries' }
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto mb-10">
        <h1 className="text-4xl font-bold mb-2 text-cyber-cyan text-glow-cyan text-center">CREDITS</h1>
        <h2 className="text-xl mb-10 text-cyber-magenta text-center">The team behind CodeBreaker</h2>
        
        <div className="space-y-12">
          {creditEntries.map((category, index) => (
            <div key={index} className="cyber-glass border border-cyber-cyan/30 p-6 rounded-md">
              <h2 className="text-xl mb-4 text-cyber-yellow text-glow-yellow border-b border-cyber-yellow/30 pb-2">
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between">
                    <span className="text-white font-bold">{item.name}</span>
                    <span className="text-cyber-cyan">{item.role}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-cyber-magenta mb-4">
            CodeBreaker: Hack the Grid
          </p>
          <p className="text-sm text-cyber-cyan/50">
            A cyberpunk puzzle-action web game created in 2023
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Credits;
