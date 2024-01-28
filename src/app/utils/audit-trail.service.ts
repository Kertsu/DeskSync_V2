import { Injectable } from '@angular/core';
import { WebService } from '../services/web.service';

@Injectable({
  providedIn: 'root'
})
export class AuditTrailService {

  constructor(private webService: WebService) { }


  createAuditTrail(data: {email?: any, actionType: string, actionDetails: string, status:string, additionalContext?: string }){
    // this.webService.createTrail(data).subscribe({
    //   next: (res: any) =>
    //   {
    //     console.log(res)
    //   }, error: error => {

    //   }, complete() {
          
    //   },
    // })
  }
}
