import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from './localstorage.js';

// IDs
const nameInput = document.getElementById("nameInput");
const groupNumberInput = document.getElementById("groupNumberInput");
const groupAmountInput = document.getElementById("groupAmountInput");
const addNameBtn = document.getElementById("addNameBtn");
const generateGroupBtn = document.getElementById("generateGroupBtn");
const namesList = document.getElementById("namesList");
const groupModal = document.getElementById("groupModal");
const closeModal = document.getElementById("closeModal");
const groupsContainer = document.getElementById("groupsContainer");

// Buttons
addNameBtn.addEventListener('click', () => {
    let Name = nameInput.value;
    if (Name) {
        saveToLocalStorage(Name);
        nameInput.value = '';
        displayNames();
    }
});

generateGroupBtn.addEventListener('click', () => {
    const groupSize = parseInt(groupNumberInput.value);
    const groupAmount = parseInt(groupAmountInput.value);
    const names = getFromLocalStorage();
    
    if (names.length === 0) {
        console.log('Please add names first');
        return;
    }

    let groups = [];
    const mixedNames = names.sort(() => Math.random() - 0.5);

    // Formulas for random groups and getting them even as possible
    if (groupAmount) {
        
        for (let i = 0; i < groupAmount; i++) {
            groups[i] = [];
        }
        
      
        mixedNames.forEach((name, index) => {
            groups[index % groupAmount].push(name);
        });
    }
    
    else if (groupSize) {
        const numberOfGroups = Math.ceil(mixedNames.length / groupSize);
        
        for (let i = 0; i < numberOfGroups; i++) {
            groups[i] = [];
        }
        
        mixedNames.forEach((name, index) => {
            groups[index % numberOfGroups].push(name);
        });

    } else {
        console.log('Please enter either group size or number of groups');
        return;
    }
    
    displayGroups(groups);
    groupModal.classList.remove('hidden');
    groupNumberInput.value = '';
    groupAmountInput.value = '';
});


closeModal.addEventListener('click', () => {
    groupModal.classList.add('hidden');
});


function displayGroups(groups) {
    groupsContainer.innerHTML = '<h2 class="text-2xl font-bold mb-4">Random Groups</h2>';
    
    groups.forEach((group, index) => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'p-4 rounded mb-4';
        
        groupDiv.innerHTML = `<h3 class="font-bold mb-2">Group ${index + 1}:</h3> <p>${group.join(', ')}</p>`;
        groupsContainer.appendChild(groupDiv);
    });
}

// Local Storage
function displayNames() {
    let names = getFromLocalStorage();
    namesList.innerHTML = '';
    
    names.forEach((Name, index) => {
        let NameItem = document.createElement('div');
        NameItem.className = 'bg-white p-2 rounded flex justify-between';
        
        let NameList = document.createElement('div');
        NameList.textContent = Name;
        
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete Name';
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