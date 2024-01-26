import { Component, ViewChild } from '@angular/core';
import { Message } from 'primeng/api'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  messages!: Message[]

}
