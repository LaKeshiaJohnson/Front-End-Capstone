"use strict";
console.log("do stuff factory is loading");

app.factory("dostuffFactory", function(FBCreds, authFactory, $q, $http) {

	const getAllLists = function(user) {
        let list = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/list.json?orderBy="uid"&equalTo="${user}"`)
                .then((listObject) => {
                    let listCollection = listObject.data;
                    console.log("LIST COLLECTION DATA", listCollection);
                    //console.log("listCollection:", listCollection);
                    Object.keys(listCollection).forEach((key) => {
                        listCollection[key].id = key;
                        list.push(listCollection[key]);
                        //console.log("LIST ARRAY", list);
                        console.log("", key);

                    });
                    resolve(list);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const addNewList = function(obj) {
		let newObj = JSON.stringify(obj);
		return $http.post(`${FBCreds.databaseURL}/list.json`, newObj)
		.then ( (data) => {
			//console.log("list data:", data);
			return data;
		}, (error) => {
			let errorCode = error.code;
            let errorMessage = error.message;
            console.log("error", errorCode, errorMessage);
		});
	};

	const deleteList = function(listId) {
        return $q((resolve, reject) => {
            $http.delete(`${FBCreds.databaseURL}/list/${listId}.json`)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const addNewMed = function(obj) {
        let newObj = JSON.stringify(obj);
        return $http.post(`${FBCreds.databaseURL}/meds.json`, newObj)
            .then((data) => {
                console.log("data", data);
                return data;
            }, (error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error", errorCode, errorMessage);
            });
    };
  /**********  ABOVE THIS LINE WORKS, BELOW THIS LINE IS A MESS *********/
	const getListName = function(listId) {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/list/${listId}.json`)
                .then((listInfo) => {
                    let listInfoCollection = listInfo.data;
                   // console.log("listInfoCollection", listInfoCollection);
                    let singleListName = listInfoCollection.title;
                    console.log("singleListName:", singleListName);
                    resolve(singleListName);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };


/*	const getAllMeds = function(user) {
		let meds = [];
		console.log("url is:", `${FBCreds.databaseURL}/meds.json?orderBy="uid"&equalTo="${user}"`);
		return $q( (resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/meds.json?orderBy="uid"&equalTo="${user}"`)
			.then(medObject) => {
				let medCollection = medObject.data;
				console.log("medCollection: ", medCollection);
				Object.keys(medCollection).forEach((key) => {
					medCollection[key].id = key;
					meds.push(medCollection[key]);
				});
				resolve(meds);
				}
				.catch((error) => {
					reject(error);
			});
		});
	};
*/


const getMedsInList = function (listId) {

        let medsInList = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/meds.json?orderBy="listid"&equalTo="${listId}"`)
                .then((medsList) => {
                    let medsListCollection = medsList.data;
                    console.log("meds list data", medsList.data);
                    let medKeys = Object.keys(medsListCollection);
                    console.log("med KEYS", medKeys);
                    console.log("medsListCollection", medsListCollection);
                    Object.keys(medsListCollection).forEach((key) => {
                        medsListCollection[key].id = key;
                        medsInList.push(medsListCollection[key]);
                    });
                    console.log("medsInList", medsInList);
                    resolve(medsInList);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };


const getSingleMed = function(itemId){
        return $q((resolve, reject) =>{
            $http.get(`${FBCreds.databaseURL}/meds/${itemId}.json`)
            .then((itemObj) => {
                resolve(itemObj.data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    };

return {getAllLists, addNewList, deleteList, getListName, getMedsInList, addNewMed, getSingleMed};

});