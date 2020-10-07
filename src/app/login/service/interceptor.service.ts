import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthenticationService} from './auth.service';
import {exhaustMap, take} from 'rxjs/operators';
import {AuthUserModel} from '../model/auth-user.model';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   if (this.authenticationService.isUserLoggedIn() && req.url.indexOf('basicauth') === -1) {
  //     const authReq = req.clone({
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         Authorization: `Basic ${window.btoa(this.authenticationService.username + ':' + this.authenticationService.password)}`
  //       })
  //     });
  //     return next.handle(authReq);
  //   } else {
  //     return next.handle(req);
  //   }
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.loggedInUser.pipe(
      take(1),
      exhaustMap(
        (user: AuthUserModel) => {
          if (!user) {
            return next.handle(req);
          }
          const modifiedReq = req.clone({headers: new HttpHeaders().set('Authorization', 'Bearer ' + user.getToken())});
          return next.handle(modifiedReq);
        }));
  }
}
