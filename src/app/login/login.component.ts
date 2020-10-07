import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from './service/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MessageStyler} from '../utils/message-styler';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  username: string;
  password: string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  loginForm: FormGroup;
  userMessages: any[] = [];
  messageStyler = MessageStyler;
  loginSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService) {   }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  // handleLogin() {
  //   this.authenticationService.authenticate(this.username, this.password).subscribe((response) => {
  //     this.invalidLogin = false;
  //     this.loginSuccess = true;
  //     this.successMessage = 'Login Successful.';
  //     this.router.navigate(['/machines']);
  //   }, (error) => {
  //     this.invalidLogin = true;
  //     this.loginSuccess = false;
  //   });
  // }

  onSubmit() {
    // this.isLoading = true;
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.loginSubscription = this.authService.login(username, password).subscribe(
      response => {
        this.authService.authenticate(username, password, response.jwt, 3600);
        this.router.navigate(['/']);
        // this.isLoading = false;
      }, err => {
        // this.toastService.add({key: 'login_error', severity:'error', summary: 'Login Error', detail:`${error.error}`, life: 5000});
        // this.isLoading = false;
        this.userMessages.length = 0;
        const error = err.error.message;
        this.userMessages.push(error);
        setTimeout(() => {
          this.userMessages.length = 0;
        }, 3000);
        // const error = 'Incorrect username or password.'
        // this.userMessages.push(error);

      }
    );
    this.loginForm.reset();
  }

  ngOnDestroy(): void {
    if (this.loginSubscription != null) {
      this.loginSubscription.unsubscribe();
    }
  }
}
