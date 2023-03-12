import { Document } from 'mongoose';

export interface User extends Document {
    username: string;
    email: string;
    imageURL: string;
    refreshToken: string;
    lastLoggedIn: string;
}

export interface Session extends Document {
    cookieId: string;
    createdAt?: Date;
}

export interface ErrObject {
    log: string,
    status: number,
    message: { err: string }
}

export interface Options {
    year: 'numeric' | '2-digit';
    month: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
    day: 'numeric' | '2-digit';
    hour: 'numeric' | '2-digit';
    minute: 'numeric' | '2-digit';
    second: 'numeric' | '2-digit';
}

export interface UserInfo {
    username: string,
    email: string,
    imageURL: string,
    refreshToken: string,
    lastLoggedIn: string
}