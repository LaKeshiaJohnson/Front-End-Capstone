'use strict';

 //console.log("nav controller loading");

app.controller("navCtrl", function($scope, $window, $routeParams, authFactory){

    $scope.isLoggedIn = false;
    
    $scope.logout = () => {
        authFactory.logOut();
        $window.location.reload();
      };

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          $scope.isLoggedIn = true;
          console.log("current user logged in?", user);
          // console.log("logged in t-f", $scope.isLoggedIn );
          $scope.$apply();
        } else {
          $scope.isLoggedIn = false;
          console.log("user logged in?", $scope.isLoggedIn);
          $window.location.href = "#!/login";
        }
      });
});