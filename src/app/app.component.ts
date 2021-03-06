import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StatusService } from './shared/status.service';
import { IProduct } from './entities/product/product.model';
import { isPromise } from '@angular/compiler/src/util';
import { IUser } from './entities/user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fashionista';
  status = 'DOWN';
  page: string;
  createdProduct: IProduct = null;
  addedUser: IUser = null;

  constructor(protected statusService: StatusService) { 
    
  }

  // Get the server status when starting the view.
  ngOnInit() {
    this.page = 'home'
    this.statusService
      .getStatus()
      .then((result: any) => {
        this.status = result.status;
      });
  }

  // Get the new product created.
  onCreatedProduct(createdProduct: IProduct) {
    this.createdProduct = createdProduct;
    console.log(this.createdProduct)
  }

  onAddedUser(addedUser: IUser) {
    this.addedUser = addedUser;
    console.log(this.addedUser)
  }

}
