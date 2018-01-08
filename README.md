# Med List

Med List is an app that allows users to keep track of medications by creating med lists. Lists contain medication name, along with pertinent information about the medication such as dosage, directions for use, and special notes.

Med List is now live. See the deployed site [HERE](https://capstone-39282.firebaseapp.com)

## Getting Started

This project uses Angular JS, Firebase, and Grunt.

### Prerequisites

You will need to npm install the package.json file, and create an app/creds folder to hold your Firebase credentials.

### Installing

Create a creds directory inside of the app directory. Create a file name "fbcreds.js" inside of the creds directory, and paste the following code into your fbcreds.js. Replace "YourAPIKey" and "YourFirebaseAccount" with your API Key and project name from Firebase.

```
"use strict";

app.constant("fbcreds", {
    apiKey: "YourAPIKey",
    authDomain: "YourFirebaseAccount.firebaseapp.com",
    databaseURL: "https://YourFirebaseAccount.firebaseio.com"    
});
```

Enter the "lib" directory on the terminal and run:

```
npm install
```

After everything is installed, run grunt inside your lib folder:

```
grunt
```

## Built With
* [AngularJS](https://angularjs.org/) - Javascript framework.
* [Boostrap](https://getboostrap.com) - Open source toolkit for developing with HTML, CSS, and JS.
* [JS Hint](https://jshint.com) - A tool that helps to detect errors and potential problems in your JavaScript code.
* [Grunt](https://gruntjs.com) - Javascript task runner.
