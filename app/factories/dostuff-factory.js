"use strict";
//console.log("do stuff factory is loading");

app.factory("dostuffFactory", function(FBCreds, authFactory, $q, $http) {

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


	const getSingleMed = function(id){
		console.log("id", id);
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