const express = require('express');
const bookRouter = express.Router();

const bookController = require('../controllers/bookController');

bookRouter.post('/find',
    bookController.findBook,
    (req, res) => {
        return res.status(201).send(res.locals.foundBook);
    }
);

module.exports = bookRouter;