import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {UrlKeeper} from '../../utils/url-keeper';
import {BehaviorSubject} from 'rxjs';
import {AuthUserModel} from '../model/auth-user.model';

interface AuthResponse {
  jwt: string;
}

@Injectable()
// ({
//   providedIn: 'root'
// })
export class AuthenticationService {

  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  username: string;
  password: string;
  headers;
  url = UrlKeeper;
  loggedInUser = new BehaviorSubject<AuthUserModel>(null);


  constructor(private http: HttpClient) {
    // this.headers = new HttpHeaders();
    // this.headers.append('Access-Control-Headers', 'Authorization');
  }

  login(username: string, password: string) {
    // return this.http.post('http://localhost:8080/login',
    //   { body: {username, password},
    //     headers: { authorization: this.createBasicAuthToken(username, password) }
    //   }).pipe(map((response) => {
    //   this.username = username;
    //   this.password = password;
    //   this.registerSuccessfulLogin(username, password);
    // }));

    const payload = {
      username,
      password,
    };
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8'
    });
    const options = {
      headers: httpHeaders
    };
    return this.http.post<AuthResponse>(this.url.AUTHENTICATE, payload, options);
  }

  // createBasicAuthToken(username: string, password: string) {
  //   return 'Basic ' + window.btoa(username + ':' + password);
  // }
  //
  // registerSuccessfulLogin(username, password) {
  //   sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
  // }
  //
  logout() {
    this.loggedInUser.next(null);
    localStorage.removeItem('authenticatedUser');
    // this.username = null;
    // this.password = null;
  }
  //
  // isUserLoggedIn() {
  //   const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
  //   return user !== null;
  // }
  //
  // getLoggedInUserName() {
  //   const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
  //   if (user === null) {
  //     return '';
  //   }
  //   return user;
  // }

  public isUserLoggedIn() {
    const user = this.getLoggedInUser();
    return user !== null;
  }

  public getLoggedInUser(): AuthUserModel {
    return this.loggedInUser.getValue();
  }

  authenticate(username: string, password: string, token: string, expiresIn: number) {
    // console.log(token);
    const userId = +this.extractId(token);
    const expiresIn2 = +this.extractExpiresIn(token) * 1000;
    const expirationDate = new Date((new Date()).getTime() + expiresIn2);
    const authUser = new AuthUserModel(userId, username, password, token, expirationDate);
    this.loggedInUser.next(authUser);
    // this.autoLogout(expiresIn2);
    localStorage.setItem('authenticatedUser', JSON.stringify(authUser));
  }

  private extractId(jwt: string) {
    const jwtData = jwt.split('.')[1];
    const decodedJwtJsonData = window.atob(jwtData);
    const decodedJwtData = JSON.parse(decodedJwtJsonData);
    return decodedJwtData.sub;
  }

  private extractExpiresIn(jwt: string) {
    const jwtData = jwt.split('.')[1];
    const decodedJwtJsonData = window.atob(jwtData);
    const decodedJwtData = JSON.parse(decodedJwtJsonData);
    return +decodedJwtData.exp - +decodedJwtData.iat;
  }
}
