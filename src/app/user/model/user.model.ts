export class User {

  id: any;
  username: string;
  password: string;
  role: string;
  email: string;


  constructor(username: string, password: string, role: string, email: string) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.email = email;
  }

}
