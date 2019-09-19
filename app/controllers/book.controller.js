const Book = require('../models/book.model');
const bookService = require('../services/book.service');
const Boom = require('boom');
const { body } = require('express-validator/check')
const Joi = require('joi'); 


var _error = function(message, data) {
    let err = Boom.badImplementation(message);
    err.output.payload.message = message;
    return err;
}


class BookController {
    async create(req, res) {
        try {
            // const { body } = req;
            // const 
            // blogSchema = Joi.object().keys({ 
            //     title: Joi.string().required(),
            //     content: Joi.string().required(),
            //     author: Joi.any().allow()
            // }); 
            // const result = Joi.validate(body, blogSchema, {abortEarly: false}); 
            // const { value, error } = result; 
            // const valid = error == null; 

            // if (!valid) { 
            //     res.status(422).json({ 
            //       message: result.error, 
            //       data: body 
            //     }) 
            // } else {
                const data = await bookService.create(req.body);
                res.send(data);
            // }

            // .then(data => {
            //     res.send(data);
            // }).catch(err => {
            //     res.status(500).send({
            //         message: err.message || "Some error occurred while creating the Book."
            //     });
            // });
        } catch (error) {
            console.log('error', error)
            _error(error.message, error);
        }
    }

    async listBook(req, res, next) {
        try {
            let query = req.query.search;
            let data = await bookService.listBook(query);

            res.send(data);
        } catch (error) {
            console.log('error', error)
            _error(error.message, error);
        }
    }
}

module.exports = new BookController();

// exports.create = (req, res) => {
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "Note content can not be empty"
//         })
//     }

//     const book = new Book({
//         title: req.body.title,
//         content: req.body.content,
//         author: req.body.author,
//         page: req.body.page
//     });

//     book.save()
//         .then(data => {
//             res.send(data)
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while creating the Book."
//             });
//         })
// }

// // Retrieve and return all notes from the database.
// exports.findAll = (req, res) => {
//     Book.find()
//     .then(books => {
//         res.send(books);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving books."
//         });
//     });
// };

// // Find a single note with a noteId
// exports.findOne = (req, res) => {
//     Book.findById(req.params.bookId)
//     .then(note => {
//         if(!note) {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.noteId
//             });            
//         }
//         res.send(note);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.noteId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error retrieving note with id " + req.params.noteId
//         });
//     });
// };