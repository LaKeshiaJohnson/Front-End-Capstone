//Auth Factory handles firebase calls for authentication. Login/register with email/password and login with Google

"use strict";

app.factory("authFactory", function ($q, $http, FBCreds) {
	let currentUser = null;
	let addNewUserObj = [];

	const isAuthenticated = function () {
		return new Promise((resolve, reject) => {
			firebase.auth().onAuthStateChanged((user) => {
				if (user) {
					currentUser = user.uid;
                    //console.log("user", user.id);
					addNewUserObj.push({
						userEmail: user.email
					});
					resolve(true);
				}else {
					resolve(false);
				}
			});
		});
	};

    //gets current user
	const getCurrentUser = function() {
	return currentUser;
	};

	const getUserInfo = function() {
		return addNewUserObj;
	};

    //login with e-mail and password
	const logIn = function (userObj) {
        return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
            .catch(function (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
            });
    };

    const logOut = function () {
        console.log("logoutUser");
        return firebase.auth().signOut();
    };

    //register with e-mail and password
    const register = function (userObj) {
        return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
        .then(function addNewUser(userObj){
                let addNewUsertoFB = {
                    uid: userObj.uid,
                    userEmail: userObj.email  
                };

                addNewUserObj.push(addNewUsertoFB);
                console.log("newUSER.uid", addNewUsertoFB);
                let newObj = JSON.stringify(addNewUsertoFB);
                return $http.post(`${FBCreds.databaseURL}/users.json`, newObj)
                    .then((data) => {
                        //console.log("data", data);
                        return data;
                    }, (error) => {
                        let errorCode = error.code;
                        let errorMessage = error.message;
                        console.log("error", errorCode, errorMessage);
                    });
        })
        .catch(function (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
            });
    };

    //login with Google
    let provider = new firebase.auth.GoogleAuthProvider();

    let authWithProvider = function () {
        return firebase.auth().signInWithPopup(provider);
    };

    return {
            getCurrentUser, 
            logIn, 
            logOut, 
            register, 
            isAuthenticated, 
            authWithProvider, 
            getUserInfo
        };

});