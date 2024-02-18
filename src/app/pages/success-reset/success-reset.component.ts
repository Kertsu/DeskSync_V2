import { Component } from '@angular/core';

@Component({
  selector: 'app-success-reset',
  templateUrl: './success-reset.component.html',
  styleUrl: './success-reset.component.css'
})
export class SuccessResetComponent {
  isLoading: boolean = false;
  errorMessage!: string | null;

}
