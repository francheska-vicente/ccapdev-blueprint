const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const validator = require('validator');
const dotenv = require (`dotenv`);
const routes = require('./routes/routes.js');
const db = require('./models/db.js');
const multer = require('multer');

const app = express();
dotenv.config ();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.use(session({
    secret: 'blueprint',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 
        'mongodb+srv://admin:blueprint@blueprint.gykvx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' })
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
        },
        dateFormat : function (date) {
            var date = date.toString ().split (" ");
            var year = date [3];
            var month = date [1];
            var day = date [2];

            return (month + " " + day + ", " + year);
        },
        getDay : function (date) {
            var date = date.toString ().split (" ");
            var day = date [2];

            return day;
        }
    }
}));


app.use(bodyParser.urlencoded ({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'hbs');

app.use(express.static('public'));


app.use('/', routes);

app.use(function(err, req, res, next){
    res.status(err.status);
    res.render('error', { 
        error: err,
        code: err.status
     });
});

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
