import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  checked = new FormControl();

  informationForm!: FormGroup;

  visible: boolean = false;

  changePasswordForm!: FormGroup;

  ngOnInit() {

    const user = this.userService.getUser();
    this.informationForm.patchValue({
      username: user.username,
      description: user.description,
    });

    this.informationForm.valueChanges.subscribe(() => {
      if (
        this.informationForm.get('username')?.dirty ||
        this.informationForm.get('description')?.dirty
      ) {
        this.showChangesPopup();
      }
    });
  }

  constructor(protected userService: UserService, private fb: FormBuilder) {
    this.changePasswordForm = new FormGroup({});

    this.informationForm = this.fb.group({
      username: '',
      description: '',
    });
  }

  showChangePasswordDialog() {
    this.visible = true;
  }

  showChangesPopup(){
    console.log('modified')
  }
}
