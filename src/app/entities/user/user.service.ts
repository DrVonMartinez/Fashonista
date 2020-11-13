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

    getAdmins(): Promise<Array<IUser>> {
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

    getAdmin(id: string): Promise<User> {
        return this.http.get(`${this.adminUrl}/${id}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    async login(account: IUser): Promise<IUser> {
        var find_account: IUser
        if(account.role === 'admin'){
            let accounts = await this.getAdmins()
            accounts.forEach(function(admin){
                let namecheck = admin.name === account.name;
                let passwordcheck = admin.password === account.password;
                if(namecheck && passwordcheck){
                    find_account = admin;
                }
            })
        }
        else{
            let accounts = await this.get()
            accounts.forEach(function(user){
                let namecheck = user.name === account.name;
                let passwordcheck = user.password === account.password;
                if(namecheck && passwordcheck){
                    find_account = user;
                }
            })
        }
        return find_account;
        
        
        
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
