import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { signalState, patchState } from '@ngrx/signals';
import { GameState } from '../store/scores.store'

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  state = signalState<GameState>({
    highScores: [
        { name: 'Player1', score: 1000 },
        { name: 'Player2', score: 900 },
        { name: 'Player3', score: 800 },
      ],
  });

  addHighScore(name: string, score: number) {
    patchState(this.state, (state) => ({
      highScores: [...state.highScores, { name, score }],
    }));
  }
}
