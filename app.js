const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');

const routes = require('./routes/routes.js');
const db = require('./models/db.js');

const app = express();
const port = 3000;

app.use(session({
    secret: 'blueprint',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/blueprint' })
}));

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
    	ifEqual : function (user1, user2, opts) {
        try
        {
          if (user1.toLowerCase () == user2.toLowerCase ())
            return opts.fn (this);
          else
            return opts.inverse(this);
        } catch (error) { }
      }
    }
}));

app.use(bodyParser.urlencoded ({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.use('/', routes);

// app.use(function(err, req, res, next){
//     res.status(err.status);
//     res.render('error', { 
//         error: err,
//         code: err.status
//     });
// });

app.use(function (req, res) {
    var details = {
        error: "Error: Page not found.",
        code: "404"
    };
    res.render('error', details);
});


db.connect();



app.listen(port, () => {
    console.log('The web server has started on port ' + port);
});