import { Component, OnInit } from '@angular/core';
import { IProduct } from '../entities/product/product.model';
import { IUser } from '../entities/user/user.model';
import { StatusService } from '../shared/status.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  title = 'Fashionista';
  status = 'DOWN';
  createdProduct: IProduct = null;
  users: IUser = null
  page = 'login'
  admin: IUser = null;
  adminLoginForm;

  constructor(protected statusService: StatusService) { }

  // Get the server status when starting the view.
  ngOnInit() {
    this.statusService
      .getStatus()
      .then((result: any) => {
        this.status = result.status;
      });
  }

  // Get the new product created.
  onCreatedProduct(createdProduct: IProduct) {
    this.createdProduct = createdProduct;
  }

  onSubmit(){
    console.log(this.adminLoginForm)
  }

}
