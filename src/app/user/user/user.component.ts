import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/entities/product/product.model';
import { IUser } from 'src/app/entities/user/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  title = 'Fashionista';
  status = 'DOWN';
  users: IUser = null
  page = 'login'
  user: IUser = null;
  userLoginForm;
  userSignupForm;
  shoppingcart: Array<IProduct>;
  
  constructor() { }

  ngOnInit(): void {
    this.shoppingcart = []
  }

  loadProducts(){
    console.log('loading products')
  }

  onSubmit(){
    console.log(this.userLoginForm)
  }
  
  signup(){
    console.log(this.userSignupForm)
  }
}
