import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-manage-desk-unavailabilities',
  templateUrl: './manage-desk-unavailabilities.component.html',
  styleUrl: './manage-desk-unavailabilities.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ManageDeskUnavailabilitiesComponent {
  unavailabilityDialog: boolean = false;

  unavailabilities: any[] = [
    {
      id: '65cad887423b8195ad76eb15',
      user: '65671517eec8a4d2d7c7cf56',
      deskNumber: 1,
      date: '2024-02-26T00:00:00.000Z',
      startTime: '2024-02-26T00:00:00.000Z',
      endTime: '2024-02-26T09:00:00.000Z',
      status: 'PENDING',
      mode: 1,
      __v: 0,
    },
    {
      id: '65cad87f423b8195ad76eb0b',
      user: '65671517eec8a4d2d7c7cf56',
      deskNumber: 1,
      date: '2024-02-28T00:00:00.000Z',
      startTime: '2024-02-28T00:00:00.000Z',
      endTime: '2024-02-28T09:00:00.000Z',
      status: 'PENDING',
      mode: 1,
      __v: 0,
    },
  ];

  unavailability!: any;

  selectedUnavailabilities!: any[] | null;

  submitted: boolean = false;

  roles!: any[];

  form = this.fb.group({
    unavailabilityname: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(/@(student\.laverdad\.edu\.ph|laverdad\.edu\.ph)$/),
      ],
    ],
  });

  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.roles = [
      { label: 'Admin', value: 'admin' },
      { label: 'Unavailability', value: 'unavailability' },
      { label: 'Office Manager', value: 'om' },
    ];
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  openNew() {
    this.unavailability = {};
    this.submitted = false;
    this.unavailabilityDialog = true;
  }

  deleteSelectedUnavailabilities() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected unavailabilities?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.unavailabilities = this.unavailabilities.filter(
          (val) => !this.selectedUnavailabilities?.includes(val)
        );
        this.selectedUnavailabilities = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Unavailabilities Deleted',
          life: 3000,
        });
      },
    });
  }

  editUnavailability(unavailability: any) {
    this.form.patchValue({
      unavailabilityname: unavailability.unavailabilityname,
      email: unavailability.email,
    });

    this.unavailability = { ...unavailability };
    this.unavailabilityDialog = true;
  }

  deleteUnavailability(unavailability: any) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' +
        unavailability.unavailabilityname +
        '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.unavailabilities = this.unavailabilities.filter(
          (val) => val.id !== unavailability.id
        );
        this.unavailability = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Unavailability Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.unavailabilityDialog = false;
    this.submitted = false;
  }

  saveUnavailability() {
    this.submitted = true;

    if (this.unavailability.name?.trim()) {
      if (this.unavailability.id) {
        this.unavailabilities[this.findIndexById(this.unavailability.id)] =
          this.unavailability;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Unavailability Updated',
          life: 3000,
        });
      } else {
        this.unavailability.id = this.createId();
        this.unavailability.image = 'unavailability-placeholder.svg';
        this.unavailabilities.push(this.unavailability);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Unavailability Created',
          life: 3000,
        });
      }

      this.unavailabilities = [...this.unavailabilities];
      this.unavailabilityDialog = false;
      this.unavailability = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.unavailabilities.length; i++) {
      if (this.unavailabilities[i].id === id) {
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

  getImage(unavailability:any){
    
    return `../../assets/images/map/individual/${unavailability.deskNumber}.png`
  }
}
