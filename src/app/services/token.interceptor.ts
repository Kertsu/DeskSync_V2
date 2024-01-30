import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
    let token = localStorage.getItem('hdbsv2Token') ?? '';

    request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    })
    return next(request)
}