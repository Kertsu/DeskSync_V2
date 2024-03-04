import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {
  informationForm!: FormGroup;
  checked = new FormControl();
  visible: boolean = false;
  changePasswordForm!: FormGroup;
  messageShown: boolean = false;
  originalFormValue: any;

  constructor(
    protected userService: UserService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.changePasswordForm = new FormGroup({});
    this.informationForm = this.fb.group({
      username: '',
      description: '',
    });
  }

  ngOnInit() {
    this.patchUser();
    this.setOriginalFormValue();

    console.log('infoform1',this.informationForm.value)
    console.log('origform1',this.originalFormValue)

    this.informationForm.valueChanges.subscribe(() => {
      if (!this.messageShown && this.isFormChanged()) {
        this.showAlert();
        console.log('infoform2',this.informationForm.value)
        console.log('origform2',this.originalFormValue)
      }
    });
  }

  showChangePasswordDialog() {
    this.visible = true;
  }

  patchUser() {
    const user = this.userService.getUser();
    this.informationForm.patchValue({
      username: user.username,
      description: user.description,
    });
  }

  reset() {
    this.patchUser();
    this.setOriginalFormValue();
    this.messageShown = false;

    console.log('infoform3',this.informationForm.value)
    console.log('origform3',this.originalFormValue)
  }

  showAlert() {
    this.messageShown = true;
    this.messageService.add({
      key: 'bc',
      severity: 'custom',
      detail: 'Heads up — you have unsaved changes!',
      sticky: true
    });
  }

  close() {
      this.reset();
  }

  isFormChanged() {
    console.log(JSON.stringify(this.informationForm.value) !== JSON.stringify(this.originalFormValue))
    return JSON.stringify(this.informationForm.value) !== JSON.stringify(this.originalFormValue);
  }

  setOriginalFormValue() {
    this.originalFormValue = this.informationForm.value;
  }
}
