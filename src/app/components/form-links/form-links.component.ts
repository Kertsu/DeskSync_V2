import { Component } from '@angular/core';

@Component({
  selector: 'app-form-links',
  templateUrl: './form-links.component.html',
  styleUrl: './form-links.component.css'
})
export class FormLinksComponent {
  lis = [
    { label: 'Terms', routerLink: '/terms' },
    { label: 'Features', routerLink: '/features' },
    { label: 'Privacy', routerLink: '/privacy' },
    { label: 'About', routerLink: '/about' },
    { label: 'Contact', routerLink: '/contact' },
    { label: 'API', routerLink: '/api' }
];
}
