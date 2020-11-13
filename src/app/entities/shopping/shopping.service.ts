import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IProduct, Product } from '../product/product.model';

@Injectable({
    providedIn: 'root'
})
export class ShoppingService {
    private cartUrl = '/api/cart';

    constructor(private http: Http) { }

    // Get products
    get(): Promise<Array<IProduct>> {
        return this.http.get(this.cartUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Add to cart 
    add(product: Product): Promise<IProduct> {
        return this.http.post(this.cartUrl, product)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Delete a product from cart
    delete(id: string): Promise<any> {
        return this.http.delete(`${this.cartUrl}/${id}`)
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
