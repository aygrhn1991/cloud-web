import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilService } from './util.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private util: UtilService,
    private router: Router,
    private notification: NzNotificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ headers: req.headers.set("access_token", this.util.parameterTransfer(localStorage.getItem('access_token'), '')), url: req.url + '?timestamp=' + new Date().getTime() });
    //req = req.clone({ headers: req.headers.set("access_token", this.util.parameterTransfer(localStorage.getItem('access_token'), '')) });
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            this.router.navigate(['/login']);
            break;
          default:
            this.notification.error('系统无响应,请联系开发人员', null);
            break;
        }
        return throwError(error);
      }));
  }

}
