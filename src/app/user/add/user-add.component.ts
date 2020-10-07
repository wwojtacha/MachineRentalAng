import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageStyler} from '../../utils/message-styler';
import {User} from '../model/user.model';
import {UserRepositoryService} from '../repository-service/user-repository.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  userAddForm: FormGroup;
  isOnEdit = history.state.user !== undefined;
  messageStyler = MessageStyler;
  userMessages: any [] = [];
  user: User = history.state.user;


  constructor(private userRepositoryService: UserRepositoryService) {}

  ngOnInit(): void {

    if (this.isOnEdit) {

      this.userAddForm = new FormGroup({
        username: new FormControl(this.user.username, Validators.required),
        password: new FormControl(this.user.password, Validators.required),
        role: new FormControl(this.user.role, Validators.required),
        email: new FormControl(this.user.email, Validators.required),
      });

    } else {
      this.userAddForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
      });
    }

  }

  onSubmit() {

    const user = new User(
      this.userAddForm.value.username,
      this.userAddForm.value.password,
      this.userAddForm.value.role,
      this.userAddForm.value.email
    );

    if (this.isOnEdit) {
      this.userRepositoryService.updateUser(this.user.id, user).subscribe(
        data => {
          this.userMessages.length = 0;
          this.userMessages.push('User { ' + Object.values(data).splice(1, 1).toString() + ' } has been updated.');
        },
        err => {
          this.userMessages.length = 0;
          const errors = Object.values(err.error);
          for (const error of errors) {
            this.userMessages.push(error);
          }
        }
      );
    } else {
      this.userRepositoryService.createUser(user).subscribe(
        data => {
          this.userMessages.length = 0;
          this.userMessages.push('User { ' + Object.values(data).splice(1, 1).toString() + ' } has been created.');
          this.userAddForm.reset();
        },
        err => {
          this.userMessages.length = 0;
          const errors = Object.values(err.error);
          for (const error of errors) {
            this.userMessages.push(error);
          }
        }
      );
    }
  }

}
