import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { SimulatorService } from '../../services/simulator.service';
import { EventStreamService, PresenceStateEvent } from '../../services/event-stream.service';
import { Subscription } from 'rxjs';

/**
 * Admin Simulator Panel for testing door and presence events.
 * Hidden from normal navigation - accessible via direct URL only.
 */
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatSnackBarModule,
    TranslateModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit, OnDestroy {
  currentState: 'VACANT' | 'OCCUPIED' | 'TRANSITION' | 'UNKNOWN' = 'UNKNOWN';
  apiStatus: 'healthy' | 'unhealthy' | 'checking' = 'checking';
  private eventSubscription?: Subscription;
  private healthCheckInterval?: any;

  constructor(
    private simulatorService: SimulatorService,
    private eventStream: EventStreamService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // Connect to event stream to monitor state changes
    this.eventStream.connect();
    this.eventSubscription = this.eventStream.events$.subscribe(event => {
      if (event.type === 'presence_state') {
        this.currentState = event.state;
      }
    });

    // Check API health
    this.checkHealth();
    this.healthCheckInterval = setInterval(() => this.checkHealth(), 5000);
  }

  ngOnDestroy(): void {
    this.eventSubscription?.unsubscribe();
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
  }

  checkHealth(): void {
    this.simulatorService.getHealth().subscribe({
      next: (health) => {
        this.apiStatus = 'healthy';
        if (health.current_state) {
          this.currentState = health.current_state as any;
        }
      },
      error: () => {
        this.apiStatus = 'unhealthy';
      }
    });
  }

  triggerDoorOpen(): void {
    this.simulatorService.simulateDoorOpen().subscribe({
      next: () => this.showSuccess(this.getTranslation('admin.success.doorOpened')),
      error: () => this.showError(this.getTranslation('admin.error.doorOpenFailed'))
    });
  }

  triggerDoorClose(): void {
    this.simulatorService.simulateDoorClose().subscribe({
      next: () => this.showSuccess(this.getTranslation('admin.success.doorClosed')),
      error: () => this.showError(this.getTranslation('admin.error.doorCloseFailed'))
    });
  }

  triggerPresenceOccupied(): void {
    this.simulatorService.simulatePresenceOccupied().subscribe({
      next: () => this.showSuccess(this.getTranslation('admin.success.occupancyDetected')),
      error: () => this.showError(this.getTranslation('admin.error.occupancyFailed'))
    });
  }

  triggerPresenceVacant(): void {
    this.simulatorService.simulatePresenceVacant().subscribe({
      next: () => this.showSuccess(this.getTranslation('admin.success.occupancyCleared')),
      error: () => this.showError(this.getTranslation('admin.error.clearOccupancyFailed'))
    });
  }

  triggerArrival(): void {
    this.simulatorService.simulateArrival().subscribe({
      next: () => this.showSuccess(this.getTranslation('admin.success.arrivalSimulated')),
      error: () => this.showError(this.getTranslation('admin.error.arrivalFailed'))
    });
  }

  private getTranslation(key: string): string {
    let translation = '';
    this.translate.get(key).subscribe((value: string) => {
      translation = value;
    });
    return translation || key;
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  getStateColor(): string {
    switch (this.currentState) {
      case 'VACANT':
        return 'primary';
      case 'OCCUPIED':
        return 'accent';
      case 'TRANSITION':
        return 'warn';
      default:
        return '';
    }
  }
}

