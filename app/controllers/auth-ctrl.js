"use strict";
//console.log("auth controller take 1");
app.controller("authCtrl", function ($scope, $window, authFactory, $location) {

console.log("auth controller has loaded");
$scope.account = {
	email: "",
	password: ""
};
	
	$scope.register = () => {
		authFactory.register({
			email: $scope.account.email,
			password: $scope.account.password
		})
		.then((userData) => {
			console.log("user controller - newUser", userData);
			$scope.logIn();
		}, (error) => {
			console.log("error creating a new user", error);	
		});
	};

	$scope.logIn = () => {
		console.log("you clicked on the login button");
		authFactory.logIn($scope.account)
		.then ( () => {
			//$window.location.href = "#!/all-lists";
			$location.path("#!/all-lists");
                //$scope.apply();
		});
	};

	 $scope.loginGoogle = () => {
        console.log("you clicked on google login");
        authFactory.authWithProvider()
            .then((result) => {
                let user = result.user.uid;
                //console.log("USER:", user);
                $location.path("#!/all-lists");
                $scope.apply();
            }).catch((error) => {
                console.log("error with google login");
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("errors", errorCode, errorMessage);
            });

    };

});

