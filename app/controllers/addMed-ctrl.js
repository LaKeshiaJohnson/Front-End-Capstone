'use strict';

app.controller("addMedCtrl", function($scope, $location, $routeParams, dostuffFactory, authFactory, $route) {

    $scope.title = "Add New Medication";
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
        listid: $routeParams.itemId,

    };

    $scope.submitMed = function() {
        dostuffFactory.addNewMed($scope.meds)
            .then((data) => {
                //console.log("DATAAAAA from add med ctrl", data);
                $scope.meds.id = data.data.name;
                dostuffFactory.editMed(data.data.name, $scope.meds)
            .then((taco) => {
                // $location.url(`#!/meds/${$scope.meds.listid}`);
                 $route.reload();
            });
                
            });
    };

});