const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = 9090;

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('profile');
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log('The web server has started on port ' + port);
});