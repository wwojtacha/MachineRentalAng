export class AuthUserModel {

  id: number;
  username: string;
  password: string;
  private token?: string;
  expirationDate: Date;


  constructor(id: number, username: string, password: string, token: string, expirationDate: Date) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.token = token;
    this.expirationDate = expirationDate;
  }

  getToken() {
    if (!this.expirationDate || new Date() > this.expirationDate) {
      return null;
    }
    return this.token;
  }
}
