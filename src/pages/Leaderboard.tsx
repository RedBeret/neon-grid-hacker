
import React, { useState, useMemo } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { useGame } from '../context/GameContext';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, Medal, Star } from 'lucide-react';

const Leaderboard = () => {
  const { state } = useGame();
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<string>('all');
  const itemsPerPage = 8;
  
  // Placeholder leaderboard data with more realistic values
  const leaderboardData = [
    { name: 'NEOX', score: 2500, level: 'master', date: '2025-05-15' },
    { name: 'CIPHER', score: 2200, level: 'expert', date: '2025-05-16' },
    { name: 'VERTEX', score: 2100, level: 'master', date: '2025-05-14' },
    { name: 'SYNAPSE', score: 1950, level: 'hard', date: '2025-05-17' },
    { name: 'PHANTOM', score: 1800, level: 'expert', date: '2025-05-18' },
    { name: 'ECHO', score: 1750, level: 'medium', date: '2025-05-13' },
    { name: 'PULSE', score: 1700, level: 'hard', date: '2025-05-19' },
    { name: 'NOVA', score: 1650, level: 'medium', date: '2025-05-16' },
    { name: 'WRAITH', score: 1600, level: 'easy', date: '2025-05-18' },
    { name: 'SHADOW', score: 1550, level: 'medium', date: '2025-05-17' },
    { name: 'ORION', score: 1520, level: 'hard', date: '2025-05-15' },
    { name: 'BLAZE', score: 1490, level: 'easy', date: '2025-05-14' },
    { name: 'GLITCH', score: 1450, level: 'expert', date: '2025-05-13' },
    // Add the player's high score if it exists
    ...(state.highScore > 0 ? [{ name: 'YOU', score: state.highScore, level: state.difficulty, date: '2025-05-19' }] : []),
  ];
  
  // Daily activity data
  const activityData = [
    { day: 'Mon', runs: 124 },
    { day: 'Tue', runs: 98 },
    { day: 'Wed', runs: 142 },
    { day: 'Thu', runs: 167 },
    { day: 'Fri', runs: 235 },
    { day: 'Sat', runs: 267 },
    { day: 'Sun', runs: 178 },
  ];

  // Filter data based on selected difficulty
  const filteredData = useMemo(() => {
    if (filter === 'all') return leaderboardData;
    return leaderboardData.filter(entry => entry.level === filter);
  }, [filter, leaderboardData]);
  
  // Sort by score in descending order
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => b.score - a.score);
  }, [filteredData]);
  
  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage]);
  
  // Calculate total pages
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  
  // Get the user's rank
  const userRank = state.highScore > 0 
    ? sortedData.findIndex(entry => entry.name === 'YOU') + 1
    : null;
  
  // Generate pagination items
  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <PaginationItem key={i}>
        <PaginationLink 
          onClick={() => setCurrentPage(i)}
          isActive={currentPage === i}
          className={`${currentPage === i ? 'border-cyber-cyan text-cyber-cyan' : 'text-cyber-cyan/70'}`}
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  // Level badge component
  const LevelBadge = ({ level }: { level: string }) => {
    const getBadgeColor = () => {
      switch (level) {
        case 'easy': return 'bg-green-500/20 text-green-400';
        case 'medium': return 'bg-blue-500/20 text-blue-400';
        case 'hard': return 'bg-orange-500/20 text-orange-400';
        case 'expert': return 'bg-purple-500/20 text-purple-400';
        case 'master': return 'bg-cyber-magenta/20 text-cyber-magenta';
        default: return 'bg-gray-500/20 text-gray-400';
      }
    };

    return (
      <span className={`px-2 py-0.5 rounded ${getBadgeColor()} text-xs uppercase`}>
        {level}
      </span>
    );
  };
  
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-cyber-cyan text-glow-cyan flex items-center">
          <Trophy className="mr-2 text-cyber-yellow" /> LEADERBOARD
        </h1>
        
        {/* Difficulty filter */}
        <div className="mb-6 flex gap-2 justify-center">
          <button 
            onClick={() => setFilter('all')} 
            className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-cyber-cyan text-black' : 'bg-cyber-cyan/20 text-cyber-cyan'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('easy')} 
            className={`px-3 py-1 rounded ${filter === 'easy' ? 'bg-green-500 text-black' : 'bg-green-500/20 text-green-400'}`}
          >
            Easy
          </button>
          <button 
            onClick={() => setFilter('medium')} 
            className={`px-3 py-1 rounded ${filter === 'medium' ? 'bg-blue-500 text-black' : 'bg-blue-500/20 text-blue-400'}`}
          >
            Medium
          </button>
          <button 
            onClick={() => setFilter('hard')} 
            className={`px-3 py-1 rounded ${filter === 'hard' ? 'bg-orange-500 text-black' : 'bg-orange-500/20 text-orange-400'}`}
          >
            Hard
          </button>
          <button 
            onClick={() => setFilter('expert')} 
            className={`px-3 py-1 rounded ${filter === 'expert' ? 'bg-purple-500 text-black' : 'bg-purple-500/20 text-purple-400'}`}
          >
            Expert
          </button>
          <button 
            onClick={() => setFilter('master')} 
            className={`px-3 py-1 rounded ${filter === 'master' ? 'bg-cyber-magenta text-black' : 'bg-cyber-magenta/20 text-cyber-magenta'}`}
          >
            Master
          </button>
        </div>
        
        {/* User rank card */}
        {userRank && (
          <div className="mb-6 cyber-glass p-4 border border-cyber-yellow rounded-md">
            <div className="flex items-center">
              <Medal className="text-cyber-yellow mr-2" />
              <div>
                <p className="text-cyber-yellow text-lg font-bold">
                  Your Rank: #{userRank} with a score of {state.highScore}
                </p>
                <p className="text-cyber-yellow/70 text-sm">
                  Keep hacking to improve your position!
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Leaderboard table */}
        <div className="cyber-glass border border-cyber-cyan/30 overflow-hidden rounded-md mb-10">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-cyber-cyan/30">
                <TableHead className="text-cyber-cyan">RANK</TableHead>
                <TableHead className="text-cyber-cyan">HACKER</TableHead>
                <TableHead className="text-cyber-cyan text-right">SCORE</TableHead>
                <TableHead className="text-cyber-cyan text-right">LEVEL</TableHead>
                <TableHead className="text-cyber-cyan text-right">DATE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((entry, index) => {
                const actualRank = (currentPage - 1) * itemsPerPage + index + 1;
                let rankDisplay;
                
                // Special display for top 3 ranks
                if (actualRank === 1) {
                  rankDisplay = <Trophy className="w-5 h-5 text-cyber-yellow" />;
                } else if (actualRank === 2) {
                  rankDisplay = <Medal className="w-5 h-5 text-gray-300" />;
                } else if (actualRank === 3) {
                  rankDisplay = <Medal className="w-5 h-5 text-amber-600" />;
                } else {
                  rankDisplay = <span className="text-cyber-yellow">{actualRank}</span>;
                }
                
                return (
                  <TableRow
                    key={index}
                    className={`
                      border-b border-cyber-cyan/10
                      ${entry.name === 'YOU' ? 'bg-cyber-cyan/10' : ''}
                      hover:bg-cyber-cyan/5
                    `}
                  >
                    <TableCell className="p-4">{rankDisplay}</TableCell>
                    <TableCell className={`p-4 ${entry.name === 'YOU' ? 'text-cyber-yellow font-bold' : ''}`}>
                      {entry.name === 'YOU' ? (
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-cyber-yellow" />
                          {entry.name}
                        </div>
                      ) : (
                        entry.name
                      )}
                    </TableCell>
                    <TableCell className="p-4 text-right text-cyber-magenta">{entry.score.toLocaleString()}</TableCell>
                    <TableCell className="p-4 text-right">
                      <LevelBadge level={entry.level} />
                    </TableCell>
                    <TableCell className="p-4 text-right text-cyber-cyan/70">{entry.date}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="mb-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="text-cyber-cyan disabled:opacity-50"
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>
              
              {paginationItems}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="text-cyber-cyan disabled:opacity-50"
                  aria-disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        
        {/* Daily Activity Chart */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-cyber-magenta text-glow-magenta flex items-center">
            <Star className="mr-2" /> Daily Activity
          </h2>
          <div className="cyber-glass border border-cyber-magenta/30 p-4 h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <XAxis 
                  dataKey="day" 
                  stroke="#ff2bff" 
                  tick={{ fill: '#ff2bff' }}
                />
                <YAxis 
                  stroke="#ff2bff" 
                  tick={{ fill: '#ff2bff' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0d0d0d', 
                    borderColor: '#ff2bff', 
                    color: '#00eaff'
                  }} 
                  itemStyle={{ color: '#00eaff' }}
                  labelStyle={{ color: '#ff2bff' }}
                />
                <Bar 
                  dataKey="runs" 
                  fill="#ff2bff" 
                  radius={[4, 4, 0, 0]}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-sm text-cyber-cyan/50">
            * Total runs: {activityData.reduce((acc, day) => acc + day.runs, 0)} in the last 7 days
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Leaderboard;
