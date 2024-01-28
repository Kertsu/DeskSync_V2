import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WebService } from '../../services/web.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isSubmitted: boolean = false;
  isLoading: boolean = false;
  errorMessage!: string;

  constructor(private fb: FormBuilder, private webService: WebService, private socketService: SocketService) {
   
  }

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  login() {
    this.isSubmitted = true;
    this.isLoading = true;

    const data = {
      email: this.loginForm.get('email')?.value ?? '',
      password: this.loginForm.get('password')?.value ?? '',
    };

    this.webService.onLoginUser(data).subscribe({
      next: (res:any) => {
        this.isSubmitted = false;
        this.isLoading = false;

      },
      error: (error) => {
        this.errorMessage = error.error.error
        this.isSubmitted = false;
        this.isLoading = false;
      },
    });
  }

}
