"use strict";
//console.log("list factory is loading");

app.factory("listFactory", function(FBCreds, authFactory, $q, $http) {

	const getAllLists = function(user) {
        let list = [];
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/list.json?orderBy="uid"&equalTo="${user}"`)
                .then((listObject) => {
                    let listCollection = listObject.data;
                   // console.log("LIST COLLECTION DATA", listCollection);
                    Object.keys(listCollection).forEach((key) => {
                        listCollection[key].id = key;
                        list.push(listCollection[key]);
                        //console.log("LIST ARRAY", list);
                        //console.log("", key);

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

    	const getListName = function(listId) {
        return $q((resolve, reject) => {
            $http.get(`${FBCreds.databaseURL}/list/${listId}.json`)
                .then((listInfo) => {
                    let listInfoCollection = listInfo.data;
                   // console.log("listInfoCollection", listInfoCollection);
                    let singleListName = listInfoCollection.title;
                    //console.log("singleListName:", singleListName);
                    resolve(singleListName);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const getSingleList = function(itemId){
        return $q((resolve, reject) =>{
            $http.get(`${FBCreds.databaseURL}/list/${itemId}.json`)
            .then((itemObj) => {
                resolve(itemObj.data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    };

     const editList = function(id, obj) {
        console.log("id and obj to update", id, obj);
        return $q((resolve, reject) => {
            let newObj = JSON.stringify(obj);
            $http.patch(`${FBCreds.databaseURL}/list/${id}.json`, newObj)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    };



    return { 
    		getAllLists,
    		addNewList,
    		deleteList,
    		getListName,
    		getSingleList,
    		editList
 		};
});
