window.addEventListener('DOMContentLoaded', init);

function init() {
    let index = localStorage.getItem('index');
    let recipe = JSON.parse(localStorage.getItem(`newRecipe${index}`));
    let id = recipe['id'];
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
            id: id
        };
        for (const pair of formData.entries()) {
            recipeObject[pair[0]] = pair[1];
        }
        localStorage.setItem(`newRecipe${index}`, JSON.stringify(recipeObject));
        localStorage.setItem('index', parseInt(index)+1);
    });
    timeButton.addEventListener('click', () => {
        let formData = new FormData(formEl);
        let recipeObject = {
            id: id
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
