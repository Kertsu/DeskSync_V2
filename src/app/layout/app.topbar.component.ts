import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { UiService } from '../services/ui.service';
import { UserService } from '../services/user.service';
import { SocketService } from '../services/socket.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    isDark:boolean = false;

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private uiService:UiService, private userService: UserService, private socketService: SocketService) { }

    changeTheme(theme: string){
        this.uiService.switchTheme(theme);
        this.isDark = !this.isDark
    }

    logout(){
        this.socketService.emit('die',{})
        this.userService.logout();
    }
}
