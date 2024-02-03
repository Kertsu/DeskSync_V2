import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
  @Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
  })
  export class DashboardComponent implements OnInit{
    data: any;

    options: any;

    documentStyle!:any; 
    textColor!: any; 
    textColorSecondary!: any;
    surfaceBorder!: any; 

    ngOnInit() {
        this.documentStyle = getComputedStyle(document.documentElement);
        this.textColor = this.documentStyle.getPropertyValue('--text-color');
        this.textColorSecondary =  this.documentStyle.getPropertyValue('--text-color-secondary');
        this.surfaceBorder =this.documentStyle.getPropertyValue('--surface-border');

        this.data = {
            labels: this.getNextSixMonths(),
            datasets: [
                {
                    label: 'Reservation Trend',
                    data: [100, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: this.documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: this.textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: this.textColorSecondary
                    },
                    grid: {
                        color: this.surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: this.textColorSecondary
                    },
                    grid: {
                        color: this.surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    getNextSixMonths() {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const currentDate = new Date();
      const currentMonthIndex = currentDate.getMonth();
      const nextSixMonths = [];
  
      for (let i = 0; i < 6; i++) {
          const nextMonthIndex = (currentMonthIndex + i) % 12;
          nextSixMonths.push(months[nextMonthIndex]);
      }
  
      return nextSixMonths;
  }
  }
