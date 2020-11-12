export interface IProduct {
  _id?: string;
  name: string;
  brand: string;
}

export class Product implements IProduct {
  constructor(
    public name: string,
    public brand: string,
    public email: string,
    public price: string,
    public availibility: string,
    public _id?: string
  ) {
    this._id = _id ? _id : null;
    this.name = name;
    this.brand = brand;
    this.email = email;
    this.price = price;
    this.availibility = availibility;
  }
}