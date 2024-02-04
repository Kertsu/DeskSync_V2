import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  data: any;

  options: any;

  documentStyle!: any;
  textColor!: any;
  textColorSecondary!: any;
  surfaceBorder!: any;

  cardContent!: any[];

  constructor(private socket: Socket, private cdr: ChangeDetectorRef) {
    this.cardContent = [
      { title: 'Users', count: 6, routerLink: '/hdbsv2/manage-users', icon: 'user' },
      { title: 'Reservations', count: 6, routerLink: '/hdbsv2/manage-reservations', icon: 'tablet' },
      { title: 'Desks', count: 6, routerLink: '/hdbsv2/manage-desks', icon: 'desktop'  },
      { title: 'History', count: 6, routerLink: null, icon: 'book'  },
    ];
  }

  ngOnInit() {
    this.documentStyle = getComputedStyle(document.documentElement);
    this.textColor = this.documentStyle.getPropertyValue('--text-color');
    this.textColorSecondary = this.documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    this.surfaceBorder =
      this.documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: this.getNextTwoWeeks(),
      datasets: [
        {
          label: 'Reservation Trend',
          data: [100, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: this.documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: this.textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: this.textColorSecondary,
          },
          grid: {
            color: this.surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: this.textColorSecondary,
          },
          grid: {
            color: this.surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  getNextTwoWeeks() {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDate = new Date();
    const nextTwoWeeks = [];

    for (let i = 0; i < 14; i++) {
      const nextDate = new Date(
        currentDate.getTime() + i * 24 * 60 * 60 * 1000
      );
      const dayOfWeek = daysOfWeek[nextDate.getDay()];
      const dayOfMonth = nextDate.getDate();
      nextTwoWeeks.push(`${dayOfWeek}, ${dayOfMonth}`);
    }

    return nextTwoWeeks;
  }
}
