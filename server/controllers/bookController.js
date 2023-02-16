const axios = require('axios');

const bookController = {};

bookController.findBook = async (req, res, next) => {
    const { title, author } = req.body;
    const book_endpoint = `http://openlibrary.org/search.json?q=${title}+author:${author}`;
    try {
        const response = await axios(book_endpoint);
        const book = response.data.docs[0];
        const subjects = new Set(book.subject_key.map(subject => subject.split('_')[0]));
        // let isbn;
        // for (let i = 0; i < book.isbn.length; i++) {
        //     const current = book.isbn[i];
        //     const isbn_endpoint = `https://openlibrary.org/isbn/${current}.json`;
        //     const response = await axios(isbn_endpoint);
        //     // if (response.data.language === 'eng') return isbn = current;
        //     if  (response.data.language) console.log(response.data.language);
        // }
        const bookInfo = {
            title: book.title,
            authors: book.author_name,
            subjects: [...subjects],
            isbn: book.isbn[0]
        }
        res.locals.bookInfo = bookInfo;
        console.log(bookInfo);
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
    const { isbn } = req.body;
    const cover_endpoint = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`;
    try {
        const response = await axios(cover_endpoint);
        console.log(response.data);
        // const imageURL = response.data[`ISBN:${isbn}`].cover.large;
        // if (imageURL) res.locals.bookCover = imageURL;
        // console.log(imageURL);
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