import {Component, OnInit} from '@angular/core';
import {User} from '../model/user.model';
import {FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {UserRepositoryService} from '../repository-service/user-repository.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userListForm: FormGroup;
  users = new BehaviorSubject<User[]>(null);

  constructor(private userRepositoryService: UserRepositoryService,
              private router: Router) {}

  ngOnInit(): void {
    this.userListForm = new FormGroup({
      username: new FormControl(''),
      role: new FormControl(''),
      email: new FormControl('')
    });
  }

  onEditUser(user: User) {
    this.router.navigateByUrl('user-add/', {state : {user}});
  }

  onSearch() {

    const params = new HttpParams({
      fromObject: {
        username: this.userListForm.value.username,
        role: this.userListForm.value.role,
        email: this.userListForm.value.email,
      }
    });

    this.userRepositoryService.getAllUsers().subscribe((response: User[]) => {
      this.users.next(response);
    });

  }
}
