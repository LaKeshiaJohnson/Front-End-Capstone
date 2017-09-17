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
        //console.log("hmmm...");
        dostuffFactory.addNewMed($scope.meds)
            .then((data) => {
                $location.url("#!/meds/{{item.id}}");
                $route.reload();
            });
    };

/*$scope.medsInList = [];
    const showListwMeds = function () {
        dostuffFactory.getMedsInList($routeParams.itemId)
            .then((data) => {
                $scope.medsInList = data;
                $scope.medsInList.id = $routeParams.itemId;
                console.log("itemId", data);
            })
            .then(() => {
                dostuffFactory.getListName($routeParams.itemId)
                    .then((medsList) => {
                        $scope.allMedsListNames = medsList;
                        //console.log("$scope.allMedsListNames", $scope.allMedsListNames);
                    });
            });
    };

    $scope.deleteMed = function(itemId){
        dostuffFactory.deleteSingleMed(itemId)
        .then((irrelevant) => {
            showListwMeds();
        });
    };

showListwMeds();*/

});