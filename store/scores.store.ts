import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';


export interface GameState {
    highScores: HighScore[];
}


interface HighScore {
    name: string;
    score: number;
}

export const initialHighScores: GameState = {
    highScores: [
        { name: 'Player1', score: 1000 },
        { name: 'Player2', score: 900 },
        { name: 'Player3', score: 800 },
    ],
};

export const scoreStore = signalStore({ providedIn: 'root' }, withState(initialHighScores), withMethods((store) => ({
    addHighScore(name: string, score: number): void {
        patchState(store, (state) => ({
            highScores: [...state.highScores, { name, score }],
        }))
    }
})))


