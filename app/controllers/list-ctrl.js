"use strict";

//console.log("list controller loading");

app.controller("listCtrl", function ($scope, $route, authFactory, listFactory) {
	$scope.list = [];
	let user = authFactory.getCurrentUser();

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


	showAllLists();

});