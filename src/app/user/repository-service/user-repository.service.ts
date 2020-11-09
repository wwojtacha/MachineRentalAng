import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UrlKeeper} from '../../utils/url-keeper';
import {User} from '../model/user.model';
import {UserDto} from "../model/userdto.model";

@Injectable()
export class UserRepositoryService {

  url = UrlKeeper;

  constructor(private http: HttpClient) {}

  createUser(user: User) {
    return this.http.post(this.url.USERS, user);
  }

  getUsers(params: HttpParams) {
    return this.http.get(this.url.USERS, {params});
  }

  getAllUsers() {
    return this.http.get(this.url.USERS);
  }

  getUser(username: string) {
    return this.http.get(this.url.USERS + username);
  }

  updateUserWithoutPasswordChange(id: number, userDto: UserDto) {
    return this.http.put(this.url.USERS + 'withoutPassword/' + id, userDto);
  }

  updateUserWithPasswordChange(id: number, user: User) {
    return this.http.put(this.url.USERS + 'withPassword/' + id, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.url.USERS + id);
  }
}
