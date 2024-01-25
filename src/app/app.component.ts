import { Component, ViewChild } from '@angular/core';
import {Sidebar} from 'primeng/sidebar'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'desksyncv2';

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

    closeCallback(e:any): void {
        this.sidebarRef.close(e);
    }

    sidebarVisible: boolean = false;
}
