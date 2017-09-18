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
        listid: $routeParams.medId,

    };
const showEditMed = function(){
    //console.log("valid id", $routeParams.itemId);
        dostuffFactory.getSingleMed($routeParams.medId)
        .then((data) => {
            //console.log("DATA from showEditedMed function:", data);
            $scope.meds = data;
            $scope.meds.id = $routeParams.medId;
        });

    };
showEditMed();

            // submit edited medication
    $scope.editThisMed = function(){
        
        dostuffFactory.editMed($routeParams.medId, $scope.meds)
        .then((data) => {
            //$location.url("#!/meds/:itemId");
            $location.path("#!/meds/{{item.id}}");
            //$route.reload();
        });

    };

showEditMed();

});