const axios = require('axios');

const bookController = {};

bookController.findBook = async (req, res, next) => {
    const { title, author } = req.body;
    const book_endpoint = `http://openlibrary.org/search.json?q=${title}+author:${author}'`;
    try {
        const response = await axios(book_endpoint);
        res.locals.foundBook = response.data;
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

module.exports = bookController;