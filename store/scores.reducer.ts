import { addHighScore } from './scores.actions';
import { createReducer, on } from '@ngrx/store'
import { initialHighScores } from './scores.store';

export const scoreReducer = createReducer(
initialHighScores,
on(addHighScore, state=> ({...state, highScores: state.highScores}))
)
