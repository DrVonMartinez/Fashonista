import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/entities/product/product.service';
import { IProduct, Product } from 'src/app/entities/product/product.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productForm: FormGroup;
  name: string = '';
  brand: string = '';
  image: string = '';
  price: string = '';
  category: string = '';
  error: boolean = false;

  @Output() createdProduct = new EventEmitter<IProduct>();

  constructor(protected productService: ProductService, protected formBuilder: FormBuilder) { }

  // Init the form when starting the view.
  ngOnInit(): void {
    this.initForm();
  }

  // Manage the submit action and create the new product.
  onSubmit() {
    this.hideError()
    let price_value: number;
    try {
      price_value = Number(this.price)
    }
    catch {
      this.error = true;
    }
    if (!this.error) {
      const product = new Product(
        this.productForm.value['name'],
        this.productForm.value['brand'],
        this.productForm.value['image'],
        price_value,
        this.productForm.value['category'],
        null);
      this.productService.create(product).then((result: IProduct) => {
        if (result === undefined) {
          this.error = true;
        } else {
          this.error = false;
          this.name = '';
          this.brand = '';
          this.image = '';
          this.price = '';
          this.category = '';
          this.createdProduct.emit(result);
        }
      });
    }
  }

  // Hide the error message.
  hideError() {
    this.error = false;
  }

  // Init the creation form.
  private initForm() {
    this.productForm = new FormGroup({
      name: new FormControl(this.name, Validators.required),
      brand: new FormControl(this.brand, Validators.required),
      image: new FormControl(this.image, Validators.required),
      price: new FormControl(this.price, Validators.required),
      category: new FormControl(this.category, Validators.required)
    });
  }

}
