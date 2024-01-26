import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e:any): void {
      this.sidebarRef.close(e);
  }
  
  ngOnInit(): void {
    this.checkScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenWidth();
  }

  checkScreenWidth(): void {
    const screenWidth = window.innerWidth;

    // Adjust the threshold based on your requirements
    if (screenWidth >= 912) {
      this.modal = false;
      this.sidebarVisible = true;
    } else {
      // You can set different values if the screen width is less than 640px
      this.modal = true;
      this.sidebarVisible = false;
    }
  }
  

  sidebarVisible: boolean = true;
  modal: boolean = false;
}
