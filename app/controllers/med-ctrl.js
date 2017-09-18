"use strict";

app.controller("medCtrl", function ($scope, $routeParams, dostuffFactory, listFactory, $route, $q, $http, FBCreds) {

$scope.medsInList = [];
    const showMedsInList = function () {
        dostuffFactory.getMedsInList($routeParams.itemId)
            .then((data) => {
                $scope.medsInList = data;
                $scope.medsInList.id = $routeParams.itemId;
                console.log("itemId from showMedsInList function:", data);
            })
            .then(() => {
                listFactory.getListName($routeParams.itemId)
                    .then((medsList) => {
                        $scope.allMedsListNames = medsList;
                        //console.log("$scope.allMedsListNames", $scope.allMedsListNames);
                    });
            });
    };

    $scope.deleteMed = function(itemId){
        dostuffFactory.deleteSingleMed(itemId)
        .then((irrelevant) => {
            showMedsInList();
        });
    };

showMedsInList();

});