  import { Component, OnInit } from '@angular/core';
  import { Socket } from 'ngx-socket-io';
  @Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
  })
  export class DashboardComponent{
    
    constructor(private socket:  Socket){}

    ngOnInit(): void {

      this.socket.fromEvent('push-notif').subscribe({
        next: (res:any) => {
          console.log(res);
        }
      })


     this.socket.connect(() => {
      console.log('connected')
     })
    }

    sendMessage(){
      console.log('clicked')
      this.socket.emit('messages', 'heeeey')
    }
  }
