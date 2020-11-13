import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ShoppingService } from 'src/app/entities/shopping/shopping.service';
import { IProduct } from 'src/app/entities/product/product.model';


@Component({
  selector: 'app-product-shoppingcart',
  templateUrl: './product-shoppingcart.component.html',
  styleUrls: ['./product-shoppingcart.component.css']
})
export class ProductShoppingCartComponent implements OnInit {

  shoppingCart: Array<IProduct> = [];
  @Input() cartToDisplay: IProduct = null;

  constructor(protected shoppingService: ShoppingService) { }

  // Load all the products when starting the view.
  ngOnInit(): void {
    this.loadAll();
  }

  // If new product created, we add it to the list.
  ngOnChanges(): void {
    if (this.cartToDisplay !== null) {
      this.shoppingCart.push(this.cartToDisplay);
    }
  }

  // Delete a product. 
  delete(id: string) {
    this.shoppingService.delete(id).then((result: any) => this.loadAll());
  }

  // Load all products.
  private loadAll() {
    this.shoppingService
      .get()
      .then((result: Array<IProduct>) => {
        this.shoppingCart = result;
      });
  }

}