import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  visible: boolean = false;

  changePasswordForm!: FormGroup;

    ngOnInit() {
        this.changePasswordForm = new FormGroup({
        });
    }

  constructor(protected userService: UserService){}

  showChangePasswordDialog(){
    this.visible = true;
  }
}
