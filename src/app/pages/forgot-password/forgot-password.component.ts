import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebService } from '../../services/web.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit{
  isLoading: boolean = false;
  errorMessage!: string | null;

  forgotPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private webService: WebService){
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]]
    })
  }

  ngOnInit(): void {

    this.forgotPasswordForm.valueChanges.subscribe(res => console.log(res))
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formData = this.forgotPasswordForm.value;

    console.log(formData.email)
  }

}
