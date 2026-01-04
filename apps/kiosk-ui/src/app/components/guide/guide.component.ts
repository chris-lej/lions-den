import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbButtonModule, NbLayoutModule, NbThemeModule } from '@nebular/theme';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [CommonModule, RouterModule, NbCardModule, NbButtonModule, NbLayoutModule, NbThemeModule],
  template: `
    <nb-layout>
      <nb-layout-column>
        <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
          <nb-card>
            <nb-card-header>
              <h1>Local Area Guide</h1>
            </nb-card-header>
            <nb-card-body>
              <p>Local area guide content will be implemented in Slice 3.</p>
              <button nbButton status="primary" routerLink="/menu">Back to Menu</button>
            </nb-card-body>
          </nb-card>
        </div>
      </nb-layout-column>
    </nb-layout>
  `
})
export class GuideComponent {}

