import { Component } from '@angular/core';
import { NavigationService } from '../../shared/navigation.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

  constructor(protected navigationService: NavigationService){

  }

  
}
