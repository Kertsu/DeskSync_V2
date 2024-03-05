import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {
  informationForm!: FormGroup;
  checked = new FormControl();
  visible: boolean = false;
  uploadPopupShown: boolean = false;
  changePasswordForm!: FormGroup;
  messageShown: boolean = false;
  originalFormValue: any;
  avatarSource: string = this.userService.getUser()?.avatar;
  bannerSource: string = this.userService.getUser()?.banner;

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

    this.informationForm.valueChanges.subscribe(() => {
      this.checkForChanges();
    });
  }

  checkForChanges() {
    const formChanged = this.isFormChanged();
    const avatarChanged = this.avatarSource !== this.userService.getUser()?.avatar;
    const bannerChanged = this.bannerSource !== this.userService.getUser()?.banner;

    if (!this.messageShown && (formChanged || avatarChanged || bannerChanged)) {
      this.showAlert();
    }
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
    this.avatarSource = this.userService.getUser()?.avatar;
    this.bannerSource = this.userService.getUser()?.banner;
    this.messageShown = false;
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
    return JSON.stringify(this.informationForm.value) !== JSON.stringify(this.originalFormValue);
  }

  setOriginalFormValue() {
    this.originalFormValue = this.informationForm.value;
  }

  removeAvatar() {
    this.avatarSource = 'http://res.cloudinary.com/drlztlr1m/image/upload/v1706979188/oxbsppubd3rsabqwfxsr.jpg';
    this.checkForChanges();
  }

  removeBanner() {
    this.bannerSource = 'https://res.cloudinary.com/drlztlr1m/image/upload/v1708332794/memuvo7apu0eqdt4f6mr.svg';
    this.checkForChanges();
  }

  showUpload(){
    this.uploadPopupShown = true
  }

  onUpload(event: any){
    console.log(event)
  }
}
