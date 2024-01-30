import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, private userService: UserService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['dashboard'] },
                    { label: 'Book', icon: 'pi pi-fw pi-book', routerLink: ['book'] },
                    { label: 'Logs', icon: 'pi pi-fw pi-comments', routerLink: ['logs'] },
                    {
                        label: 'Manage',
                        icon: 'pi pi-fw pi-cog',
                        items: [
                            {
                                label: 'Users',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['manage-users']
                            },
                            {
                                label: 'Reservations',
                                icon: 'pi pi-fw pi-book',
                                routerLink: ['manage-reservations']
                            },
                            {
                                label: 'Desks',
                                icon: 'pi pi-fw pi-desktop',
                                routerLink: ['manage-desks']
                            },
                            {
                                label: 'Unavailabilites',
                                icon: 'pi pi-fw pi-ban',
                                routerLink: ['manage-unavailabilities']
                            },
                        ]
                    },
                ]
            },
            {
                label: 'Application',
                items: [
                    {
                        label: 'Support',
                        icon: 'pi pi-fw pi-question-circle',
                        items: [
                            {
                                label: 'FAQs',
                                icon: 'pi pi-fw pi-question',
                                routerLink: ['faqs']
                            },
                            {
                                label: 'Guides',
                                icon: 'pi pi-fw pi-tablet',
                                routerLink: ['guides']
                            },
                        ]
                    },
                ]
            },
            {
                label: 'Account',
                items: [
                    { label: 'My profile', icon: 'pi pi-fw pi-user', routerLink: ['profile'], badge: 'NEW' },
                    { label: 'Logout', icon: 'pi pi-fw pi-sign-out', onclick: this.userService.logout},
                ]
            },
        ];
    }

}
