"use strict";
console.log("show stuff controller");
app.controller("getStuffCtrl", function($scope, dostuffFactory) {


dostuffFactory.getAllLists()
        .then(function(listCollection) {
            let listArray = [];
            console.log("LIST ARRAY", listArray);
            let listKeys = Object.keys(listCollection);
            listKeys.forEach((item) => {
                listArray.push(listCollection[item]);
            });
            console.log("listCollection", listCollection);
            $scope.list = listArray;
        });

});