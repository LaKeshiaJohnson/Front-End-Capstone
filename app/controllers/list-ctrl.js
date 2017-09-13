"use strict";

console.log("list controller loading");

app.controller("listCtrl", function ($scope, $route, authFactory, dostuffFactory) {
	$scope.list = [];
	let user = authFactory.getCurrentUser();

	const showAllLists = function () {
		console.log("user is: ", authFactory.getCurrentUser());
		dostuffFactory.getAllLists(user)

		.then((list) => {
			console.log("show all user lists:", list);
			$scope.list = list;
		});
	};

	$scope.deleteList = function (listId) {
		dostuffFactory.deleteList(listId)
		.then( () => {
			$route.reload();
		});
	};


	showAllLists();

});