/**
 * author Saquib Shaikh
 * created on 25-12-2024-01h-23m
 * github: https://github.com/saquibshaikh14
 * copyright 2024
*/

import ApiClient from "./ApiClient";
// import ApiClient from './mock';

const authClient = new ApiClient('http://localhost:3000/api/auth');
const userClient = new ApiClient('http://localhost:3000/api/user');

export const registerUser = async (
    firstname: string,
    lastname: string,
    email: string,
    password: string
) => {
    return await authClient.post('/register', { firstname, lastname, email, password });
}

export const loginUser = async (email: string, password: string) => {
    return await authClient.post('/login', { email, password });
}

export const getUserLoginStatus = async () => {
    return await authClient.post('/login-status', {});
}

export const logoutUser = async () => {
    return await authClient.post('/logout', {});
}

export const handleUser2FA = async (action: "skip" | "enable" | "verify", totp?: string) => {
    return await authClient.post('/handle2fa', { action, totp });
}

//update user details, currently first name and last name allowed, can be modified to update more information
export const updateUser = async ({ firstName, lastName }: { firstName: string, lastName: string }) => {
    return await userClient.post('/update-user', { firstname: firstName, lastname: lastName });
}
export const getUser = async () => {
    return await userClient.get('/user');
}