class BookDao {

    constructor(db) {
        this._db = db;
    }

    all() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM books',
                (erro, results) => {
                    if (erro) return reject('error');
                    return resolve(results);
                }
            )
        });
    };
}

module.exports = BookDao;