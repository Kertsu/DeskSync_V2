import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WebService } from '../../services/web.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isSubmitted: boolean = false;
  isLoading: boolean = false;
  errorMessage!: string;

  constructor(private fb: FormBuilder, private webService: WebService) {}

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
      next: (res) => {
        console.log(res);
        this.isSubmitted = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error.error.error
        this.isSubmitted = false;
        this.isLoading = false;
      },
    });
  }

  checkValid(field: string) {
    return (
      this.loginForm.get(field)?.hasError('required') &&
      (this.loginForm.get(field)?.dirty ||
        this.loginForm.get(field)?.touched ||
        this.isSubmitted)
    );
  }
}
