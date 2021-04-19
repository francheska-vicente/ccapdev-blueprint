const express = require('express');
const exphbs = require('express-handlebars');

const routes = require('./routes/routes.js');

const app = express();
const port = 3000;

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.use(express.static('public'));

app.use('/', routes);

app.listen(port, () => {
    console.log('The web server has started on port ' + port);
});