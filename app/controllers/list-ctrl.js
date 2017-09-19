"use strict";

//console.log("list controller loading");

app.controller("listCtrl", function ($scope, $route, authFactory, listFactory, dostuffFactory, filterFactory, $location) {
	$scope.list = [];
	let user = authFactory.getCurrentUser();
	//$rootScope.showSearch = true;
    //$scope.searchText = filterFactory;

	const showAllLists = function () {
		//console.log("user is: ", authFactory.getCurrentUser());
		listFactory.getAllLists(user)
		.then((list) => {
			console.log("show all user lists:", list);
			$scope.list = list;
		});
	};

	$scope.deleteList = function (listId) {
		listFactory.deleteList(listId)
		.then( () => {
			$route.reload();
		});
	};

	$scope.deleteListwMeds = function (key) {
		let theItem = [];
		let itemDeleting = [];
		dostuffFactory.getMedsInList(key)
		.then((item) => {
			theItem.push(item);
			theItem.forEach((item) => {
				itemDeleting.push(item);
				let uglyId = Object.keys(itemDeleting[0]);
				uglyId.forEach((item) => {
					listFactory.deleteListandMeds(item);
				});
			});
		});
			$location.url("all-lists");
	}

	showAllLists();


});