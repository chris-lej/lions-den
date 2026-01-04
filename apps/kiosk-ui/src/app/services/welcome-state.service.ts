import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service to manage welcome state and prevent repeated greetings.
 * Tracks whether welcome has been shown for the current arrival.
 */
@Injectable({
  providedIn: 'root'
})
export class WelcomeStateService {
  private welcomeShownSubject = new BehaviorSubject<boolean>(false);
  public welcomeShown$: Observable<boolean> = this.welcomeShownSubject.asObservable();
  
  private previousState: 'VACANT' | 'OCCUPIED' | 'TRANSITION' = 'VACANT';

  /**
   * Check if welcome should be shown based on presence state transition.
   * Returns true only for VACANT → OCCUPIED transitions (new arrival).
   * Updates previous state internally.
   */
  shouldShowWelcome(currentState: 'VACANT' | 'OCCUPIED' | 'TRANSITION'): boolean {
    const isNewArrival = this.previousState === 'VACANT' && currentState === 'OCCUPIED';
    this.previousState = currentState;
    
    if (isNewArrival && !this.welcomeShownSubject.value) {
      return true;
    }
    
    return false;
  }

  /**
   * Mark welcome as shown (called when welcome screen is displayed).
   */
  markWelcomeShown(): void {
    this.welcomeShownSubject.next(true);
  }

  /**
   * Reset welcome state (called when guest leaves - VACANT state).
   */
  resetWelcomeState(): void {
    this.welcomeShownSubject.next(false);
    this.previousState = 'VACANT';
  }

  /**
   * Check if welcome has been shown for current session.
   */
  hasWelcomeBeenShown(): boolean {
    return this.welcomeShownSubject.value;
  }
}

