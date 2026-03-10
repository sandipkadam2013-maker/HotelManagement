import { Component, inject } from '@angular/core';
import { LoaderService } from '../services/loader-service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-loader-component',
  imports: [NgIf,AsyncPipe],
  template:`
    <div class="loader-overlay" *ngIf="loaderService.loading$ | async">
      <div class="spinner"></div>
    </div>
  `,
  styleUrl: './loader-component.css',
})
export class LoaderComponent {

 loaderService = inject(LoaderService);
}
