import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ParamsBuilderService } from '../../services/params-builder.service';
import { WebService } from '../../services/web.service';
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ManageUsersComponent {
  userDialog: boolean = false;

  role = new FormControl();
  status = new FormControl();
  // users: any[] = [
  //   {
  //     id: '65b480cd73497b0eecac836b',
  //     username: 'Kertsu',
  //     email: 'kurtddanielbigtas@student.laverdad.edu.ph',
  //     role: 'superadmin',
  //     avatar:
  //       'http://res.cloudinary.com/drlztlr1m/image/upload/v1706356600/hzomg9luobx6v8lvxdng.jpg',
  //   },
  //   {
  //     id: '65be6e9e31c19ca1cf414b9f',
  //     username: 'johnmarkfaeldonia',
  //     email: 'johnmarkfaeldonia@student.laverdad.edu.ph',
  //     role: 'user',
  //     avatar:
  //       'http://res.cloudinary.com/drlztlr1m/image/upload/v1706979188/oxbsppubd3rsabqwfxsr.jpg',
  //   },
  //   {
  //     id: '65be7149289699e84d2b9a56',
  //     username: 'jirehbelen',
  //     email: 'jirehbelen@student.laverdad.edu.ph',
  //     role: 'user',
  //     avatar:
  //       'http://res.cloudinary.com/drlztlr1m/image/upload/v1706979188/oxbsppubd3rsabqwfxsr.jpg',
  //   },
  // ];

  users!: any[];

  user!: any;

  selectedUsers!: any[];

  submitted: boolean = false;

  roles!: any[];
  statuses!: any[];

  loading: boolean = false;
  totalRecords!: number;
  selectAll: boolean = false;

  form = this.fb.group({
    username: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(/@(student\.laverdad\.edu\.ph|laverdad\.edu\.ph)$/),
      ],
    ],
    password: ['', Validators.required],
  });

  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private paramsBuilder: ParamsBuilderService,
    private webService: WebService
  ) {}

  ngOnInit() {
    this.roles = [
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' },
      { label: 'Office Manager', value: 'om' },
      { label: 'Super Admin', value: 'superadmin' },
    ];

    this.statuses = [
      { label: 'Disabled', value: 1 },
      { label: 'Active', value: 0 },
    ];
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  openNew() {
    this.form.reset();
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.users = this.users.filter((val) => {
          console.log(val);
          return this.selectedUsers?.includes(val);
        });
        this.selectedUsers = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Users Deleted',
          life: 3000,
        });
      },
    });
  }

  editUser(user: any) {
    this.form.patchValue({
      username: user.username,
      email: user.email,
    });

    this.user = { ...user };
    this.userDialog = true;
  }

  deleteUser(user: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.username + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.users = this.users.filter((val) => val.id !== user.id);
        this.user = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'User Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  saveUser() {
    this.submitted = true;

    if (this.user.name?.trim()) {
      if (this.user.id) {
        this.users[this.findIndexById(this.user.id)] = this.user;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'User Updated',
          life: 3000,
        });
      } else {
        this.user.id = this.createId();
        this.user.image = 'user-placeholder.svg';
        this.users.push(this.user);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'User Created',
          life: 3000,
        });
      }

      this.users = [...this.users];
      this.userDialog = false;
      this.user = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  generatePasswordAndCopy() {
    const length = 10,
      charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let retVal = '';

    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }

    this.copyToClipboard(retVal);

    this.form.patchValue({
      password: retVal,
    });

    return retVal;
  }

  copyToClipboard(text: string) {
    const textarea = document.createElement('textarea');

    textarea.value = text;

    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';

    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand('copy');

    document.body.removeChild(textarea);
  }

  isObjectEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  loadUsers(event: any) {
    console.log(event);
    const params = this.paramsBuilder.buildParams(event);
    this.loading = true;
    this.webService.getUsers(params)
      .subscribe((res: any) => {
        if (res.success) {
          this.users = res.users;
          this.totalRecords = res.totalDocuments;
          this.loading = false;
        }
      });
  }

  onSelectionChange(value = []) {
    this.selectAll = value.length === this.totalRecords;
    this.selectedUsers = value;
  }

  onSelectAllChange(event: any) {
    const checked = event.checked;

    if (checked) {
      this.webService.getUsers().subscribe((res: any) => {
        if (res.success) {
          console.log(res);
          this.selectedUsers = res.users;
          this.selectAll = true;
        }
      });
    } else {
      this.selectedUsers = [];
      this.selectAll = false;
    }
  }
}
