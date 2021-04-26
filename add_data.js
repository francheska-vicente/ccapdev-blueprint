const db = require('./models/db.js');

const collection1 = 'profiles';
const collection2 = 'classes';

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

db.insertOne(collection1, user);

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

db.insertOne(collection1, user);

var user = {
    fName: 'Sophia',
    lName: 'Vista',
    bio: 'ehe',
    username: 'sophia-vista',
    email: 'sophia_danielle_vista@dlsu.edu.ph',
    bday: 'January 8, 2001',
    phone: '+639170004321',
    uni: 'De La Salle University - Manila',
    degree: 'Computer Science'
};

db.insertOne(collection1, user);

var user = {
    fName: 'Francheska',
    lName: 'Vicente',
    bio: 'The code that only the prof knows.',
    username: 'francheska_vicente',
    email: 'francheska_vicente@dlsu.edu.ph',
    bday: 'October 22, 2000',
    phone: '+639170009999',
    uni: 'De La Salle University - Manila',
    degree: 'Computer Science'
};

db.insertOne(collection1, user);

var user = {
    fName: 'Alexadria',
    lName: 'Ramos',
    bio: 'Animo La Salle!',
    username: 'alexadria_ramos',
    email: 'alexadria_ramos@dlsu.edu.ph',
    bday: 'December 16, 1999',
    phone: '+639170005555',
    uni: 'De La Salle University - Manila',
    degree: 'Computer Science'
};

db.insertOne(collection1, user);

var user = {
    fName: 'Alexandra',
    lName: 'Dela Pena',
    bio: 'Let your dreams be your wings!',
    username: 'alexandra_delapena',
    email: 'alexandra_delapena@dlsu.edu.ph',
    bday: 'March 29, 2001',
    phone: '+639170008888',
    uni: 'De La Salle University - Manila',
    degree: 'Computer Science'
};

db.insertOne(collection1, user);

var user = {
    fName: 'Alexa',
    lName: 'Dela Cruz',
    bio: 'Semicolon is my greatest weakness, but programming is my greatest strength.',
    username: 'alexa_delacruz',
    email: 'alexa_delacruz@dlsu.edu.ph',
    bday: 'October 09, 2000',
    phone: '+639170004444',
    uni: 'De La Salle University - Manila',
    degree: 'Computer Science'
};

db.insertOne(collection1, user);

var course = {
    classname: 'Web Application Development',
    coursecode: 'CCAPDEV',
    professor: 'Mr. Arren Matthew Antioquia',
    classtimeA: '1430 - 1600',
    classdayA: 'Monday',
    classtimeB: '1430 - 1600',
    classdayB: 'Wednesday'
};

db.insertOne(collection2, course);

var course = {
    classname: 'Introduction to Computer Organization and Architecture',
    coursecode: 'CSARCH1',
    professor: 'ausdkhjl',
    classtimeA: 'asdasd',
    classdayA: 'Tuesday',
    classtimeB: 'dfgdg',
    classdayB: 'Thursday'
};

db.insertOne(collection2, course);

var course = {
    classname: 'Physical Fitness and Wellness in Team Sports',
    coursecode: 'GETEAMS',
    professor: 'ausdkhjl',
    classtimeA: 'asdasd',
    classdayA: 'Thursday',
    classtimeB: 'N/A',
    classdayB: 'N/A'
};

db.insertOne(collection2, course);

var course = {
    classname: 'Advanced Algorithms and Complexities',
    coursecode: 'STALGCM',
    professor: 'ausdkhjl',
    classtimeA: 'asdasd',
    classdayA: 'Monday',
    classtimeB: 'dfgdg',
    classdayB: 'Tuesday'
};

db.insertOne(collection2, course);

var course = {
    classname: 'Integral Calculus for Computer Science Students',
    coursecode: 'ST-MATH',
    professor: 'ausdkhjl',
    classtimeA: 'asdasd',
    classdayA: 'Monday',
    classtimeB: 'dfgdg',
    classdayB: 'Wednesday'
};

db.insertOne(collection2, course);