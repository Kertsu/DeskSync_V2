import {  inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard : CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const router = inject(Router)

  if (userService.isLoggedIn()){
    router.navigate(['/hdbsv2'])
    return false
  } else {
    return true
  }

};

export const guestGuard : CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (!userService.isLoggedIn()){
    router.navigate(['/login'])
    return false
  } else {
    return true
  }
}

export const hasAccess : CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.getUser().role == 'admin' || userService.getUser().role == 'om'|| userService.getUser().role == 'superadmin'){
    return true
  } else {
    router.navigate(['**'])
    return false
  }
}

export const isAdmin : CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.getUser().role == 'admin' || userService.getUser().role == 'superadmin'){
    return true
  } else {
    router.navigate(['**'])
    return false
  }
}