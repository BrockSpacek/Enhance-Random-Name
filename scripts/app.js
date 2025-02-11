import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from './localstorage.js';
// IDs
const nameInput = document.getElementById("nameInput");
const groupNumberInput = document.getElementById("groupNumberInput");

const addNameBtn = document.getElementById("addNameBtn");
const generateGroupBtn = document.getElementById("generateGroupBtn");

const namesList = document.getElementById("namesList");


// Buttons 
addNameBtn.addEventListener('click', () => {
    
        let Name = nameInput.value

        if (Name) {
            saveToLocalStorage(Name);
            nameInput.value = '';
        }
})

generateGroupBtn.addEventListener('click', () => {

})



// Local Storage

function displayNames() {
    let names = getFromLocalStorage();
    namesList.innerHTML = ''; 
    

    names.forEach((Name, index) => {
       
    
        let NameItem = document.createElement('div');
        NameItem.className = 'bg-white p-2 rounded flex justify-between';

        let NameList = document.createElement('div');
        NameList.textContent = Name.name;


        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'bg-red-500 text-white px-2 rounded';
        deleteBtn.addEventListener('click', () => {
            deleteName(index);
        });

        let nameContainer = document.createElement('div');
       
        nameContainer.appendChild(deleteBtn);

        NameItem.appendChild(NameList);
        NameItem.appendChild(nameContainer);

        namesList.appendChild(NameItem);
    });

   
   
}

function deleteName(index) {
    let Name = getFromLocalStorage();
    Name.splice(index, 1);
    localStorage.setItem('Name', JSON.stringify(Name));
    displayNames();
}

displayNames();