module.exports = (app) => {
    const books = require('../controllers/book.controller.js');
    const Joi = require('joi');
    const { validateBody, schemas } = require('../helper/routerHelper');

    // Create a new Note
    app.post('/book', validateBody(schemas.authSchema), books.create);

    // app.post('/book', books.create);
}