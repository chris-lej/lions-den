import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { EventStreamService, PresenceStateEvent } from './services/event-stream.service';
import { WelcomeStateService } from './services/welcome-state.service';
import { TranslationService } from './services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LanguageSelectorComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('Lion\'s Lair Concierge');
  currentPresenceState = signal<'VACANT' | 'OCCUPIED' | 'TRANSITION'>('VACANT');
  private eventSubscription?: Subscription;

  constructor(
    private eventStream: EventStreamService,
    private welcomeState: WelcomeStateService,
    private router: Router,
    private translate: TranslateService,
    private translationService: TranslationService
  ) {
    // Initialize translations
    this.translate.setDefaultLang('en');
    const savedLang = localStorage.getItem('preferred-language') || 'en';
    this.translate.use(savedLang);
  }

  ngOnInit(): void {
    // Connect to event stream
    this.eventStream.connect();
    
    // Subscribe to presence state events
    this.eventSubscription = this.eventStream.events$.subscribe(event => {
      if (event.type === 'presence_state') {
        this.handlePresenceState(event);
      }
    });
  }

  private handlePresenceState(event: PresenceStateEvent): void {
    const previousState = this.currentPresenceState();
    this.currentPresenceState.set(event.state);
    
    console.log('Presence state changed:', previousState, '→', event.state);

    // Handle state transitions
    if (event.state === 'VACANT') {
      // Guest left - reset welcome state
      this.welcomeState.resetWelcomeState();
    } else if (event.state === 'OCCUPIED') {
      // Check if this is a new arrival (VACANT → OCCUPIED transition)
      if (previousState === 'VACANT' && this.welcomeState.shouldShowWelcome(event.state)) {
        // Navigate to welcome screen only if not already there
        const currentUrl = this.router.url;
        if (currentUrl !== '/welcome' && currentUrl !== '/menu') {
          this.router.navigate(['/welcome']);
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.eventSubscription?.unsubscribe();
    this.eventStream.disconnect();
  }
}
