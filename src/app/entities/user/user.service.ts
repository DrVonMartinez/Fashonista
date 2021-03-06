import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IUser, User, Admin } from './user.model';
import { ProductService } from '../product/product.service';
import { IProduct, Product } from '../product/product.model';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userUrl = '/api/user';
    private adminUrl = '/api/admin';

    constructor(private http: Http, private productService: ProductService) { }

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
    async create(user: User): Promise<IUser> {
        let found: boolean = false
        if (!found) {
            // Confirm username is not used by admin
            let admins = await this.getAdmins()
            admins.forEach(function (admin) {
                let namecheck = admin.name === user.name;
                if (namecheck) {
                    found = true;
                }
            })
        }
        if (!found) {
            // Confirm username is not used by admin
            let users = await this.get()
            users.forEach(function (check) {
                let namecheck = check.name === user.name;
                if (namecheck) {
                    found = true;
                }
            })
        }
        if (!found) {
            return this.http.post(this.userUrl, user)
                .toPromise()
                .then(response => response.json())
                .catch(this.error);
        }
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
        if (account.role === 'admin') {
            let accounts = await this.getAdmins()
            accounts.forEach(function (admin) {
                let namecheck = admin.name === account.name;
                let passwordcheck = admin.password === account.password;
                if (namecheck && passwordcheck) {
                    find_account = admin;
                }
            })
        }
        else {
            let accounts = await this.get()
            accounts.forEach(function (user) {
                let namecheck = user.name === account.name;
                let passwordcheck = user.password === account.password;
                if (namecheck && passwordcheck) {
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


    addToCart(user: User, product:Product): Promise<User> {
        user.shoppingCart.push(product);
        return this.http.put(`${this.userUrl}/${user._id}`, user)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    removeFromCart(user: User, product:Product): Promise<User> {
        let index = user.shoppingCart.indexOf(product)
        user.shoppingCart.splice(index, 1);
        return this.http.put(`${this.userUrl}/${user._id}`, user)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    completePurchase(user: User): Promise<User> {
        user.shoppingCart = [];
        return this.http.put(`${this.userUrl}/${user._id}`, user)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }
}
