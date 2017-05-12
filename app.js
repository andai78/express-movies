const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 3000;

// MIDDLEWARE
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

// VIEWS
app.set('views', './views');
app.set('view engine', 'ejs');

let americanMovie = [];

// ROUTES
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/movies', (req, res) =>{
     americanMovie = [
        {title: "Amercian Gangsta", year: 2004},
        {title: "Malcom x", year: 1996}
    ];
    res.render("movies", {movies: americanMovie});
});

app.post('/movies', (req,res) =>{
    //console.log(req.body.title);
    const newMovie = {title: req.body.title, year: req.body.year};
    americanMovie.push(newMovie);
    console.log(americanMovie);
    res.send(201);
});

app.get('/movie/:title/:id', (req, res) =>{
    // recuperation du parametre ds l'url
    let id = req.params.id;
    let title = req.params.title;
    res.render("movie-details", { movieTitle: title, movieId: id });
});

app.get('/movies/add', (req, res) =>{
    res.send("Form");
});

app.get('/search', (req, res) =>{
    res.render("search");
});

app.get('/login', (req, res) =>{
    res.render("login", {title: 'Connexion'});
});

const fakeUser = {email: 'test@hot.fr', password: '0000'};

app.post('/login', (req, res) =>{
    console.log(req.body);
    if(!req.body){
        res.sendStatus(500);
    }
    else{
        if(fakeUser.email === req.body.email && fakeUser.password === req.body.password){
            res.json({
                email: 'test@hot.fr',
                favorite: 'Malcom X',
                lastLogin: new Date()
            })
        }
        else{
            res.send(401);
        }
    }
});


app.listen(port, () => {
    console.log(`server listen on port : ${port}`);
})