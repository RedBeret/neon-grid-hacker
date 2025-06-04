
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define types
export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert' | 'master';
export type GameStatus = 'idle' | 'playing' | 'paused' | 'gameOver';

export interface Node {
  id: string;
  x: number;
  y: number;
  type: 'loop' | 'conditional' | 'recursion';
  solved: boolean;
  color: 'cyan' | 'magenta' | 'yellow';
}

export interface PlayerState {
  x: number;
  y: number;
  integrity: number;
  canDash: boolean;
  dashCooldown: number;
}

export interface GameState {
  status: GameStatus;
  difficulty: Difficulty;
  timeRemaining: number;
  score: number;
  combo: number;
  grid: Node[][];
  player: PlayerState;
  highScore: number;
  idleTime: number;
}

type GameAction =
  | { type: 'START_GAME'; difficulty: Difficulty }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'END_GAME' }
  | { type: 'SET_HIGH_SCORE'; highScore: number }
  | { type: 'MOVE_PLAYER'; x: number; y: number }
  | { type: 'SOLVE_NODE'; x: number; y: number }
  | { type: 'UPDATE_TIME'; delta: number }
  | { type: 'DASH' }
  | { type: 'RESET_DASH_COOLDOWN' }
  | { type: 'TAKE_DAMAGE'; amount: number }
  | { type: 'UPDATE_IDLE_TIME'; delta: number }
  | { type: 'RESET_IDLE_TIME' };

// Initial state
export const initialState: GameState = {
  status: 'idle',
  difficulty: 'easy',
  timeRemaining: 90, // 90 seconds
  score: 0,
  combo: 1,
  grid: [],
  player: {
    x: 0,
    y: 0,
    integrity: 100,
    canDash: true,
    dashCooldown: 0,
  },
  highScore: 0,
  idleTime: 0,
};

// Generate a random grid based on difficulty
const generateGrid = (difficulty: Difficulty): Node[][] => {
  const gridSize = 10; // 10x10 grid
  const grid: Node[][] = [];
  
  const difficultySettings = {
    easy: { loopChance: 0.6, conditionalChance: 0.3, recursionChance: 0.1 },
    medium: { loopChance: 0.5, conditionalChance: 0.3, recursionChance: 0.2 },
    hard: { loopChance: 0.4, conditionalChance: 0.3, recursionChance: 0.3 },
    expert: { loopChance: 0.3, conditionalChance: 0.4, recursionChance: 0.3 },
    master: { loopChance: 0.2, conditionalChance: 0.4, recursionChance: 0.4 },
  };
  
  const colors: ('cyan' | 'magenta' | 'yellow')[] = ['cyan', 'magenta', 'yellow'];
  
  for (let y = 0; y < gridSize; y++) {
    const row: Node[] = [];
    for (let x = 0; x < gridSize; x++) {
      const random = Math.random();
      const settings = difficultySettings[difficulty];
      let type: 'loop' | 'conditional' | 'recursion';
      
      if (random < settings.loopChance) {
        type = 'loop';
      } else if (random < settings.loopChance + settings.conditionalChance) {
        type = 'conditional';
      } else {
        type = 'recursion';
      }
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      row.push({
        id: `node-${x}-${y}`,
        x,
        y,
        type,
        solved: false,
        color,
      });
    }
    grid.push(row);
  }
  
  return grid;
};

