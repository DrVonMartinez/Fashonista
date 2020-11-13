import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserService } from 'src/app/entities/user/user.service';
import { IUser } from 'src/app/entities/user/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnChanges {

  users: Array<IUser> = [];
  @Input() userToDisplay: IUser = null;

  constructor(protected userService: UserService) { }

  // Load all the users when starting the view.
  ngOnInit(): void {
    this.loadAll();
  }

  // If new user created, we add it to the list.
  ngOnChanges(): void {
    if (this.userToDisplay !== null) {
      this.users.push(this.userToDisplay);
    }
  }

  // Delete a user. 
  delete(id: string) {
    this.userService.delete(id).then((result: any) => this.loadAll());
  }

  // Load all users.
  private loadAll() {
    this.userService
      .getAdmins()
      .then((result: Array<IUser>) => {
        this.users = result;
      })
    this.userService.get()
      .then((result: Array<IUser>) => {
        this.users.concat(result);
      });
  }

}
