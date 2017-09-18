"use strict";
/*DONT NEED THIS CTRL*/
console.log("show stuff controller");
app.controller("getStuffCtrl", function($scope, dostuffFactory) {


dostuffFactory.getAllLists()
        .then(function(listCollection) {
            let listArray = [];
            //console.log("LIST ARRAY", listArray);
            let listKeys = Object.keys(listCollection);
            listKeys.forEach((item) => {
                listArray.push(listCollection[item]);
            });
            //console.log("listCollection", listCollection);
            $scope.list = listArray;
        });
/*

dostuffFactory.getAllMeds()
        .then(function(medCollection) {
            let medArray = [];
            // console.log(pinArray);
            let medKeys = Object.keys(medCollection);
            medKeys.forEach((item) => {
                medArray.push(medCollection[item]);
            });
            console.log("medCollection", medCollection);
            $scope.meds = medArray;
        });
*/
});