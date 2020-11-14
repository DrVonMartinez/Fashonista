import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IProduct } from '../../entities/product/product.model';
import { Admin, IUser } from '../../entities/user/user.model';
import { UserService } from '../../entities/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  createdProduct: IProduct = null;
  addedUser: IUser = null;
  page:string;
  //admin: Admin = ;
  admin:any = true;
  error: boolean;

  @Output() loggedInUser = new EventEmitter<IUser>();
  constructor(protected adminService: UserService) { }

  ngOnInit() {
    this.page = 'login';
  }

  // Get the new product created.
  onCreatedProduct(createdProduct: IProduct) {
    this.createdProduct = createdProduct;
  }

  logout(){
    if(this.admin !== undefined){
      this.admin = undefined;
      return 'login';
    }
  }

  onLogin(user: Admin){
    this.admin = user;
    this.page = 'product';
    this.loggedInUser.emit(user)
  }

  onAddedUser(user: IUser){
    this.addedUser = user;
  }

}
