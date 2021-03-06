const Book = require('../models/book.model');
const { validationResult } = require('express-validator/check');

class BookService {
    create(book) {
        const bk = new Book({
            title: book.title,
            content: book.content,
            author: book.author,
            page: book.page
        });

        const result = bk.save();
        return result;
            // .then(data => {
            //     res.send(data);
            // }).catch(err => {
            //     res.status(500).send({
            //         message: err.message || "Some error occurred while creating the Book."
            //     });
            // });
    }

    listBook(title) {
        console.log('here', title)

        if (title == undefined) {
            title = ""
        }

        let query = { 
            title:  new RegExp(title, "i"),
        };
        let result = Book.find(query);

        return result;
    }
}

module.exports = new BookService();