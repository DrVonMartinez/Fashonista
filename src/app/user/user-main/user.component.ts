import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct, Product } from 'src/app/entities/product/product.model';
import { ProductService } from 'src/app/entities/product/product.service';
import { IUser, User } from 'src/app/entities/user/user.model';
import { UserService } from 'src/app/entities/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  page: string;
  user: User;
  shoppingcart: Array<IProduct> = [];
  error: boolean = false;
  products: Array<IProduct> = [];
  frame: number;
  @Input() cartToDisplay: IProduct = null;
  @Output() loggedInUser = new EventEmitter<IUser>();
  constructor(protected userService: UserService, protected formBuilder: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
    this.user = undefined
    this.page = 'login';
  }


  // Hide the error message.
  hideError() {
    this.error = false;
  }

  logout() {
    if (this.user !== undefined) {
      this.user = undefined;
      return 'login';
    }
  }

  onLogin(user: User) {
    this.user = user;
    this.frame = 0;
    this.page = 'shop'
    this.loggedInUser.emit(user);
    this.loadAll();
  }

  cart() {
    if (this.user) {
      this.user.shoppingCart.push(this.products[this.frame])
    }
    alert(this.products[this.frame].name + ' added to cart')
  }

  next() {
    if (this.frame < this.products.length) {
      this.frame += 1
    }
    else {
      this.frame = 0
    }
  }

  previous() {
    if (this.frame == 0) {
      this.frame = this.products.length - 1
    }
    else {
      this.frame -= 1
    }
  }

  // Load all products.
  private loadAll() {
    this.productService
      .get()
      .then((result: Array<IProduct>) => {
        this.products = result;
      });
  }

  // Delete a product. 
  delete(id: string) {
    let product: Product;
    let found = false;
    this.products.forEach(function(product_i: Product){
      if (!found && (product_i._id===id)){
        found = true;
        product = product_i;
      }

    })
    this.userService.removeFromCart(this.user, product).then((result: any) => this.loadCart());
  }

  // Load all products.
  private loadCart() {
    this.userService
      .getUser(this.user._id)
      .then(function(result: User){
        this.shoppingCart = result.shoppingCart
      });
  }

  checkout(){
    this.userService.completePurchase(this.user).then((result: any) => this.loadCart());
    alert('Transaction Successful')
  }

}
