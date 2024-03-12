import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private online$: BehaviorSubject<boolean>;

  constructor() {
    this.online$ = new BehaviorSubject<boolean>(navigator.onLine);
    window.addEventListener('online', () => this.updateNetworkStatus());
    window.addEventListener('offline', () => this.updateNetworkStatus());
  }

  private updateNetworkStatus() {
    this.online$.next(navigator.onLine);
  }

  isOnline(): Observable<boolean> {
    return this.online$.asObservable();
  }
}