// Reducer
export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        status: 'playing',
        difficulty: action.difficulty,
        grid: generateGrid(action.difficulty),
        player: {
          ...initialState.player,
          x: 0,
          y: 0,
        },
        highScore: state.highScore,
      };
      
    case 'PAUSE_GAME':
      return {
        ...state,
        status: 'paused',
      };
      
    case 'RESUME_GAME':
      return {
        ...state,
        status: 'playing',
      };
      
    case 'END_GAME': {
      const newHighScore = state.score > state.highScore ? state.score : state.highScore;
      return {
        ...state,
        status: 'gameOver',
        highScore: newHighScore,
      };
    }

    case 'SET_HIGH_SCORE': {
      return {
        ...state,
        highScore: action.highScore,
      };
    }
    
    case 'MOVE_PLAYER':
      return {
        ...state,
        player: {
          ...state.player,
          x: action.x,
          y: action.y,
        },
        idleTime: 0,
      };
      
    case 'SOLVE_NODE': {
      if (state.status !== 'playing') return state;
      
      const newGrid = [...state.grid];
      
      // Check if the node exists and is not solved
      if (
        action.y >= 0 && 
        action.y < newGrid.length && 
        action.x >= 0 && 
        action.x < newGrid[action.y].length && 
        !newGrid[action.y][action.x].solved
      ) {
        newGrid[action.y][action.x] = {
          ...newGrid[action.y][action.x],
          solved: true,
        };
        
        // Update score and combo
        const basePoints = 100;
        const points = basePoints * state.combo;
        const newCombo = state.combo + 0.1;
        
        return {
          ...state,
          grid: newGrid,
          score: state.score + points,
          combo: newCombo,
          idleTime: 0,
        };
      }
      
      return state;
    }
    
    case 'UPDATE_TIME': {
      const newTime = state.timeRemaining - action.delta;
      if (newTime <= 0) {
        return {
          ...state,
          timeRemaining: 0,
          status: 'gameOver',
          highScore: Math.max(state.highScore, state.score),
        };
      }
      return {
        ...state,
        timeRemaining: newTime,
      };
    }
    
    case 'DASH':
      return {
        ...state,
        player: {
          ...state.player,
          canDash: false,
          dashCooldown: 3, // 3 seconds cooldown
        },
        idleTime: 0,
      };
      
    case 'RESET_DASH_COOLDOWN':
      return {
        ...state,
        player: {
          ...state.player,
          canDash: true,
          dashCooldown: 0,
        },
      };
      
    case 'TAKE_DAMAGE': {
      const newIntegrity = state.player.integrity - action.amount;
      if (newIntegrity <= 0) {
        return {
          ...state,
          player: {
            ...state.player,
            integrity: 0,
          },
          status: 'gameOver',
          highScore: Math.max(state.highScore, state.score),
        };
      }
      return {
        ...state,
        player: {
          ...state.player,
          integrity: newIntegrity,
        },
      };
    }
    
    case 'UPDATE_IDLE_TIME': {
      const newIdleTime = state.idleTime + action.delta;
      // Penalize for idling (-10 points per second)
      const idlePenalty = Math.floor(action.delta * 10);
      
      return {
        ...state,
        idleTime: newIdleTime,
        score: Math.max(0, state.score - idlePenalty),
      };
    }
    
    case 'RESET_IDLE_TIME':
      return {
        ...state,
        idleTime: 0,
      };
      
    default:
      return state;
  }
};

// Context
interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  
  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('codebreaker-high-score');
    if (savedHighScore) {
      const highScore = parseInt(savedHighScore, 10);
      if (!isNaN(highScore) && highScore > 0) {
        dispatch({ type: 'SET_HIGH_SCORE', highScore });
      }
    }
  }, []);
  
  // Save high score to localStorage when it changes
  useEffect(() => {
    if (state.highScore > 0) {
      localStorage.setItem('codebreaker-high-score', state.highScore.toString());
    }
  }, [state.highScore]);
  
  // Game timer
  useEffect(() => {
    let timer: number | undefined;
    
    if (state.status === 'playing') {
      timer = window.setInterval(() => {
        dispatch({ type: 'UPDATE_TIME', delta: 0.1 });
        dispatch({ type: 'UPDATE_IDLE_TIME', delta: 0.1 });
        
        // Update dash cooldown
        if (state.player.dashCooldown > 0) {
          const newCooldown = state.player.dashCooldown - 0.1;
          if (newCooldown <= 0) {
            dispatch({ type: 'RESET_DASH_COOLDOWN' });
          }
        }
      }, 100); // Update every 0.1 seconds
    }
    
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [state.status, state.player.dashCooldown]);
  
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

// Hook
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
