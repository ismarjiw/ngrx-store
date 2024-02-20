import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameComponent } from './game/game.component';
import { GameplayComponent } from './gameplay/gameplay.component';
import { ActionReducer, MetaReducer, ActionReducerMap } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { scoreReducer } from './store/scores.reducer';

// https://blog.briebug.com/blog/how-to-add-ngrx-store-slices-into-localstorage

export const reducers: ActionReducerMap<any> = {
  scores: scoreReducer,
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  if (typeof window !== 'undefined') {
    return localStorageSync({ keys: [
      { scores: ['highScores'] }
    ] 
  })(reducer);
  } else {
    // Return the original reducer if running in a non-browser environment
    return reducer;
  }
}

// export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
//   return function(state, action) {
//     console.log('State before synchronization:', state);
//     const newState = reducer(state, action);
//     console.log('State after synchronization:', newState);
//     // Log keys for synchronization
//     console.log('Keys for synchronization:', Object.keys(localStorage));
//     // Perform local storage synchronization here
//     console.log('Syncing with localStorage');
//     return newState;
//   };
// }

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GameComponent, GameplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'game';
}
