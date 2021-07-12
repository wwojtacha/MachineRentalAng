import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../login/service/auth.service';
import {Router} from '@angular/router';
import {AuthUserModel} from '../login/model/auth-user.model';
import {TranslationService} from '../translation/translation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  currentUser: AuthUserModel = null;

  constructor(private authService: AuthenticationService,
              private router: Router,
              public translationService: TranslationService) {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);

  }

  ngOnInit() {
    this.authService.loggedInUser.subscribe(
      (authUser) => {
        this.currentUser = authUser;

        if (this.currentUser === null) {
          return;
        }
      }
    );
  }
}
