window.addEventListener('DOMContentLoaded', init);

function init() {
    let keys = Object.keys(localStorage);
    keys.forEach((el) => {
        let savedRecipes = document.querySelector('.savedRecipes');
        let recipe = document.createElement('recipe-bar');
        let recipeObject = JSON.parse(localStorage.getItem(el));
        let recipeName = recipeObject['name'];
        let recipeId = recipeObject['id'];
        let data = [recipeName, recipeId];
        recipe.data = data;
        savedRecipes.append(recipe);
    });
    let recipes = document.querySelectorAll('recipe-bar');
    recipes.forEach((el) => {
        let shadow = el.shadowRoot;
        let recipeButton = shadow.querySelector('.recipeButton');
        let id = shadow.querySelector('.id').textContent;
        recipeButton.addEventListener('click', () => {
            localStorage.setItem('selectRecipe', id);
        });
    });
}

let newCoffeeButton = document.querySelector('.newcoffee');
newCoffeeButton.addEventListener('click', () => {
    let recipeObject = {
        id:`newRecipe${localStorage.length + 1}`,
        name: `newRecipe${localStorage.length + 1}`,
        milk: "Whole, 1 cup",
        time: "05:00",
        sugar: "1 sp",
        CG: "1 tbsp, black"
    };
    localStorage.setItem(`newRecipe${localStorage.length + 1}`, JSON.stringify(recipeObject));
});
