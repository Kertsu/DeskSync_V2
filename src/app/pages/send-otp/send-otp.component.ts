import { Component } from '@angular/core';

@Component({
  selector: 'app-send-otp',
  templateUrl: './send-otp.component.html',
  styleUrl: './send-otp.component.css'
})
export class SendOtpComponent {
  isLoading: boolean = false;
  errorMessage!: string | null;
}
