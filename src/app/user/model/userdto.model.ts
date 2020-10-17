export class UserDto {

  username: string;
  role: string;
  email: string;


  constructor(username: string, role: string, email: string) {
    this.username = username;
    this.role = role;
    this.email = email;
  }

}
