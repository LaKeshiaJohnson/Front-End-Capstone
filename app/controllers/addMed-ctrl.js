'use strict';

app.controller("addMedCtrl", function($scope, $location, $routeParams, dostuffFactory, authFactory, $route) {

    $scope.title = "New Medication";
    $scope.submitButtonText = "Add";

    let user = authFactory.getCurrentUser();

    $scope.meds = {
        medname: "",
        uid: user,
        dose: "",
        reason: "",
        prescribedby: "",
        directions: "",
        notes: "",
        listid: $routeParams.itemId
    };

    $scope.submitMed = function() {
        console.log("hmmm...");
        dostuffFactory.addNewMed($scope.meds)
            .then((data) => {
                $location.url("/meds/:itemId");
                $route.reload();
            });
    };
});