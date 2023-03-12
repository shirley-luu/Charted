import { RequestHandler } from "express";

export type BookController = {
    findBook: RequestHandler,
    findBookCover: RequestHandler
}

export type CookieController = {
    getTokenCookie: RequestHandler,
    setTokenCookie: RequestHandler,
    getSSIDCookie: RequestHandler,
    setSSIDCookie: RequestHandler,
    deleteSSIDCookie: RequestHandler
}

export type SessionController = {
    findSession: RequestHandler,
    startSession: RequestHandler,
    deleteSession: RequestHandler,
}

export type SpotifyController = {
    getAccessToken: RequestHandler,
    useRefreshToken: RequestHandler,
    getUserInfo: RequestHandler,
    getTopArtists: RequestHandler,
    getTopTracks: RequestHandler,
}

export type UserController = {
    findUser: RequestHandler,
    createUser: RequestHandler,
    updateUserRefreshToken: RequestHandler,
}