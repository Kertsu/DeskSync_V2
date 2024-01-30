import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SocketService } from '../../services/socket.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isSubmitted: boolean = false;
  isLoading: boolean = false;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private socketService: SocketService,
    private userService: UserService,
    private router: Router
  ) {
    this.socketService.connect();

    this.socketService.listen('loginSuccess').subscribe({
      next: (res: any) => {
        this.userService.setUser(res);
        this.changeStatus(false);
        this.router.navigate(['/hdbsv2/dashboard'])
      }
    });

    this.socketService.listen('loginFailed').subscribe({
      next: (res: any) => {
        this.errorMessage = res.error;
        this.changeStatus(false);
      },
    });
  }

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
  });

  login() {
    this.changeStatus(true);

    const email = this.loginForm.get('email')?.value ?? '';
    const password = this.loginForm.get('password')?.value ?? '';

    this.socketService.emit('login', { email, password });
  }

  changeStatus(value: boolean) {
    this.isLoading = value;
    this.isSubmitted = value;
  }
}
