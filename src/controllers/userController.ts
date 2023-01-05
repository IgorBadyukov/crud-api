import { v4 as uuidv4 } from 'uuid';
import { IBody, IUser } from '../models/models.js';
import { users as data } from '../data/data.js';

export class UserController {
  static async getUsers() {
    return new Promise<IUser[]>((resolve) => {
      resolve(data);
    });
  }

  static async getUser(id: string) {
    return new Promise<IUser>((resolve, reject) => {
      const user = data.find((u) => u.id === id);
      if (user) {
        resolve(user);
      } else {
        reject(new Error(`User with id ${id} not found`));
      }
    });
  }

  static async createUser(user: IUser) {
    return new Promise<IUser>((resolve) => {
      const newUser = {
        ...user,
        id: uuidv4(),
      };
      data.push(newUser);
      resolve(newUser);
    });
  }

  static async updateUser(id: string, body: IBody) {
    return new Promise<string>((resolve, reject) => {
      const user = data.find((u) => u.id === id);
      if (!user) {
        reject(new Error(`User with id ${id} not found`));
      }
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i].id === id ? { ...data[i], ...body } : data[i];
      }
      resolve(`User ${id} successfully update`);
    });
  }

  static async deleteUser(id: string) {
    return new Promise<string>((resolve, reject) => {
      const user = data.find((u) => u.id === id);
      if (!user) {
        reject(new Error(`User with id ${id} not found`));
      }
      data.forEach((elem, i) => {
        if (elem.id === id) data.splice(i, 1);
      });
      resolve('User deleted succefully');
    });
  }
}
