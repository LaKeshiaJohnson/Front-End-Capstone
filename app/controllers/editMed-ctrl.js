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
    console.log("valid id", $routeParams.itemId);
        dostuffFactory.getSingleMed($routeParams.itemId)
        .then((data) => {
            //console.log("DATA from showEditedMed function:", data);
            $scope.meds = data;
            $scope.meds.id = $routeParams.itemId;
        });

    };
showEditMed();

            // submit edited medication
    $scope.editThisMed = function(){
        console.log("valid id2", $routeParams.itemId);
        //console.log("click event function", event);
        dostuffFactory.editMed($routeParams.itemId, $scope.meds)
        .then((data) => {
            //$location.url("#!/meds/:itemId");
            $location.path("#!/meds/{{item.id}}");
            //$route.reload();
        });

    };

showEditMed();

});