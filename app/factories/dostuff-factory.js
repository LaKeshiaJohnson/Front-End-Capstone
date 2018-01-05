//dostuff factory handles firebase calls for medications

"use strict";

app.factory("dostuffFactory", function(FBCreds, authFactory, $q, $http) {

//adding a new medication to firebase. 
//called from addMed-ctrl.js
    const addNewMed = function(obj) {
        let newObj = JSON.stringify(obj);
        return $http.post(`${FBCreds.databaseURL}/meds.json`, newObj)
            .then((data) => {
                //console.log("data", data);
                return data;
            }, (error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
            });
    };

//Call to firebase to get all of the medications in a particular/single list
//called from med-ctrl.js
//Each med has a med id and a list id. Want to get all the meds with the list id of the current list. 
	const getMedsInList = function (listId) {
        let medsInList = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/meds.json?orderBy="listid"&equalTo="${listId}"`)
                .then((medsList) => {
                    let medsListCollection = medsList.data;
                    Object.keys(medsListCollection).forEach((key) => {
                        medsListCollection[key].id = key;
                        medsInList.push(medsListCollection[key]);
                    });
                    console.log("medsInList!", medsInList);
                    resolve(medsInList);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

//call to firebase to get a single medication. aused in editing med.
//called from editMed-ctrl.js
	const getSingleMed = function(id){
		//console.log("id", id);
        return $q((resolve, reject) =>{
            $http.get(`${FBCreds.databaseURL}/meds/${id}.json`)
            .then((itemObj) => {
            	//console.log("item object", itemObj.data);
            	let singleMed = itemObj.data;
            	//console.log("SINGLE MED ID", singleMed.id);
                resolve(singleMed);
            })
            .catch((error) => {
                reject(error);
            });
        });
    };

//Deleting a single medication from firebase
//called from med-ctrl.js
    	const deleteSingleMed = function(itemId){
    		console.log("item id", itemId);
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/meds/${itemId}.json`)
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

//editing med info that's in firebase
//called from editMed-ctrl.js
	const editMed = function(medId, obj) {
        console.log("id and obj to update", medId, obj);
        return $q((resolve, reject) => {
            let newObj = angular.toJson(obj);
            $http.patch(`${FBCreds.databaseURL}/meds/${medId}.json`, newObj)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    };

return {getMedsInList, addNewMed, deleteSingleMed, editMed, getSingleMed};

});