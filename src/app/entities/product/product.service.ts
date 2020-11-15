import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IProduct, Product } from './product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productsUrl = '/api/products';

    constructor(private http: Http) { }

    // Get products
    get(): Promise<Array<IProduct>> {
        return this.http.get(this.productsUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    getProduct(id: string): Promise<IProduct> {
        return this.http.get(`${this.productsUrl}/${id}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Create product
    async create(product: Product): Promise<IProduct> {
        let found: boolean = false
        if (!found) {
            // Confirm username is not used by admin
            let products = await this.get()
            products.forEach(function (product_i) {
                let namecheck = product.name === product_i.name;
                let brandcheck = product.brand === product_i.brand;
                if (namecheck && brandcheck) {
                    found = true;
                }
            })
        }
        if (!found) {
            return this.http.post(this.productsUrl, product)
                .toPromise()
                .then(response => response.json())
                .catch(this.error);
        }
    }

    // Delete a product
    delete(id: string): Promise<any> {
        return this.http.delete(`${this.productsUrl}/${id}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Error handling
    private error(error: any) {
        let message = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(message);
    }
}