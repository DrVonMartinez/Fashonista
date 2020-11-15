import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ProductService } from 'src/app/entities/product/product.service';
import { IProduct } from 'src/app/entities/product/product.model';

@Component({
  selector: 'app-product-infopane',
  templateUrl: './product-infopane.component.html',
  styleUrls: ['./product-infopane.component.css']
})
export class ProductInfopaneComponent implements OnInit, OnChanges {

  products: Array<IProduct> = [];
  @Input() productToDisplay: IProduct = null;
  frame: number;

  constructor(protected productService: ProductService) { }

  // Load all the products when starting the view.
  ngOnInit(): void {
    this.loadAll();
    this.frame = 0;
  }

  // If new product created, we add it to the list.
  ngOnChanges(): void {
    if (this.productToDisplay !== null) {
      this.products.push(this.productToDisplay);
    }
  }

  next(){
    if(this.frame<this.products.length){
      this.frame +=1
    }
    else{
      this.frame = 0
    }
  }

  previous(){
    if(this.frame== 0){
      this.frame = this.products.length -1
    }
    else{
      this.frame -= 1
    }
  }

  getImage(product: IProduct){
    return product.image
  }

  // Load all products.
  private loadAll() {
    this.productService
      .get()
      .then((result: Array<IProduct>) => {
        this.products = result;
      });
  }
}

