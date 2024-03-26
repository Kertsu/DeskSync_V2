import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-manage-reservations',
  templateUrl: './manage-reservations.component.html',
  styleUrl: './manage-reservations.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ManageReservationsComponent {
  reservationDialog: boolean = false;

  checked = new FormControl();

  reservations: any[] = [
    {
      id: '65c899a350ab95ded5945bdc',
      user: 'Kurtd Daniel Bigtas',
      deskNumber: 24,
      date:  '2024-02-22T00:00:00.000Z',
      startTime: '2024-02-22T00:00:00.000Z',
      endTime: '2024-02-22T09:00:00.000Z',
      status: 'PENDING',
      mode: 0,
      createdAt: '2024-02-11T09:55:47.820Z',
      updatedAt: '2024-02-11T09:55:47.820Z',
      __v: 0,
    },
    {
      id: '65c899ba50ab95ded5945bfd',
      user: 'Kurtd Daniel Bigtas',
      deskNumber: 80,
      date:  '2024-02-25T00:00:00.000Z',
      startTime: '2024-02-25T00:00:00.000Z',
      endTime: '2024-02-25T09:00:00.000Z',
      status: 'APPROVED',
      mode: 0,
      createdAt: '2024-02-11T09:56:10.185Z',
      updatedAt: '2024-02-11T09:56:10.185Z',
      __v: 0,
    },
    {
      id: '65c899cb50ab95ded5945c13',
      user: 'Kurtd Daniel Bigtas',
      deskNumber: 46,
      date:  '2024-02-19T00:00:00.000Z',
      startTime: '2024-02-19T00:00:00.000Z',
      endTime: '2024-02-19T09:00:00.000Z',
      status: 'STARTED',
      mode: 0,
      createdAt: '2024-02-11T09:56:27.906Z',
      updatedAt: '2024-02-11T09:56:27.906Z',
      __v: 0,
    },
  ];

  reservation!: any;

  selectedReservations!: any[] | null;

  submitted: boolean = false;

  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
  
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  openNew() {
    this.reservation = {};
    this.submitted = false;
    this.reservationDialog = true;
  }

  deleteSelectedReservations() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to reject the selected reservations?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.reservations = this.reservations.filter(
          (val) => !this.selectedReservations?.includes(val)
        );
        this.selectedReservations = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Reservations Rejected',
          life: 3000,
        });
      },
    });
  }

  editReservation(reservation: any) {
    this.reservation = { ...reservation };
    this.reservationDialog = true;
  }

  deleteReservation(reservation: any) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to reject this reservation?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.reservations = this.reservations.filter(
          (val) => val.id !== reservation.id
        );
        this.reservation = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Reservation Rejected',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.reservationDialog = false;
    this.submitted = false;
  }

  saveReservation() {
    this.submitted = true;

    if (this.reservation.name?.trim()) {
      if (this.reservation.id) {
        this.reservations[this.findIndexById(this.reservation.id)] =
          this.reservation;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Reservation Updated',
          life: 3000,
        });
      } else {
        this.reservation.id = this.createId();
        this.reservation.image = 'reservation-placeholder.svg';
        this.reservations.push(this.reservation);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Reservation Created',
          life: 3000,
        });
      }

      this.reservations = [...this.reservations];
      this.reservationDialog = false;
      this.reservation = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.reservations.length; i++) {
      if (this.reservations[i].id === id) {
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

  getImage(reservation:any){
    return `../../assets/images/map/individual/${reservation.deskNumber}.png`
  }
}
