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
		templateUrl: 'partials/allLists.html',
		controller: "listCtrl",
			resolve: {isAuth}
	})
	.when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'authCtrl'
	})
	.when('/all-lists', {
		templateUrl: 'partials/allLists.html',
		controller: "listCtrl",
		resolve: {isAuth}
	})
	.when('/list/:itemId/edit', {
		templateUrl: 'partials/addList.html',
		controller: 'editListCtrl',
		resolve: {isAuth}
	})
	.when('/add-list', {
		templateUrl: 'partials/addList.html',
		controller: "addListCtrl",
		resolve: {isAuth}
	})
	/*.when('/add-med', {
			templateUrl: 'partials/addMed.html',
			controller: "addMedCtrl",
			resolve: {isAuth}
	})*/
	.when('/meds/:itemId', {
		templateUrl: 'partials/singleList.html',
		controller: "medCtrl",
		resolve: {isAuth}
	})
	.when('/meds/:medId/edit', {
		templateUrl: 'partials/editmed.html',
		controller: "editMedCtrl",
		resolve: {isAuth}
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
