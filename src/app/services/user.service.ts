import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User{
  id: string
  role: string
  email: string
  username: string
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router) { }

  setUser(user:User){
    localStorage.setItem('hdbsv2User', JSON.stringify(user))
    localStorage.setItem('hdbsv2Token', user.token)
  }

  getUser(){
    return JSON.parse((localStorage.getItem('hdbsv2User') || null) as string) 
  }

  logout(){
    localStorage.removeItem('hdbsv2User')
    localStorage.removeItem('hdbsv2Token')

    this.router.navigate(['/login'])
  }
}
