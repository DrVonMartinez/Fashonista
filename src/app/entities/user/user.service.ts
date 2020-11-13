import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IUser, User, Admin } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userUrl = '/api/user';
    private adminUrl = '/api/admin';

    constructor(private http: Http) { }

    getAdmin():Promise<Array<IUser>> {
        return this.http.get(this.adminUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Get users
    get():Promise<Array<IUser>> {
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

    /*
    update(id: string): Promise<any> {
        return this.http.put(`${this.userUrl}/${id}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }*/

    // Error handling
    private error(error: any) {
        let message = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(message);
    }
}
