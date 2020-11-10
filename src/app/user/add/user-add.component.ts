import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageStyler} from '../../utils/message-styler';
import {User} from '../model/user.model';
import {UserRepositoryService} from '../repository-service/user-repository.service';
import {UserDto} from '../model/userdto.model';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  userAddForm: FormGroup;
  isOnEdit = history.state.userDto !== undefined;
  messageStyler = MessageStyler;
  userMessages: any [] = [];
  userDto: UserDto = history.state.userDto;
  isPasswordToBeChanged = false;


  constructor(private userRepositoryService: UserRepositoryService) {}

  ngOnInit(): void {

    if (this.isOnEdit) {

        this.userAddForm = new FormGroup({
          username: new FormControl(this.userDto.username, Validators.required),
          password: new FormControl('does not matter', Validators.required),
          role: new FormControl(this.userDto.userRole, Validators.required),
          email: new FormControl(this.userDto.email, Validators.required),
        });

    } else {
      this.userAddForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
      });

      this.isPasswordToBeChanged = true;
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

      if (this.isPasswordToBeChanged) {
        this.userRepositoryService.updateUserWithPasswordChange(this.userDto.id, user).subscribe(
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

        const userDto = new UserDto(
          this.userAddForm.value.username,
          this.userAddForm.value.role,
          this.userAddForm.value.email
        );

        this.userRepositoryService.updateUserWithoutPasswordChange(this.userDto.id, userDto).subscribe(
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
      }

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

  enablePasswordChange() {

    if (this.isPasswordToBeChanged) {
      this.isPasswordToBeChanged = false;
    } else {
      this.isPasswordToBeChanged = true;
      this.userAddForm.patchValue({
        password: ''
      });
    }
  }
}
