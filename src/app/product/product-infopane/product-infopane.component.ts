import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/entities/product/product.model';
import { ProductService } from 'src/app/entities/product/product.service';

@Component({
  selector: 'app-product-infopane',
  templateUrl: './product-infopane.component.html',
  styleUrls: ['./product-infopane.component.css']
})
export class ProductInfopaneComponent implements OnInit {

  frames = []
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    let products = []
    this.productService
      .get()
      .then((result: Array<IProduct>) => {
        products = result;
      });

    for (let i = 0; i < 5; i++) {
      let frame = products[Math.floor(Math.random() * products.length)]
      this.frames.push(frame)
      console.log(frame)
    }
  }

}
