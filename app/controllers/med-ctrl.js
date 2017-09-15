/*"use strict";

app.controller("medsCtrl", function ($scope, $routeParams, dostuffFactory, $route, $q, $http, FBCreds) {

    $scope.medsInList = [];
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
                        console.log("$scope.allMedsListNames", $scope.allMedsListNames);
                    });
            });
    };

    $scope.deleteSingleMed = (medUglyId) => {
        return $q((resolve, reject) => {
            $http.delete(`${FBCreds.databaseURL}/meds/${medUglyId}.json`)
                .then((response) => {
                    resolve(response);
                    $route.reload();
                })
                .catch((error) => {
                    reject(error);
                });
                
        });
    };



    showListwMeds();
});*/