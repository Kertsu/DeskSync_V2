import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  baseUserURL: string = "http://localhost:8000/api/users"
  constructor(private http: HttpClient) { }

  onLoginUser(userData: any ){
    return this.http.post(`${this.baseUserURL}/login`, userData)
  }

  getSelf(){
    return this.http.get(`${this.baseUserURL}/self`)
  }
}
