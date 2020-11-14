import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Admin, IUser } from 'src/app/entities/user/user.model';
import { UserService } from 'src/app/entities/user/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  adminLoginForm: FormGroup;
  l_username: string = '';
  l_password: string = '';
  error: boolean = false;
  @Output() loggedInUser = new EventEmitter<IUser>();
  constructor(protected adminService: UserService, protected formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initLoginForm();
  }


  // Init the login form.
  private initLoginForm() {
    this.adminLoginForm = new FormGroup({
      l_username: new FormControl(this.l_username, Validators.required),
      l_password: new FormControl(this.l_password, Validators.required),
    });
  }

  onLogin() {
    const user = new Admin(
      this.adminLoginForm.value['l_username'],
      this.adminLoginForm.value['l_password'],
      null);
    this.adminService.login(user).then((result: IUser) => {
      if (result === undefined) {
        this.error = true;
      } else {
        this.error = false;
        this.loggedInUser.emit(result);
      }
    });
  }
}
