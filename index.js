const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false
}));

const users = [
    { id: 1, email: 'usuario1@example.com', password: 'senha1' },
    { id: 2, email: 'usuario2@example.com', password: 'senha2' },
    { id: 3, email: 'usuario3@example.com', password: 'senha3' }
];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    const errorMessage = req.query.error ? 'Credenciais inválidas! Tente novamente.' : null;
    res.render('login', { error: errorMessage });
});

app.post('/auth', (req, res) => {
    const { email, password } = req.body;
    const userValid = users.find(user => user.email === email && user.password === password);
    if (userValid) {
        req.session.user = userValid;
        res.cookie('authenticated', true);
        res.redirect('/success');
    } else {
        res.redirect('/?error=true');
    }
});

app.use((req, res, next) => {
    if (req.cookies.authenticated) {
        next();
    } else {
        res.redirect('/');
    }
});

app.get('/', (req, res) => {
    res.render('login', { user: req.session.user.email });
});

app.get('/success', (req, res) => {
  res.render('login-success');
});

app.get('/register', (req, res) => {
  const errorMessage = req.query.error ? 'Erro ao registrar usuário. Tente novamente.' : null;
  res.render('register', { error: errorMessage });
});

app.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
      return res.redirect('/register?error=Todos os campos são obrigatórios.');
  }
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
      return res.redirect('/register?error=E-mail inválido. Tente novamente.');
  }
  if (password !== confirmPassword) {
      return res.redirect('/register?error=As senhas não coincidem. Tente novamente.');
  } else {
    const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    confirmPassword
  };

  users.push(newUser);
}
  res.send('Usuário registrado com sucesso!');
});

app.get('/logout', (req, res) => {
    res.clearCookie('authenticated');
    res.redirect('/login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
