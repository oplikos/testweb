import {getCurrentRecipe, isTea, swapToTeaColorTheme} from '../utils/utils.js';

window.addEventListener('DOMContentLoaded', init);

function init() {
    let index = localStorage.getItem('index');
    let recipe = getCurrentRecipe();
    let id = recipe['id'];
    let tea = isTea(recipe);

    if (tea) {
        swapToTeaColorTheme();
    }

    let input =document.querySelectorAll('input');
    input.forEach((el) => {
        el.value = recipe[el.name];
    });
    let saveButton = document.querySelector('.savethisrecipe');
    let timeButton = document.querySelector('.timeButton')
    let deleteButton = document.querySelector('.delete');
    let formEl = document.querySelector('form');
    saveButton.addEventListener('click', () => {

        let formData = new FormData(formEl);
        let recipeObject = {
            id: id,
            Drink_Type: tea ? "tea" : "coffee"
        };

        for (const pair of formData.entries()) {
            recipeObject[pair[0]] = pair[1];
        }
        localStorage.setItem(`newRecipe${index}`, JSON.stringify(recipeObject));
        localStorage.setItem('index', parseInt(index)+1);

        window.location.href='./HomeScreen.html';
    });
    timeButton.addEventListener('click', () => {
        let formData = new FormData(formEl);
        let recipeObject = {
            id: id,
            Drink_Type: tea ? "tea" : "coffee"
        };

        for (const pair of formData.entries()) {
            recipeObject[pair[0]] = pair[1];
        }
        localStorage.setItem(`newRecipe${index}`, JSON.stringify(recipeObject));
    });
    deleteButton.addEventListener('click', () => {
        localStorage.removeItem(`newRecipe${index}`);
});
}
