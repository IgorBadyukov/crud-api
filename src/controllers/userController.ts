import {IUser} from "../models/models.js";
import {users as data} from "../data/data.js";

export class UserController {
    async getUsers() {
        return new Promise<IUser[]>((resolve) => {
            resolve(data);
        })
    }

    async getUser(id: string) {
        return new Promise<IUser>((resolve, reject) => {
            let user = data.find(user => user.id === id);
            if (user) {
                resolve(user);
            }
            else {
                reject(`User with id ${id} not found`);
            }

        })
    }

    async createUser(user: IUser) {
        return new Promise<IUser>((resolve, reject) => {
            let newUser = {
                ...user,
                id: String(Math.floor(4 + Math.random() * 10))
            }
            resolve(newUser);
        })
    }

    async updateUser(id: string) {
        return new Promise<IUser>((resolve, reject) => {
            let user = data.find(user => user.id === id);
            if (!user) {
                reject(`No user with id ${id}`)
            }
            //code for resolve;
        })
    }

    async deleteUser(id: string) {
        return new Promise<string>((resolve, reject) => {
            let user = data.find(user => user.id === id);
            if (!user) {
                reject(`No user with id ${id}`)
            }
            resolve('User deleted succefully' );
        })
    }

}
