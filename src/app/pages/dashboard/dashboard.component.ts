import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Socket } from 'ngx-socket-io';
import { FormControl } from '@angular/forms';

interface ActiveUser {
  id: string;
  username: string;
  avatar: string;
  email: string;
  role: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit{
  data: any;

  options: any;

  documentStyle!: any;
  textColor!: any;
  textColorSecondary!: any;
  surfaceBorder!: any;

  cardContent!: any[];

  date = new FormControl();

  recentActivities: any[] = []

  activeUsers: ActiveUser[] = [{"id":"65b480cd73497b0eecac836b","username":"Kertsu","email":"kurtddanielbigtas@student.laverdad.edu.ph","role":"superadmin","avatar":"http://res.cloudinary.com/drlztlr1m/image/upload/v1706356600/hzomg9luobx6v8lvxdng.jpg"}, {"id":"65be6e9e31c19ca1cf414b9f","username":"johnmarkfaeldonia","email":"johnmarkfaeldonia@student.laverdad.edu.ph","role":"user","avatar":"http://res.cloudinary.com/drlztlr1m/image/upload/v1706979188/oxbsppubd3rsabqwfxsr.jpg"}, {"id":"65be7149289699e84d2b9a56","username":"jirehbelen","email":"jirehbelen@student.laverdad.edu.ph","role":"user","avatar":"http://res.cloudinary.com/drlztlr1m/image/upload/v1706979188/oxbsppubd3rsabqwfxsr.jpg"}]

  // activeUsers: ActiveUser[] = []

  constructor(private socket: Socket, private cdr: ChangeDetectorRef) {

    this.recentActivities = [{
      "_id": {
        "$oid": "658f9035e2c5e80245651d14"
      },
      "user": null,
      "email": "marjorieanito@student.laverdad.edu.ph",
      "actionType": "Login",
      "actionDetails": "Login failed",
      "ipAddress": "64.224.122.135",
      "status": "failure",
      "additionalContext": "Invalid credentials",
      "createdAt":  "2023-12-30T03:36:21.836Z"
      ,
      "updatedAt": "2023-12-30T03:36:21.836Z"
      ,
      "__v": 0
    }, {
      "_id": {
        "$oid": "658f9038e2c5e80245651d17"
      },
      "user": null,
      "email": "marjorieanito@student.laverdad.edu.ph",
      "actionType": "Login",
      "actionDetails": "Login failed",
      "ipAddress": "64.224.122.135",
      "status": "failure",
      "additionalContext": "Invalid credentials",
      "createdAt":"2023-12-30T03:36:24.274Z"
      ,
      "updatedAt":"2023-12-30T03:36:24.274Z"
      ,
      "__v": 0
    },
    {
      "_id": {
        "$oid": "658f96f83a3771b3440c406a"
      },
      "user": {
        "$oid": "65671517eec8a4d2d7c7cf56"
      },
      "email": "kurtddbigtas@gmail.com",
      "actionType": "Logout",
      "actionDetails": "kd logged out",
      "ipAddress": "64.224.99.19",
      "status": "success",
      "createdAt":"2023-12-30T04:05:12.814Z"
      ,
      "updatedAt":"2023-12-30T04:05:12.814Z"
      ,
      "__v": 0
    },
    {
      "_id": {
        "$oid": "658f96f83a3771b3440c406a"
      },
      "user": {
        "$oid": "65671517eec8a4d2d7c7cf56"
      },
      "email": "kurtddbigtas@gmail.com",
      "actionType": "Logout",
      "actionDetails": "kd logged out",
      "ipAddress": "64.224.99.19",
      "status": "success",
      "createdAt":"2023-12-30T04:05:12.814Z"
      ,
      "updatedAt":"2023-12-30T04:05:12.814Z"
      ,
      "__v": 0
    }]


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
          data: [2, 59, 80, 81, 56, 55, 40],
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

  getSeverity(status: string){
    switch(status){
      case "failure":
        return 'danger';
      case "success": 
        return 'success'
      default: 
        return 
    }
  }
}
