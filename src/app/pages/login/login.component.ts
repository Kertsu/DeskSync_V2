import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showPassword!: boolean;
  isSubmitted: boolean = false;
  messages!: Message[];
  lis = [
    { label: 'Terms', routerLink: '/terms' },
    { label: 'Features', routerLink: '/features' },
    { label: 'Privacy', routerLink: '/privacy' },
    { label: 'About', routerLink: '/about' },
    { label: 'Contact', routerLink: '/contact' },
    { label: 'API', routerLink: '/api' }
];

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
