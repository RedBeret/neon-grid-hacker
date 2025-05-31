import React, { Suspense, lazy } from 'react'; // Added Suspense and lazy
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Dynamically import pages
const Index = lazy(() => import("./pages/Index"));
const Play = lazy(() => import("./pages/Play"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Settings = lazy(() => import("./pages/Settings"));
const Credits = lazy(() => import("./pages/Credits"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Providers
import { GameProvider } from "./context/GameContext";
import { AudioProvider } from "./context/AudioContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GameProvider>
      <AudioProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {/* BrowserRouter with basename for GitHub Pages */}
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            {/* Add Suspense for lazy loading routes */}
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/play" element={<Play />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/credits" element={<Credits />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AudioProvider>
    </GameProvider>
  </QueryClientProvider>
);

export default App;
