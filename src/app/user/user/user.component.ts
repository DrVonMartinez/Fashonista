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

  page = 'login'
  user: User;
  username: string = '';
  password: string = '';
  userLoginForm: FormGroup;
  userSignupForm: FormGroup;
  shoppingcart: Array<IProduct>;
  error: boolean = false;

  @Output() addedUser = new EventEmitter<IUser>();
  @Output() loggedInUser = new EventEmitter<IUser>();
  constructor(protected userService: UserService, protected formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initLoginForm();
    this.initSignupForm();
  }

  loadProducts() {
    console.log('loading products')
  }

  onLogin() {
    const user = new User(
      this.userLoginForm.value['name'],
      this.userLoginForm.value['password'],
      null);
    this.userService.login(user).then((result: IUser) => {
      if (result === undefined) {
        this.error = true;
      } else {
        this.error = false;
        this.loggedInUser.emit(result);
      }
    });
  }

  logout(){
    if(this.user !== undefined){
      this.user = undefined;
      return 'login';
    }
  }

  // Manage the submit action and create the new product.
  onSignup() {
    const user = new User(
      this.userSignupForm.value['name'],
      this.userSignupForm.value['password'],
      null);
    this.userService.create(user).then((result: IUser) => {
      if (result === undefined) {
        this.error = true;
      } else {
        this.error = false;
        this.addedUser.emit(result);
      }
    });
  }

  // Hide the error message.
  hideError() {
    this.error = false;
  }

  // Init the login form.
  private initLoginForm() {
    this.userLoginForm = new FormGroup({
      name: new FormControl(this.username, Validators.required),
      password: new FormControl(this.password, Validators.required),
    });
  }

  // Init the sign-up form.
  private initSignupForm() {
    this.userSignupForm = new FormGroup({
      name: new FormControl(this.username, Validators.required),
      password: new FormControl(this.password, Validators.required),
    });
  }
}
