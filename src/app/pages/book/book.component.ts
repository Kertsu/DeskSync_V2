import { Component } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  items: any[] = [];

  constructor() {
    this.items = [
      {
        label: 'Office Area',
        routerLink: 'office-area',
      },
      {
        label: 'Desk Area',
        routerLink: 'desk-area',
      },
      {
        label: 'Confirmation',
        routerLink: 'confirmation',
      },
    ];
  }
}
