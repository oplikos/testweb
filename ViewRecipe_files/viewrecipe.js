import { isTea, swapToTeaColorTheme, getSelectedRecipe } from "../utils/utils.js";


// Once the HTML document has been completely parsed and all deferred scripts have downloaded and executed, call the init function

window.addEventListener('DOMContentLoaded', init);

/*
* The init function initializes the webpage that enables the user to
* view, edit, save, and/or delete a brewing recipe for their coffee or tea.
* The function gets the selected recipe from local storage,
* then lets the user change inputs on the form as needed before
* saving the edited recipe and removing the former recipe.
*/
function init() {
    let recipe = getSelectedRecipe(); // Assign selected recipe to 'recipe' variable
    let selectRecipe = localStorage.getItem("selectRecipe") // Get 'selectRecipe' from local storage
    let tea = isTea(recipe); // If the recipe is a tea recipe,
    if (tea) {
      swapToTeaColorTheme(); // Change the color to match the tea theme
    }
    let id = recipe['id']; // Assign the recipe's id to 'id' variable
    let input = document.querySelectorAll('input'); // Assign all user input into 'input' variable
    input.forEach((el) => { // For each element in the input,
        el.value = recipe[el.name]; // let the value of the element be the recipe of the element's name

    });
    let editButton = document.querySelector('.edittherecipe'); // Select edit button from html document and assign to variable
    let deleteButton = document.querySelector('.deleteButton'); // Select delete button from html document and assign to variable
    let backButton = document.querySelector('.backtorecipe'); // Select back button from html document and assign to variable
    let formEl = document.querySelector('form'); // Select form from html document and assign to variable
    let timeButton = document.querySelector('.timeButton'); // Select time button from html document and assign to variable

    /*
    * When the time button is clicked:
    * 1. From HTML document, go to timer screen on click
    * 2. Upon saving time, edit brew time in form
    * 3. Save new recipe to local storage
    */
    timeButton.addEventListener('click', ()=>{
        let formData = new FormData(formEl); // Allow for new data to be input
            let recipeObject = {
                id: id,
                Drink_Type: tea ? "tea" : "coffee"
            };
            for (const pair of formData.entries()) { // For every pair of [string, entry value] entries in the form data,
                recipeObject[pair[0]] = pair[1]; // Assign the entry value to the id of the string
            }
        localStorage.setItem(selectRecipe, JSON.stringify(recipeObject)); // Save the select recipe to the local storage
    });

    /*
    * When the edit button is clicked:
    * 1. Save new recipe into local storage after changing data
    * 2. Remove old recipe from local storage
    * 3. From HTML document, return to home screen on click
    */
    editButton.addEventListener('click', ()=>{
        let formData = new FormData(formEl); // Allow for new data to be input
            let recipeObject = {
                id: id,
                Drink_Type: tea ? "tea" : "coffee"
            };
            for (const pair of formData.entries()) { // For every pair of [string, entry value] entries in the form data,
                recipeObject[pair[0]] = pair[1]; // Assign the entry value to the id of the string
            }
        localStorage.setItem(selectRecipe, JSON.stringify(recipeObject)); // Save the new recipe into local storage
        localStorage.removeItem('selectRecipe'); // Remove the old recipe from local storage
    });

    /*
    * When the delete button is clicked:
    * 1. Remove new (current) recipe from local storage
    * 2. Remove old recipe from local storage
    * 3. From HTML document, return to home screen on click
    */
    deleteButton.addEventListener('click', () => {
        localStorage.removeItem(selectRecipe);
        localStorage.removeItem('selectRecipe');
    });

    /*
    * When the back button is clicked:
    * 1. Remove current recipe from local storage
    * 2. From HTML document, return to home screen on click
    */
    backButton.addEventListener('click', () => {
        localStorage.removeItem('selectRecipe');
    });
}
