function saveToLocalStorage(Name){

    let NameArr = getFromLocalStorage();

    if(!NameArr.includes(Name)){
        NameArr.push(Name);
    }

    localStorage.setItem('Name', JSON.stringify(NameArr));

}

function getFromLocalStorage(){
    let localStorageData = localStorage.getItem('Name');

    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(Name){

    let localStorageData = getFromLocalStorage();

    let NameIndex = localStorageData.indexOf(Name);

    localStorageData.splice(NameIndex, 1);

    localStorage.setItem('Name', JSON.stringify(localStorageData));
}



export{ saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage }