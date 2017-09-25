"use strict";

//console.log("list controller loading");

app.controller("listCtrl", function ($scope, $route, authFactory, listFactory, dostuffFactory, filterFactory, $location, $window) {
	$scope.list = [];
	let user = authFactory.getCurrentUser();
	//$rootScope.showSearch = true;
    //$scope.searchText = filterFactory;

	const showAllLists = function () {
		//console.log("user is: ", authFactory.getCurrentUser());
		listFactory.getAllLists(user)
		.then((list) => {
			//console.log("show all user lists:", list);
			$scope.list = list;
		});
	};


	$scope.deleteList = function (id) {
		//console.log("ID", id);
		listFactory.deleteList(id)
		.then( (data) => {
			dostuffFactory.getMedsInList(id)
			.then((medsInList) => {
				//console.log("meds in list:", medsInList);
				medsInList.forEach((med) => {
					//console.log("MED", med);
					dostuffFactory.deleteSingleMed(med.id);
				});
				
			});
			
			$route.reload();
		});
	};


$scope.print = function(){
	$window.print();
};

	showAllLists();

});