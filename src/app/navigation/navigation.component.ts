import {AfterViewChecked, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {AuthenticationService} from '../login/service/auth.service';
import {Router} from '@angular/router';
import {AuthUserModel} from '../login/model/auth-user.model';
import {UserRepositoryService} from '../user/repository-service/user-repository.service';
import {UserDto} from '../user/model/userdto.model';

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

        if (this.currentUser === null) {
          return;
        }

        this.userRepositoryService.getUser(this.currentUser.username).subscribe((userDto: UserDto) => {
          this.isAdmin = userDto.role === 'ADMIN';
        });
      }
    );
      // if (this.authService.isUserLoggedIn()) {
      //   // this.isUserLoggedIn = true;
      //   this.currentUser = this.authService.getLoggedInUser();
      // }
  }
}
