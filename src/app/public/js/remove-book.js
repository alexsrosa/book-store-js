let booksTable = document.querySelector('#books');
booksTable.addEventListener('click', (evento) => {
    let elementClicked = evento.target;

    if (elementClicked.dataset.type == 'remove') {
        let idBook = elementClicked.dataset.ref;
        fetch(`http://localhost:3000/books/${idBook}`, { method: 'DELETE' })
            .then(response => {

                let tr = elementClicked.closest(`#book_${idBook}`);
                tr.remove();

            })
            .catch(erro => console.log(erro));

    }

});