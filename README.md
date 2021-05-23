# blueprint by S11G28
<p><img src="https://github.com/DLSU-CCAPDEV/2021T2-G28/blob/15ec5b6bf1ae579b7bd4a88375c06626d0887f23/images/logo.png" width="400px"></p>

`blueprint` is a collaborative scheduling and note-taking app. It allows its users to join classes to find their classmates, and collaborate smartly and effectively. It has three main features: (1) discussion board where the users can open intelligent conversations about topics, (2) note sharing boards to share your knowledge with your classmates, and (3) class requirements calendar to make sure that you won’t miss a single thing!

## Authors
- **Francheska Josefa Vicente**
- **Sophia Danielle S. Vista**

## Setting up
### How to set up and run the project locally through a NodeJS Server:
1. Extract the folder from the zipped file that you can download through [here](https://github.com/DLSU-CCAPDEV/2021T2-G28/archive/refs/heads/deployed.zip)
3. Naviate to the project project (using the cd command) 
(i.e. the main folder containing the file app.js)
4. Run the command in order to install all the modules needed in order to run the project successfully:
```
npm install 
```
5. We may now run the server by typing ```node app.js```
6. Since the web application is running on localhost:3000, type ```http://localhost:3000``` on your browser of choice.
7. Now, do not forget to sign up to access all the features of the application!

### Online
You can also access this project through this Heroku [link](https://blueeprint.herokuapp.com/).

## Getting your way around the Web Application
These are the different pages that would help your collaborate with your classmates and friends! Opening the web application would land you on the website splash page. Here, you would see the Sign Up and Log In button to access the application.

![alt text](https://github.com/DLSU-CCAPDEV/2021T2-G28/blob/phase-2/readme_images/splash.png "Splash Page")

### Register
To use the different features of the application, a user needs to register. All fields need to be filled up with information that passes the requirements set up by the creators. Note that the username entered should be unique.

![alt text](https://github.com/DLSU-CCAPDEV/2021T2-G28/blob/phase-2/readme_images/signup.png "Sign Up Page")

### Log In
Using the information you used to register, login.

![alt text](https://github.com/DLSU-CCAPDEV/2021T2-G28/blob/phase-2/readme_images/login.png "Login Page")

### Your Calendar and Tasks
In the home page, the user would be able to see all the tasks and requirements for all of their classes for that month. This is the landing page for all of the users that has an existing session in the web application.

![alt text](https://github.com/DLSU-CCAPDEV/2021T2-G28/blob/phase-2/readme_images/home.png "Home Page")

### Your Class Schedule
In this page, the user would be able to see all the classes that they added, and their schedule for the week.

![alt text](https://github.com/DLSU-CCAPDEV/2021T2-G28/blob/phase-2/readme_images/sched.png "Schedule Page")

### Searching and Adding Classes
A user may search for their class using the course code or the course name. Once they have found their class, they can add the class and start connecting with their classmates.

![alt text](https://github.com/DLSU-CCAPDEV/2021T2-G28/blob/phase-2/readme_images/add-class.png "Add a class Page")

### Creating a Class
If a user's class does not yet exist, they may choose to create the class.

![alt text](https://github.com/DLSU-CCAPDEV/2021T2-G28/blob/phase-2/readme_images/create-class.png "Create a class Page")

### Dropping a Class
A user may also choose to drop a class from their list of classes.

![alt text](https://github.com/DLSU-CCAPDEV/2021T2-G28/blob/phase-2/readme_images/drop-class.png "Drop Page")

### Finding your Classes
All of the user's added class can be found in the dashboard. Clicking any of the classes in this list would redirect the user to their class' home page.

![alt text](https://github.com/DLSU-CCAPDEV/2021T2-G28/blob/phase-2/readme_images/dashboard.png "Dashboard Page")

### Class Information
This page holds the information for the class.

![alt text](https://github.com/DLSU-CCAPDEV/2021T2-G28/blob/phase-2/readme_images/class-home.png "Class Information Page")

### Discussions
This feature allows users to add a discussion thread, comment on existing thread, and edit and delete threads that they have created. To access a specific post, just click on the discussion title.

![alt text](https://github.com/DLSU-CCAPDEV/2021T2-G28/blob/phase-2/readme_images/class-disc.png "Class Discussions Page")

### Requirements
In this page, a user may see, modify and remove the requirements for that class.

![alt text](https://github.com/DLSU-CCAPDEV/2021T2-G28/blob/phase-2/readme_images/class-reqs.png "Class Requirements Page")

### Notes
A user may view, edit, delete and comment on the notes that their classmates added.

![alt text](https://github.com/DLSU-CCAPDEV/2021T2-G28/blob/phase-2/readme_images/class-notes.png "Class Notes Page")

### Profile
In this page, you would be able to see the your profile and information. A user may also click on the picture to change their profile picture. This page also holds the Log Out button that the user needs to use to log out their account.

![alt text](https://github.com/DLSU-CCAPDEV/2021T2-G28/blob/phase-2/readme_images/user-profile.png "User Profile Page")

### Edit Profile
This page allows you to change the information your profile. By leaving the text boxes blank, it means that you do not want to change these fields. However, the user's current password is needed to change the information.

![alt text](https://github.com/DLSU-CCAPDEV/2021T2-G28/blob/phase-2/readme_images/edit-profile.png "Edit Profile Page")

### See the Profile and Schedule of your classmates
A user may also access their classmate's profile and schedule through clicking their name in the class list. Using this, they may collaborate remotely as they can schedule their meetings easier.

![alt text](https://github.com/DLSU-CCAPDEV/2021T2-G28/blob/phase-2/readme_images/other-user.png "Other Users Page")

##Dependencies
- bcrypt
- body-parser
- connect-mongo
- dotenv
- express
- express-handlebars
- express-validator
- express-session
- mongodb
- mongoose
- multer
- path


## External Libraries
- [Bootstrap](https://github.com/twbs/bootstrap) 
- [Timepicker](https://github.com/jonthornton/jquery-timepicker)
- [validator.js](https://github.com/validatorjs/validator.js)

## Resources
- [Unsplash](https://unsplash.com/)
- [Google Fonts](https://fonts.google.com/)

## Photo Credits
- [Dom Fou](https://unsplash.com/@domlafou?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/university?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- [NeONBRAND](https://unsplash.com/@neonbrand?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/classroom?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- [John Schnobrich](https://unsplash.com/@johnschno?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/collaborate?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- [Eric Rothermel](https://unsplash.com/@erothermel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/calendar?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- [Akson](https://unsplash.com/@akson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/communication?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
