class BookDao {

    constructor(db) {
        this._db = db;
    }

    insert(book) {
        return new Promise((resolve, reject) => {
            this._db.run(`INSERT INTO books (
                    title,
                    price,
                    description 
                ) values (?, ?, ?)
            `, [
                    book.title,
                    book.price,
                    book.description
                ],
                function(err) {
                    if (err) {
                        console.log(err);
                        return reject('Could not save book!');
                    }

                    resolve();
                })
        });
    };

    all() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM books',
                (erro, results) => {
                    if (erro) return reject('Could not find books!');
                    return resolve(results);
                }
            )
        });
    };

    findOne(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                'SELECT * FROM books where id = ?', [id],
                (err, book) => {
                    if (err) return reject('Could not find book!');
                    return resolve(book);
                }
            )
        });
    };

    remove(book) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    DELETE 
                    FROM books
                    WHERE id = ?
                `, [id],
                (err) => {
                    if (err) {
                        return reject('Could not remove book!');
                    }
                    return resolve();
                }
            );
        });
    };

    update(book) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE books SET
                title = ?,
                price = ?,
                description = ?
                WHERE id = ?
            `, [
                    book.title,
                    book.price,
                    book.description,
                    book.id
                ],
                err => {
                    if (err) {
                        return reject('Could not update book!');
                    }
                    resolve();
                });
        });
    };
}

module.exports = BookDao;