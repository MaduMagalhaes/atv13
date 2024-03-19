const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { livros: livros });
});

let livros = [
  { id: 1, titulo: 'Título 1', nome: 'Fulano 1', ano: 2000},
  { id: 2, titulo: 'Título 2', nome: 'Fulano 2', ano: 2000},
  { id: 3, titulo: 'Título 3', nome: 'Fulano 3', ano: 2000},
  { id: 4, titulo: 'Título 4', nome: 'Fulano 4', ano: 2000},
  { id: 5, titulo: 'Título 5', nome: 'Fulano 5', ano: 2000},
  { id: 6, titulo: 'Título 6', nome: 'Fulano 6', ano: 2000},
  { id: 7, titulo: 'Título 7', nome: 'Fulano 7', ano: 2001}
  
];

app.get('/buscar/:ano', (req, res) => {
  let livroAno = req.params.ano;
  let filtragemId = livros.filter(livro => livro.ano == livroAno);
  res.render('index', {livros: filtragemId});
});

app.get('/buscar', (req, res) => {
  let titulo = req.query.titulo;
  let filtragemTitulo = livros.filter(livro => livro.titulo.toLowerCase() === titulo.toLowerCase());
  res.render('index', { livros: filtragemTitulo });
  
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
