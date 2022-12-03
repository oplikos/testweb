import { isTea, swapToTeaColorTheme, getSelectedRecipe } from "../utils/utils.js";

window.addEventListener('DOMContentLoaded', init);

function init() {
    let recipe = getSelectedRecipe();
    let selectRecipe = localStorage.getItem("selectRecipe")
    let tea = isTea(recipe);
    if (tea) {
      swapToTeaColorTheme();
    }

    let id = recipe['id'];
    let input = document.querySelectorAll('input');
    input.forEach((el) => {
        el.value = recipe[el.name];
    });
    let editButton = document.querySelector('.edittherecipe');
    let deleteButton = document.querySelector('.deleteButton');
    let backButton = document.querySelector('.backtorecipe');
    let formEl = document.querySelector('form');
    let timeButton = document.querySelector('.timeButton');
    timeButton.addEventListener('click', ()=>{
        let formData = new FormData(formEl);
            let recipeObject = {
                id: id,
                Drink_Type: tea ? "tea" : "coffee"
            };
            for (const pair of formData.entries()) {
                recipeObject[pair[0]] = pair[1];
            }
        localStorage.setItem(selectRecipe, JSON.stringify(recipeObject));
    });
    editButton.addEventListener('click', ()=>{
        let formData = new FormData(formEl);
            let recipeObject = {
                id: id,
                Drink_Type: tea ? "tea" : "coffee"
            };
            for (const pair of formData.entries()) {
                recipeObject[pair[0]] = pair[1];
            }
        localStorage.setItem(selectRecipe, JSON.stringify(recipeObject));
        localStorage.removeItem('selectRecipe');
    });
    deleteButton.addEventListener('click', () => {
        localStorage.removeItem(selectRecipe);
        localStorage.removeItem('selectRecipe');
    });
    backButton.addEventListener('click', () => {
        localStorage.removeItem('selectRecipe');
    });
}
