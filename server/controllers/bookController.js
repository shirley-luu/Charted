const axios = require('axios');

const { google_books_api_key } = require('../../.env');

const bookController = {};

bookController.findBook = async (req, res, next) => {
    const { title, author } = req.body;
    const book_endpoint = `http://openlibrary.org/search.json?q=${title}+author:${author}`;
    try {
        const response = await axios(book_endpoint);
        const book = response.data.docs[0];
        let subjects = [];
        if (!book) return res.status(200).send(false);
        if (book.subject_key) subjects = new Set(book.subject_key.map(subject => subject.split('_')[0]));
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
};

bookController.findBookCover = async (req, res, next) => {
    const { title, author } = req.body;
    const cover_endpoint = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}&key=${google_books_api_key}`;
    try {
        console.log(title, author);
        const response = await axios(cover_endpoint);
        const books = response.data.items;
        if (!books) return res.status(200).send(false);
        let [latest, imageURL] = [2000];
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
};

module.exports = bookController;