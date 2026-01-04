import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { EventStreamService, PresenceStateEvent } from './services/event-stream.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NbLayoutModule, NbThemeModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('Lion\'s Lair Concierge');
  currentPresenceState = signal<'VACANT' | 'OCCUPIED' | 'TRANSITION'>('VACANT');
  private eventSubscription?: Subscription;

  constructor(private eventStream: EventStreamService) {}

  ngOnInit(): void {
    // Connect to event stream
    this.eventStream.connect();
    
    // Subscribe to presence state events
    this.eventSubscription = this.eventStream.events$.subscribe(event => {
      if (event.type === 'presence_state') {
        this.currentPresenceState.set(event.state);
        console.log('Presence state changed:', event.state);
      }
    });
  }

  ngOnDestroy(): void {
    this.eventSubscription?.unsubscribe();
    this.eventStream.disconnect();
  }
}
