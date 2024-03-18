const express = require('express');
const app = express();

app.set('view engine', 'ejs');

// Configurações do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', { title: 'Biblioteca' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

let livros = [
    { id: 1, title: 'Título 1', name: 'Fulano 1', year: 2000},
    { id: 2, title: 'Título 2', name: 'Fulano 2', year: 2001}
   
  ];
    document.querySelector('.submit button').addEventListener('click', function() {
        var buscaInput;
        var tipoBusca = document.querySelector('input[name="option"]:checked').value;
            
        if (tipoBusca === 'nome') {
            buscaInput = document.querySelector('.nome').value;
        } else if (tipoBusca === 'ano') {
                buscaInput = document.querySelector('.ano').value;
        } else if (tipoBusca)

        var resultadoDiv = document.querySelector('.resultado');
        resultadoDiv.style.display = 'block';
        resultadoDiv.innerText = 'Você buscou por: ' + buscaInput;
    });

    app.get('/livro/:id', (req, res) => {
        const livroId = req.params.id;
        res.send(`Detalhes do produto ${livroId}`);
      });

      app.post('/books/add', (req, res) => {
        const {title, name, year} = req.body;
        const newBook = {
            id: livros.length + 1,
            title,
            name,
            year
          };
        
          // Adicionar o novo livro à lista
          userList.push(newBook);
        res.render('index');
      });
      
