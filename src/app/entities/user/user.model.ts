export interface IUser {
  _id?: string;
  name: string;
  role: string;
  password: string;
}

export class User implements IUser {
  constructor(
    public name: string,
    public role: string,
    public password: string,
    public _id?: string
  ) {
    this._id = _id ? _id : null;
    this.name = name;
    this.password = password;
    this.role = 'user';
  }
}

export class Admin implements IUser {
  constructor(
    public name: string,
    public role: string,
    public password: string,
    public _id?: string
  ) {
    this._id = _id ? _id : null;
    this.name = name;
    this.password = password;
    this.role = 'admin';
  }
}