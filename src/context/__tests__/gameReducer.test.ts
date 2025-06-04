import { gameReducer, initialState, GameState } from '../GameContext';
import { describe, it, expect } from 'vitest';

describe('gameReducer START_GAME', () => {
  it('preserves high score and resets other fields', () => {
    const prevState: GameState = {
      ...initialState,
      status: 'gameOver',
      highScore: 200,
      score: 150,
      timeRemaining: 30,
      combo: 5,
      idleTime: 10,
      player: {
        ...initialState.player,
        x: 5,
        y: 6,
        integrity: 50,
        canDash: false,
        dashCooldown: 2,
      },
    };

    const newState = gameReducer(prevState, { type: 'START_GAME', difficulty: 'hard' });

    expect(newState.highScore).toBe(200);
    expect(newState.status).toBe('playing');
    expect(newState.difficulty).toBe('hard');
    expect(newState.score).toBe(0);
    expect(newState.combo).toBe(1);
    expect(newState.timeRemaining).toBe(initialState.timeRemaining);
    expect(newState.idleTime).toBe(0);
    expect(newState.player).toEqual({ ...initialState.player, x: 0, y: 0 });
  });
});
