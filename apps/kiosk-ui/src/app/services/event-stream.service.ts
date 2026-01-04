import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * Event types matching the Event Contract in docs/process/EVENTS.md
 */
export interface DoorEvent {
  type: 'door';
  sensor_id: string;
  state: 'open' | 'closed';
  timestamp: string;
}

export interface PresenceEvent {
  type: 'presence';
  sensor_id: string;
  state: 'occupied' | 'vacant';
  timestamp: string;
}

export interface PresenceStateEvent {
  type: 'presence_state';
  state: 'VACANT' | 'OCCUPIED' | 'TRANSITION';
  timestamp: string;
  trigger?: {
    door_event?: DoorEvent;
    presence_event?: PresenceEvent;
  };
}

export type ConciergeEvent = DoorEvent | PresenceEvent | PresenceStateEvent;

/**
 * Service for connecting to hub-api SSE event stream.
 */
@Injectable({
  providedIn: 'root'
})
export class EventStreamService {
  private eventSource: EventSource | null = null;
  private eventSubject = new Subject<ConciergeEvent>();
  public events$: Observable<ConciergeEvent> = this.eventSubject.asObservable();
  
  private hubApiUrl = this.getHubApiUrl();

  private getHubApiUrl(): string {
    // In production, use environment configuration
    if (typeof window !== 'undefined') {
      // If served from same origin, use relative URL for API
      const apiPort = window.location.port === '80' || window.location.port === '' 
        ? '8000' 
        : '8000';
      return `${window.location.protocol}//${window.location.hostname}:${apiPort}`;
    }
    return 'http://localhost:8000';
  }

  /**
   * Connect to the SSE event stream from hub-api.
   */
  connect(): void {
    if (this.eventSource) {
      console.warn('Event stream already connected');
      return;
    }

    const url = `${this.hubApiUrl}/api/events/stream`;
    this.eventSource = new EventSource(url);

    this.eventSource.addEventListener('door', (event: MessageEvent) => {
      const data: DoorEvent = JSON.parse(event.data);
      this.eventSubject.next(data);
    });

    this.eventSource.addEventListener('presence', (event: MessageEvent) => {
      const data: PresenceEvent = JSON.parse(event.data);
      this.eventSubject.next(data);
    });

    this.eventSource.addEventListener('presence_state', (event: MessageEvent) => {
      const data: PresenceStateEvent = JSON.parse(event.data);
      this.eventSubject.next(data);
    });

    this.eventSource.onerror = (error) => {
      console.error('EventSource error:', error);
      this.disconnect();
      // Attempt to reconnect after 5 seconds
      setTimeout(() => this.connect(), 5000);
    };

    console.log('Connected to event stream:', url);
  }

  /**
   * Disconnect from the event stream.
   */
  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      console.log('Disconnected from event stream');
    }
  }

  /**
   * Set the hub-api URL (useful for different environments).
   */
  setHubApiUrl(url: string): void {
    this.hubApiUrl = url;
    if (this.eventSource) {
      this.disconnect();
      this.connect();
    }
  }
}

