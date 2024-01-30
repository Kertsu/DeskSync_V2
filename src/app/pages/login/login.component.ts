import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WebService } from '../../services/web.service';
import { SocketService } from '../../services/socket.service';
import { forkJoin } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isSubmitted: boolean = false;
  isLoading: boolean = false;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private webService: WebService,
    private socketService: SocketService,
    private userService: UserService
  ) {
    this.socketService.connect();

    this.socketService.listen('loginSuccess').subscribe({
      next: (res: any) => {
        this.userService.setUser(res);
        this.changeStatus(false);
      },
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
