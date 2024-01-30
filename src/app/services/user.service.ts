import { Injectable } from '@angular/core';

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

  constructor() { }

  setUser(user:User){
    localStorage.setItem('hdbsv2User', JSON.stringify(user))
    localStorage.setItem('hdbsv2Token', user.token)
  }

  getUser(){
    return localStorage.getItem('hdbsv2User') || null
  }

  logout(){
    localStorage.removeItem('hdbsv2User')
    localStorage.removeItem('hdbsv2Token')
  }
}
