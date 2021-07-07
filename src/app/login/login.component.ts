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

  onSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.loginSubscription = this.authService.login(username, password).subscribe(
      response => {
        this.authService.authenticate(username, password, response.jwt, 3600);
        this.router.navigate(['/home']);
      }, err => {
        this.userMessages.length = 0;

        if (err.error.message === undefined) {
          this.userMessages.push("Connection error. Check if backend server is operational.");
        } else {
          const error = err.error.message;
          this.userMessages.push(error);
        }

        setTimeout(() => {
          this.userMessages.length = 0;
        }, 3000);
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
