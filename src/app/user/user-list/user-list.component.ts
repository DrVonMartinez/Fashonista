import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserService } from 'src/app/entities/user/user.service';
import { Admin, IUser, User } from 'src/app/entities/user/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnChanges {

  users: Array<User> = [];
  admins: Array<Admin> = [];
  @Input() userToDisplay: IUser = null;

  constructor(protected userService: UserService) { }

  // Load all the users when starting the view.
  ngOnInit(): void {
    this.loadAll();
  }

  // If new user created, we add it to the list.
  ngOnChanges(): void {
    if (this.userToDisplay !== null) {
      if (this.userToDisplay.role === 'user'){
        this.users.push(new User(
          this.userToDisplay.name,
          this.userToDisplay.password,
          [],
          this.userToDisplay._id
          ));
      }
      else if (this.userToDisplay.role === 'admin'){
        this.admins.push(new Admin(
          this.userToDisplay.name,
          this.userToDisplay.password,
          this.userToDisplay._id
          ));
      }
        
    }
  }

  // Delete a user. 
  delete(id: string) {
    this.userService.delete(id).then((result: any) => this.loadAll());
  }

  // Load all users.
  private loadAll() {
    this.userService.get()
      .then((result: Array<User>) => {
        this.users = result;
      })
    this.userService.getAdmins()
      .then((result: Array<Admin>) => {
        this.admins = result;
      });
  }

}
