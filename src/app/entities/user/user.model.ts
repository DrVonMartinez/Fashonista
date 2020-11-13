import { IProduct } from '../product/product.model';

export interface IUser {
  _id?: string;
  name: string;
  role: string;
  password: string;
}

export class User implements IUser {
  public role: string;
  constructor(
    public name: string,
    public password: string,
    public shoppingCart: Array<IProduct>,
    public _id?: string
  ) {
    this._id = _id ? _id : null;
    this.name = name;
    this.password = password;
    this.role = 'user';
    this.shoppingCart = shoppingCart
  }
}

export class Admin implements IUser {
  public role: string;
  constructor(
    public name: string,
    public password: string,
    public _id?: string
  ) {
    this._id = _id ? _id : null;
    this.name = name;
    this.password = password;
    this.role = 'admin';
  }
}