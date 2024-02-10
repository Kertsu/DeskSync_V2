import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css',
  providers: [MessageService, ConfirmationService]
})
export class ManageUsersComponent {
  userDialog: boolean = false;

  users: any[] = [{"id":"65b480cd73497b0eecac836b","username":"Kertsu","email":"kurtddanielbigtas@student.laverdad.edu.ph","role":"superadmin","avatar":"http://res.cloudinary.com/drlztlr1m/image/upload/v1706356600/hzomg9luobx6v8lvxdng.jpg"}, {"id":"65be6e9e31c19ca1cf414b9f","username":"johnmarkfaeldonia","email":"johnmarkfaeldonia@student.laverdad.edu.ph","role":"user","avatar":"http://res.cloudinary.com/drlztlr1m/image/upload/v1706979188/oxbsppubd3rsabqwfxsr.jpg"}, {"id":"65be7149289699e84d2b9a56","username":"jirehbelen","email":"jirehbelen@student.laverdad.edu.ph","role":"user","avatar":"http://res.cloudinary.com/drlztlr1m/image/upload/v1706979188/oxbsppubd3rsabqwfxsr.jpg"}]

  user!: any;

  selectedUsers!: any[] | null;

  submitted: boolean = false;

  statuses!: any[];

  @ViewChild('dt') dt: Table | undefined;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {

      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  openNew() {
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
              this.users = this.users.filter((val) => !this.selectedUsers?.includes(val));
              this.selectedUsers = null;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
          }
      });
  }

  editUser(user: any) {
      this.user = { ...user };
      this.userDialog = true;
  }

  deleteUser(user: any) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + user.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.users = this.users.filter((val) => val.id !== user.id);
              this.user = {};
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
          }
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
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
          } else {
              this.user.id = this.createId();
              this.user.image = 'user-placeholder.svg';
              this.users.push(this.user);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
          }

          this.users = [...this.users];
          this.userDialog = false;
          this.user = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

}
