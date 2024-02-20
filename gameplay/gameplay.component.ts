import { getState } from '@ngrx/signals';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { scoreStore } from '../store/scores.store'
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-gameplay',
  standalone: true,
  imports: [FormsModule, JsonPipe, CommonModule],
  templateUrl: './gameplay.component.html',
  styleUrl: './gameplay.component.css',
  providers: [scoreStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameplayComponent {

  newName: string = ''
  newScore: number = 0

  readonly store = inject(scoreStore);

  constructor() {
    effect(() => {
      // 👇 The effect will be re-executed whenever the state changes.
      const state = getState(this.store);
      console.log('scores state changed', state);
    });
  }

  addHighScore(name: string, score: number) {
    if (name && score != 0) {
      this.newName = name
      this.newScore = score
    }

      this.store.addHighScore(this.newName, this.newScore)

      console.log(this.store.highScores())
  }


}
