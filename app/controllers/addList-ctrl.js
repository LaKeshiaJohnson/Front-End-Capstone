"use strict";
console.log("add list controller is loading");

app.controller("addListCtrl", function($scope, dostuffFactory, authFactory, $location, $route) {

	$scope.title = "New Medication List";
	$scope.submitButtonText = "Add New List";
	let user = authFactory.getCurrentUser();

	$scope.list = {
		title: "",
		uid: user
	};

	$scope.submitList = function () {
		dostuffFactory.addNewList($scope.list)
			.then((data) => {
				$location.url("/all-lists"); //"#!""
				$route.reload();
			});
	};

});
