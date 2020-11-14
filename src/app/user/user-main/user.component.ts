import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/entities/product/product.model';
import { IUser, User } from 'src/app/entities/user/user.model';
import { UserService } from 'src/app/entities/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  page:string;
  user: User;
  shoppingcart: Array<IProduct> = [];
  error: boolean = false;

  @Output() loggedInUser = new EventEmitter<IUser>();
  constructor(protected userService: UserService, protected formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.user = undefined
    this.page = 'login';
  }

  loadProducts() {
    console.log('loading products')
  }

  // Hide the error message.
  hideError() {
    this.error = false;
  }

  logout(){
    if(this.user !== undefined){
      this.user = undefined;
      return 'login';
    }
  }

  onLogin(user: User){
    this.user = user;
    this.page = 'shop'
    this.loggedInUser.emit(user);
  }

}
