import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  baseUserURL: string = 'http://localhost:8000/api/users';
  baseHotdeskURL: string = 'http://localhost:8000/api/hotdesks';

  constructor(private http: HttpClient) {}

  onLoginUser(userData: any) {
    return this.http.post(`${this.baseUserURL}/login`, userData);
  }

  onForgotPassword(email: string){
    return this.http.post(`${this.baseUserURL}/forgot-password`, {email});
  }

  getSelf() {
    return this.http.get(`${this.baseUserURL}/self`);
  }

  getNotifications(skip: number) {
    const limit = skip;

    const page = Math.floor(skip / limit) + 1;
    return this.http.get(`${this.baseUserURL}/self/notifications?page=${page}&limit=${limit}`);
  }


  getUsers(params?: any)
  {
    return this.http.get(`${this.baseUserURL}`, {params})
  }


  getDesks(params?:any){
    return this.http.get(`${this.baseHotdeskURL}`, {params})
  }
}
