import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IUser, User, Admin } from './user.model';
import {ProductService} from '../product/product.service';
import { IProduct } from '../product/product.model';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userUrl = '/api/user';
    private adminUrl = '/api/admin';

    constructor(private http: Http, private productService:ProductService) { }

    getAdmin(): Promise<Array<IUser>> {
        return this.http.get(this.adminUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Get users
    get(): Promise<Array<IUser>> {
        return this.http.get(this.userUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Enroll user
    create(user: User): Promise<IUser> {
        return this.http.post(this.userUrl, user)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Delete a user
    async delete(id: string): Promise<any> {
        return this.http.delete(`${this.userUrl}/${id}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    getUser(id: string): Promise<User> {
        return this.http.get(`${this.userUrl}/${id}`)
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


    addToCart(id: string, productId: string): Promise<any> {
        let user = this.getUser(id).then(function(result){
            result.shoppingCart.push(this.productService.getProduct(productId));
        });
        return this.http.put(`${this.userUrl}/${id}`, user)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    removeFromCart(id: string, productId: string): Promise<any>  {
        let user = this.getUser(id).then(function(result){
            let product = this.productService.getProduct(productId)
            let index = result.shoppingCart.indexOf(product)
            result.shoppingCart.splice(index, 1);
        });
        return this.http.put(`${this.userUrl}/${id}`, user)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    completePurchase(id: string): Promise<any> {
        let user = this.getUser(id).then(function(result){
            result.shoppingCart = [];
        });
        return this.http.put(`${this.userUrl}/${id}`, user)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }
}
