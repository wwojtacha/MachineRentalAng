export class UserDto {

  id: number;
  username: string;
  userRole: string;
  email: string;


  constructor(username: string, role: string, email: string) {
    this.username = username;
    this.userRole = role;
    this.email = email;
  }

}
