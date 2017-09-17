'use strict';

app.controller("editMedCtrl", function($scope, $location, $routeParams, dostuffFactory, authFactory, $route) {

    $scope.title = "Edit Medication";
    $scope.submitButtonText = "Edit";

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
const showEditMed = function(){
        dostuffFactory.getSingleMed($routeParams.itemId)
        .then((data) => {
            console.log("DATAAAAAAA", data);
            $scope.meds = data;
            $scope.meds.id = $routeParams.itemId;
        });

    };

            //aka submit edited medication
    $scope.editThisMed = function(){
        dostuffFactory.editMed($routeParams.itemId, $scope.meds)
        .then((data) => {
            //$location.url("#!/meds/:itemId");
            $location.path("#!/meds/{{item.id}}");
            //$route.reload();
        });

    };

showEditMed();

});