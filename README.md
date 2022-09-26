# reddit-clone

## By Matt Herbert, Alex Shevlin, and Tyler Emmerson

#### A webpage that appears and acts like Reddit. This webpage was built using React, CSS, HTML & Firebase.

## Technologies Used

* React
* Html
* CSS
* Bootstrap
* Firebase

## Description

 This webpage was built as a clone to the popular social media website, Reddit. This project provides users with the ability to create an account, make posts, and comment on posts written by themselves and other users. Full CRUD is provided to the users by also allowing for editing and deleting posts/comments. The backend is handled by Firebase which also handles authentication/authorization.

## Setup/Installation

* Copy the git repository url
* Open a shell program & navigate to your machine's desktop
* Clone the repository using the copied URL and the "git clone" command
* In the shell program, navigate to the root directory of the newly created file called "reddit-clone"
* Next, run the "npm install" command to install dependencies
* Install firebase with "npm install firebase"
* On the [firebase](https://firebase.google.com/) website, login in with your gmail account and follow the steps to create a project
* Once you create your project be sure to add authentication and firestore database functionalites which can be found under the "build" tab on the "console" page
* In addition, you must add your firebase config settings to a .env file in the root directory of your project, the formatting should match what is in the firebase.js file
* Now in the root directory type "npm run start" to start the program
* If the web page does not open on it's own, open a web browser and plug "http://localhost:3000/" into the URL bar

## Known Bugs

* Edit functionality doesn't work when accessed through post details page
* Scroll to top function will crash the page if not logged in, just click close on the error message and log-in
* Username doesn't appear in navbar when logging in during a new session, just refresh the page and it will appear and persist

## License

[MIT](LICENSE)

Copyright (c) 2022 Matt Herbert, Alex Shevlin, Tyler Emmerson