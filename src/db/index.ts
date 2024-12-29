/**
 * author Saquib Shaikh
 * created on 23-12-2024-13h-00m
 * github: https://github.com/saquibshaikh14
 * copyright 2024
*/

import { randomUUID, UUID } from "crypto";

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash?: string;
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: string;
}

var database: User[] = [];

/**
 * create a module like mongoose to update, delete, create user, same method names
 * 
 */

function createUser(user: User) {
    return {
        passwordHash: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
        twoFactorEnabled: false,
        twoFactorSecret: '',
        id: randomUUID(),
        ...user
    }
};

export function deleteFields(fields: string[], obj: Record<string, any>) {
    const clonedCopy = JSON.parse(JSON.stringify(obj));
    for (let field of fields) {
        clonedCopy.hasOwnProperty(field) && delete clonedCopy[field];
    };
    return clonedCopy;
}

export const userDb = {
    insertOne: async (user: User) => {
        if (userDb.findOne({ 'email': user.email })) {
            return false;
        };
        user = createUser(user);
        database.push(user);
        return deleteFields(['passwordHash', 'twoFactorSecret', 'createdAt', 'updatedAt'], user);
    },
    //this function will return matching user or null if not found, with the key name and value provided in findOne:
    findOne: (query: Record<string, string>, excludeFields: string[] = []) => {
        //TODO: implement query object search
        const user: User | undefined = database.find(user => Object.keys(query).every(key => user[key as keyof User] === query[key]));

        if (user) {
            return deleteFields(excludeFields, user);
        }
        return null;

    },
    findById: (id: string) => {
        return database.find(user => user.id === id);
    },
    // this function will update the user with the key name and value provided in updateOne:
    updateOne: (query: Record<string, string>, update: Record<string, any>, excludeFields: string[] = []): User | null => {
        const userIndex = database.findIndex(user =>
            Object.keys(query).every(key =>
                user[key as keyof User] === query[key]
            ));

        if (userIndex === -1) {
            // If no user is found, return undefined
            return null;
        }

        database[userIndex] = {
            ...database[userIndex],
            ...update,
            updatedAt: new Date(),
        };

        return deleteFields(excludeFields, database[userIndex]);
    },
    deleteById: (id: string) => {
        database = database.filter(user => user.id !== id);
    }
}