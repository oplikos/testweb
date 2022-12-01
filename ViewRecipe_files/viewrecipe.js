window.addEventListener('DOMContentLoaded', init);

function init() {
    let selectRecipe = localStorage.getItem('selectRecipe');
    let recipe = JSON.parse(localStorage.getItem(selectRecipe));
    let id = recipe['id'];
    let input = document.querySelectorAll('input');
    input.forEach((el) => {
        el.value = recipe[el.name];
    });
    let editButton = document.querySelector('.edittherecipe');
    let deleteButton = document.querySelector('.deleteButton');
    let backButton = document.querySelector('.backtorecipe');
    let formEl = document.querySelector('form');
    editButton.addEventListener('click', ()=>{
        let formData = new FormData(formEl);
            let recipeObject = {
                id: id
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
