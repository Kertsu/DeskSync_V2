import { Component, ViewChild } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { WebService } from '../../services/web.service';
import { ParamsBuilderService } from '../../services/params-builder.service';
@Component({
  selector: 'app-manage-desks',
  templateUrl: './manage-desks.component.html',
  styleUrl: './manage-desks.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ManageDesksComponent {
  deskDialog: boolean = false;

  areas: any = [];

  desksForm: FormGroup;

  // desks: any[] = [
  //   {
  //     id: '657d34368747ff99f36bb96e',
  //     title: 'Hotdesk 8',
  //     rating: 2,
  //     deskNumber: 8,
  //     workspaceEssentials: ['Mini Fridge', 'Whiteboard', 'Under-Desk Storage'],
  //     status: 'UNAVAILABLE',
  //   },
  //   {
  //     id: '657d34368747ff99f36bb98e',
  //     title: 'Hotdesk 40',
  //     rating: 4,
  //     deskNumber: 40,
  //     workspaceEssentials: ['Personalized Nameplate', 'Cubicle Privacy Screen'],
  //     status: 'UNAVAILABLE',
  //   },
  //   {
  //     id: '657d34368747ff99f36bb979',
  //     title: 'Hotdesk 19',
  //     rating: 1,
  //     deskNumber: 19,
  //     workspaceEssentials: ['Cubicle Mirror', 'Footrest', 'Task Lighting'],
  //     status: 'UNAVAILABLE',
  //   },
  // ];

  desks: any[] = [];

  desk!: any;

  selectedDesks!: any[] | null;

  submitted: boolean = false;

  form: FormGroup;
  areaForm: FormGroup;

  loading: boolean = false;
  totalRecords!: number;
  selectAll: boolean = false;

  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private webService: WebService,
    private paramsBuilder: ParamsBuilderService
  ) {
    this.form = new FormGroup({
      selectedArea: new FormControl(null, [Validators.required]),
    });
    this.areaForm = new FormGroup({
      selectedArea: new FormControl(null, [Validators.required]),
    });

    this.desksForm = this.fb.group({});

    this.desks.forEach((desk) => {
      this.desksForm.addControl(desk.id, new FormControl(desk.rating));
    });
  }

  ngOnInit() {
    this.areas = [
      { name: 'Workstation', number: 1 },
      { name: 'Left-Wing Main Office', number: 2 },
      { name: 'Right-Wing Main Office', number: 3 },
    ];

    this.areaForm.valueChanges.subscribe((res) => console.log(res));
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  openNew() {
    this.desk = {};
    this.submitted = false;
    this.deskDialog = true;
  }

  deleteSelectedDesks() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected desks?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.desks = this.desks.filter(
          (val) => !this.selectedDesks?.includes(val)
        );
        this.selectedDesks = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Desks Deleted',
          life: 3000,
        });
      },
    });
  }

  editDesk(desk: any) {
    this.form.patchValue({
      deskname: desk.deskname,
      email: desk.email,
    });

    this.desk = { ...desk };
    this.deskDialog = true;
  }

  deleteDesk(desk: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + desk.deskname + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.desks = this.desks.filter((val) => val.id !== desk.id);
        this.desk = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Desk Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.deskDialog = false;
    this.submitted = false;
  }

  saveDesk() {
    this.submitted = true;

    if (this.desk.name?.trim()) {
      if (this.desk.id) {
        this.desks[this.findIndexById(this.desk.id)] = this.desk;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Desk Updated',
          life: 3000,
        });
      } else {
        this.desk.id = this.createId();
        this.desk.image = 'desk-placeholder.svg';
        this.desks.push(this.desk);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Desk Created',
          life: 3000,
        });
      }

      this.desks = [...this.desks];
      this.deskDialog = false;
      this.desk = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.desks.length; i++) {
      if (this.desks[i].id === id) {
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

  loadDesks(event: any) {
    console.log(event)
    this.loading = true;
    const params = this.paramsBuilder.buildParams(event);
    this.webService.getDesks(params).subscribe((res: any) => {
      this.desks = res.desks;
      this.totalRecords = res.totalDocuments;
      this.loading = false;
    });
  }

  onSelectionChange(value = []) {
    this.selectAll = value.length === this.totalRecords;
    this.selectedDesks = value;
  }

  onSelectAllChange(event: any) {
    const checked = event.checked;

    if (checked) {
      this.webService.getDesks('http://localhost:8000/api/hotdesks').subscribe((res: any) => {
        if (res.success) {
          console.log(res);
          this.selectedDesks = res.desks;
          this.selectAll = true;
        }
      });
    } else {
      this.selectedDesks = [];
      this.selectAll = false;
    }
  }
}
