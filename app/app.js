"use strict";
console.log("app.js is loading");

const app = angular.module("MedsList", ["ngRoute"]);

let isAuth = (authFactory) => new Promise ((resolve, reject) => {
	authFactory.isAuthenticated()
	.then( (userExists) => {
		if(userExists) {
			console.log("Authenticated, go ahead");
			resolve();
		}else {
			console.log("Authentication rejected. GO AWAY!");
			reject();
		}
	});
});


app.config(($routeProvider) => {
	$routeProvider
	.when('/', {
		templateUrl: 'patrials/allLists.html',
		controller: "",
			resolve: {isAuth}
	})
	.when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'authCtrl'
	})
	.when('/all-lists', {
		templateUrl: 'partials/allLists.html',
		controller: "",
		reslove: {isAuth}
	})
	.otherwise('/');
});


















// forces something to run when the app initially starts up
app.run(($location, FBCreds) => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain,
        databaseURL: creds.databaseURL
    };
    firebase.initializeApp(authConfig);
});