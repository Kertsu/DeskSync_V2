// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { BookService } from '../services/book.service';

// export const bookGuard: CanActivateFn = (route, state) => {
//   const bookService = inject(BookService)
//   const router = inject(Router)

//   if (bookService.areaSignal() === null || bookService.areaSignal() === undefined ){
//     router.navigate(['hdbs/book/office-area'])
//     return false
//   }
//   return true
// };

// export const bookGuardStep2: CanActivateFn = (route, state) => {
//   const bookService = inject(BookService)
//   const router = inject(Router)

//   const [desk, date] = bookService.reservationSignal()

//   if (desk === undefined || date === undefined || desk === null || date === null) {
//     router.navigate(['hdbs/book/desk-area'])
//     return false;
//   }

//   return true;
// }