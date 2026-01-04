import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { WelcomeStateService } from '../../services/welcome-state.service';

/**
 * Welcome component that displays when guest arrives (OCCUPIED state).
 * Shows welcome message and optional name entry.
 */
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    TranslateModule
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  guestName = signal<string>('');
  inputValue = '';

  constructor(
    private welcomeState: WelcomeStateService,
    private router: Router
  ) {
    // Mark welcome as shown when component loads
    this.welcomeState.markWelcomeShown();
  }

  onSubmitName(): void {
    if (this.inputValue.trim()) {
      this.guestName.set(this.inputValue.trim());
      this.navigateToMenu();
    }
  }

  skipNameEntry(): void {
    this.navigateToMenu();
  }

  navigateToMenu(): void {
    this.router.navigate(['/menu']);
  }
}
