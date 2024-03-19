import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  isLoading: boolean = false;
  errorMessage!: string | null;

  token!: string | null;
  id!: string | null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
      this.id = params.get('id');
    });

    console.log(this.token, this.id)
  }

}
