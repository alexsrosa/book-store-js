const BookDao = require('../infra/book-dao')
const db = require('../../config/database');

module.exports = (app) => {

    app.get('/', (req, resp) => {

        resp.send(`
                <html>
                    <head>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1> Main Page</h1>
                    </body> 
                </html>
            `);
    });

    app.get('/books', (req, resp) => {

        const bookDao = new BookDao(db);
        bookDao.all()
            .then(booksAll => resp.marko(
                require('../views/books/list/list.marko'), {
                    books: booksAll
                }
            ))
            .catch(erro => console.log(erro));
    });

    app.get('/books/form', function(req, resp) {
        resp.marko(require('../views/books/form/form.marko'))
    });

    app.get('/books/:id', function(req, resp) {
        const bookDao = new BookDao(db);
        bookDao.findOne(req.params.id)
            .then(bookFindOne => resp.redirect(
                require('../views/books/form/form.marko'), {
                    book: bookFindOne
                }
            ))
            .catch(erro => console.log(erro));
    });

    app.post('/books', function(req, resp) {
        const bookDao = new BookDao(db);
        bookDao.insert(req.body)
            .then(resp.redirect('/books'))
            .catch(erro => console.log(erro));
    });
};