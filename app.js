const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const routes = require('./routes/routes.js');
const db = require('./models/db.js');

const app = express();
const port = 3000;

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
    	ifEqual : function (user1, user2) {
          if (user1.toLowerCase () == user2.toLowerCase ())
            return true;
          else
            return false;
      }
    }
}));


app.use(bodyParser.urlencoded ({ extended : false}));
app.use(bodyParser.json());
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.use('/', routes);

app.use(function (req, res) {
    res.render('error');
});

db.connect();

app.listen(port, () => {
    console.log('The web server has started on port ' + port);
});