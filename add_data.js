const db = require('./models/db.js');


const collection = 'profiles';

db.createDatabase();

var user = {
    fName: 'Harry',
    lName: 'Potter',
    bio: 'The best error message is the one that never shows up.',
    username: 'harry_potter',
    email: 'harry_potter@dlsu.edu.ph',
    bday: 'July 31, 2000',
    phone: '+639174444576',
    uni: 'De La Salle University - Manila',
    degree: 'Computer Science'
};

db.insertOne(collection, user);

var user = {
    fName: 'Venti',
    lName: 'Bard',
    bio: 'Yahoo!',
    username: 'venti-the-bard',
    email: 'venti_bard@dlsu.edu.ph',
    bday: 'June 16, 2001',
    phone: '+639170001234',
    uni: 'De La Salle University - Manila',
    degree: 'Computer Science'
};

db.insertOne(collection, user);