import {AfterViewChecked, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {AuthenticationService} from '../login/service/auth.service';
import {Router} from '@angular/router';
import {AuthUserModel} from '../login/model/auth-user.model';
import {UserRepositoryService} from '../user/repository-service/user-repository.service';
import {User} from '../user/model/user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  // isUserLoggedIn = false;
  currentUser: AuthUserModel = null;
  isAdmin = false;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private userRepositoryService: UserRepositoryService) {}

  onLogout() {
    this.authService.logout();

    this.isAdmin = false;
    this.router.navigate(['/']);

  }

  ngOnInit() {
    this.authService.loggedInUser.subscribe(
      (authUser) => {
        this.currentUser = authUser;

        this.userRepositoryService.getAllUsers().subscribe((users: User[]) => {
          for (const user of users) {
            if (this.currentUser != null && user.username === this.currentUser.username && user.role === 'ADMIN') {
              this.isAdmin = true;
              break;
            }
          }
        });
      }
    );
      // if (this.authService.isUserLoggedIn()) {
      //   // this.isUserLoggedIn = true;
      //   this.currentUser = this.authService.getLoggedInUser();
      // }
  }
}
