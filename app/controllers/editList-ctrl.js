"use strict";

app.controller("editListCtrl", function($scope, listFactory, $location, authFactory, $routeParams){

	$scope.title = "Edit Title of Medication List";
	$scope.submitButtonText = "Submit";
	
	let user = authFactory.getCurrentUser();

		$scope.list = {
		title: "",
		uid: user
	};

   const showEditList = function(){
    	listFactory.getSingleList($routeParams.itemId)
    	.then((data) => {
    		console.log("EDIT LIST DATA", data);
    		$scope.list = data;
    		$scope.list.id = $routeParams.itemId;
    		console.log ("is ID HERE now?", $scope.list.id);
    	});
    };

	$scope.submitList = function(){
		listFactory.editList($routeParams.itemId, $scope.list)
		.then((data) => {
			$location.path("/all-lists");
		});
	};

	showEditList();
});
