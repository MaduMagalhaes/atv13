const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', (req, res) => {
    const errorMessage = req.query.error ? 'Credenciais inválidas! Tente novamente.' : null;
    res.render('login', { error: errorMessage });
});

const users = [
    { id: 1, email: 'usuario1@example.com', password: 'senha1' },
    { id: 2, email: 'usuario2@example.com', password: 'senha2' },
    { id: 3, email: 'usuario3@example.com', password: 'senha3' }
];

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        res.redirect('/login/success');
    } else {
        res.redirect('/login?error=true');
    }
});

app.get('/login/success', (req, res) => {
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
    }
    if (users.some(user => user.users === users)) {
        res.render('register', { error: 'Usuário já cadastrado' }); // Definindo a variável error
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
    res.redirect('/login');
});

app.use(cookieParser());
app.use(session({
    secret:'yourSecret',
    resave: false,
    saveUnitialized: false,
    cookie: {
        maxAge: 1000*60*60*24,
        httpOnly: true
    }
}));

const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
