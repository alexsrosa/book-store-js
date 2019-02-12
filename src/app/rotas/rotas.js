const db = require('../../config/database');

module.exports = (app) => {

    app.get('/', (req, resp) => {

        db.all('SELECT * FROM livros', function(erro, resultados) {
            resp.marko(
                require('../views/livros/lista/lista.marko'), {
                    livros: resultados
                }
            );
        });
    });

    app.get('/livros', (req, resp) => {
        resp.marko(
            require('../views/livros/lista/lista.marko'), {
                livros: [{
                        id: 1,
                        titulo: 'Fundamentos do Node'
                    },
                    {
                        id: 2,
                        titulo: 'Node Avançado'
                    }
                ]
            }
        );
    });
};