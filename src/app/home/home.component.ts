import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../login/service/auth.service';
import {Router} from '@angular/router';
import {AuthUserModel} from '../login/model/auth-user.model';
import {UserRepositoryService} from '../user/repository-service/user-repository.service';
import {UserDto} from '../user/model/userdto.model';
import {TranslationService} from '../translation/translation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: AuthUserModel = null;
  isAdmin = false;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private userRepositoryService: UserRepositoryService,
              public translationService: TranslationService) {}

  ngOnInit() {
    this.authService.loggedInUser.subscribe(
      (authUser) => {
        this.currentUser = authUser;

        if (this.currentUser === null) {
          return;
        }

        this.userRepositoryService.getUser(this.currentUser.username).subscribe((userDto: UserDto) => {
          this.isAdmin = userDto.userRole === 'ADMIN';
        });
      }
    );
  }
}
