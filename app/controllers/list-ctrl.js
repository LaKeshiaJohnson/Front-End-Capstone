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


	$scope.deleteList = function (id) {
		//console.log("IIIDDDD", id);
		listFactory.deleteList(id)
		.then( (data) => {
			dostuffFactory.getMedsInList(id)
			.then((medsInList) => {
				console.log("meds in listttttt:", medsInList);
				//dostuffFactory.deleteSingleMed(singleMed);

				medsInList.forEach((med) => {
					console.log("MEDDDDD", med);
					dostuffFactory.deleteSingleMed(med.id);
				});
				
			});
			
			$route.reload();
		});
	};



/*$scope.deleteList = function (listId) {
		listFactory.deleteList(listId)
		.then( () => {
			$route.reload();
		});
	};*/


/*function myFunction() {
    $window.print();
}*/
/*$scope.printStuff = function(){
	window.print();
};
*/
	showAllLists();

});