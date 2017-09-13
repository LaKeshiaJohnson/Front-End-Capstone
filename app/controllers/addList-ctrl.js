"use strict";
console.log("add list controller is loading");

app.controller("addListCtrl", function($scope, userListFactory, authFactory, $location, $route) {

	$scope.title = "New Medication List";
	$scope.submitButtonText = "Add New List";
	let user = authFactory.getCurrentUser();

	$scope.list = {
		title: "",
		uid: user
	};

	$scope.submitList = function () {
		UserList.addNewList($scope.list)
			.then((data) => {
				$location.url("#!/");
				$route.reload()
			});
	};

});
