import {getCurrentRecipe, isTea, swapToTeaColorTheme} from '../utils/utils.js';


// Once the HTML document has been completely parsed and all deferred scripts have downloaded and executed, call the init function

window.addEventListener('DOMContentLoaded', init);

/*
* The init function initializes the webpage that enables a user
* to input recipe data using a form then save the data into
* local storage once they click the save button.
* The user may also click the time button to access the timer screen
* or click the delete button to discard the current recipe.
*/
function init() {
    let index = localStorage.getItem('index'); // Get index from local storage and assign to 'index' var
    let recipe = getCurrentRecipe(); // Calls getCurrentRecipe and assigns selected recipe to 'recipe' var
    let id = recipe['id']; // Assign the recipe's id to 'id' variable
    let tea = isTea(recipe); // Determines whether the recipe is a tea recipe or a coffee recipe

    if (tea) { // If it is a tea recipe,
        swapToTeaColorTheme(); // Change the style so that it matches the tea theme
    }
    
    let input = document.querySelectorAll('input'); // Assign all user input into 'input' variable
    input.forEach((el) => { // For each element in the input,
        el.value = recipe[el.name]; // let the value of the element be the recipe of the element's name
    });
    let saveButton = document.querySelector('.savethisrecipe'); // Select save recipe button and assign to 'saveButton'
    let timeButton = document.querySelector('.timeButton'); // Select time button and assign to 'timeButton'
    let deleteButton = document.querySelector('.delete'); // Select delete button and assign to 'deleteButton'
    let formEl = document.querySelector('form'); // Select form and assign to 'formEl'

    /*
    * When the save button is clicked:
    * 1. Add the recipe with user's input to local storage
    * 2. Add index+1 to local storage
    * 3. Return to the home screen
    */
    saveButton.addEventListener('click', () => {

        let formData = new FormData(formEl);
        let recipeObject = {
            id: id,
            Drink_Type: tea ? "tea" : "coffee"
        };

        for (const pair of formData.entries()) { // For every pair of [string, entry value] entries in the form data,
            recipeObject[pair[0]] = pair[1]; // Assign the entry value to the id of the string
        }
        localStorage.setItem(`newRecipe${index}`, JSON.stringify(recipeObject)); // Add new recipe to the local storage
        localStorage.setItem('index', parseInt(index)+1); // Add one to the index in the local storage

        window.location.href='./HomeScreen.html'; // Return to home screen
    });

    /*
    * When the time button is clicked:
    * 1. Add new recipe to the local storage
    * 2. From HTML file, go to timer screen on click
    */
    timeButton.addEventListener('click', () => {
        let formData = new FormData(formEl);
        let recipeObject = {
            id: id,
            Drink_Type: tea ? "tea" : "coffee"
        };
        for (const pair of formData.entries()) { // For each pair of [string, entry value] entries in the form data, 
            recipeObject[pair[0]] = pair[1]; // Assign the entry value to the id of the string
        }
        localStorage.setItem(`newRecipe${index}`, JSON.stringify(recipeObject)); // Add new recipe to the local storage
    });

    /*
    * When the delete button is clicked:
    * 1. Remove the recipe from the local storage
    */
    deleteButton.addEventListener('click', () => {
        localStorage.removeItem(`newRecipe${index}`); 
});
}