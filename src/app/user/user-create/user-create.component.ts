import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser, User } from 'src/app/entities/user/user.model';
import { UserService } from 'src/app/entities/user/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userLoginForm: FormGroup;
  userSignupForm: FormGroup;

  @Output() loggedInUser = new EventEmitter<IUser>();
  l_username: string = ''; 
  l_password: string = '';
  s_username: string = ''; 
  s_password: string = '';
  error: boolean = false;
  constructor(protected userService: UserService, protected formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initLoginForm()
    this.initSignupForm()
  }

  onLogin() {
    const user = new User(
      this.userLoginForm.value['l_username'],
      this.userLoginForm.value['l_password'],
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

  // Manage the submit action and create the new user.
  onSignup() {
      const user = new User(
      this.userSignupForm.value['s_username'],
      this.userSignupForm.value['s_password'],
      [],
      null);
    this.userService.create(user).then((result: IUser) => {
      if (result === undefined) {
        this.error = true;
      } else {
        this.error = false;
        this.loggedInUser.emit(result);
      }
    });
  }

  // Init the login form.
  private initLoginForm() {
    this.userLoginForm = new FormGroup({
      l_username: new FormControl(this.l_username, Validators.required),
      l_password: new FormControl(this.l_password, Validators.required),
    });
  }

  // Init the sign-up form.
  private initSignupForm() {
    this.userSignupForm = new FormGroup({
      s_username: new FormControl(this.s_username, Validators.required),
      s_password: new FormControl(this.s_password, Validators.required),
    });
  }

}
