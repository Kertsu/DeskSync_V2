import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageSubject = new BehaviorSubject<Message[]>([])

  constructor() {
  }

  addMessage(severity: string, detail: string, summary: string, life?:number): void {
    const message = {
      severity,
      detail,
      summary,
      life : 3000
    }
    this.messageSubject.next([message])
  }

  onAddMessage(): Observable<Message[]>{
    return this.messageSubject.asObservable()
  }
}
