import { Request, Response, NextFunction }  from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

import { BookController } from '../../types/types';

dotenv.config();
const { google_books_api_key } = process.env;

const bookController: BookController = {
    findBook: async (req: Request, res: Response, next: NextFunction) => {
        const { title, author } = req.body;
        const book_endpoint = `http://openlibrary.org/search.json?q=${title}+author:${author}`;
        try {
            const response = await axios(book_endpoint);
            const book = response.data.docs[0];
            let subjects: Set<string> = new Set();
            if (!book) return res.status(200).send(false);
            if (book.subject_key) subjects = new Set(book.subject_key.map((subject: string) => subject.split('_')[0]));
            const bookInfo = { title: book.title, authors: book.author_name, subjects: [...subjects] };
            res.locals.bookInfo = bookInfo;
            return next();
        }
        catch(err) {
            return next({
                log: `Error in bookController.findBook: ${err}`,
                status: 500,
                message: {err: 'Error occured while looking for book'},
              });
        }
    },
    findBookCover: async (req: Request, res: Response, next: NextFunction) => {
        const { title, author } = req.body;
        const cover_endpoint = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}&key=${google_books_api_key}`;
        try {
            console.log(title, author);
            const response = await axios(cover_endpoint);
            const books = response.data.items;
            if (!books) return res.status(200).send(false);
            let [latest, imageURL] = [2000, null];
            for (let i = books.length - 1; i > books.length - 7; i--) {
                if (books[i] && books[i].volumeInfo.imageLinks.thumbnail && books[i].volumeInfo.language === 'en') {
                    const date = books[i].volumeInfo.publishedDate;
                    const year = date.split('-')[0];
                    const int = parseInt(year);
                    if (int > latest) {
                        latest = int
                        imageURL = books[i].volumeInfo.imageLinks.thumbnail;
    
                    }
                }
                res.locals.bookCover = imageURL;
                return next();
            }
            res.locals.bookCover = imageURL;
            return next();
        }
        catch(err) {
            return next({
                log: `Error in bookController.findBookCover: ${err}`,
                status: 500,
                message: {err: 'Error occured while looking for book cover'},
              });
        }
    }
};

export default bookController;