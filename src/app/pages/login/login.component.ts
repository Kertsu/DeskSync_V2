import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isSubmitted: boolean = false;
  messages!: Message[];

  isLoading: boolean = false;

  constructor(private fb: FormBuilder){}

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  login(){}

  checkValid(field: string) {
    return (
      this.loginForm.get(field)?.hasError('required') &&
      (this.loginForm.get(field)?.dirty ||
        this.loginForm.get(field)?.touched ||
        this.isSubmitted)
    );
  }
}
