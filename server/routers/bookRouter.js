const express = require('express');
const bookRouter = express.Router();

const bookController = require('../controllers/bookController');

bookRouter.post('/info',
    bookController.findBook,
    (req, res) => {
        return res.status(201).send(res.locals.bookInfo);
    }
);

bookRouter.post('/cover',
    bookController.findBookCover,
    (req, res) => {
        return res.status(201).send(res.locals.bookCover);
    }
);

module.exports = bookRouter;