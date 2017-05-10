const express = require('express');
const app = express();

const port = 3000;

// MIDDLEWARE
app.use('/public', express.static('public'));

// VIEWS
app.set('views', './views');
app.set('view engine', 'ejs');


// ROUTES
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/movies', (req, res) =>{
    res.render("movies");
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


app.listen(port, () => {
    console.log(`server listen on port : ${port}`);
})