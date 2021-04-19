const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = 9090;

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

/*
app.get('/', function (req, res) {
    res.render('profile', {
        info: {
            fName: 'Harry',
            lName: 'Potter',
            bio: 'The best error message is the one that never shows up.',
            username: 'harry_potter',
            email: 'harry_potter@dlsu.edu.ph',
            bday: 'July 31, 2000',
            phone: '+639174444576',
            uni: 'De La Salle University - Manila',
            degree: 'Computer Science'
        }
    });
}); 

app.get('/', function (req, res) {
    res.render('home', {
    });
}); */

app.get('/', function (req, res) {
    res.render('searchclass', {
    });
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log('The web server has started on port ' + port);
});