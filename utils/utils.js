/*
* The getCurrentRecipe function returns the recipe
* at the current index from the local storage.
*/
export function getCurrentRecipe() {
    let index = localStorage.getItem('index'); // Assign index from local storage to a variable
    let recipe = JSON.parse(localStorage.getItem(`newRecipe${index}`)); // JSON parse the new recipe to make it usable
    return recipe; 
}

/*
* The getCurrentRecipe function returns the recipe
* at the current index from the local storage.
*/
export function getSelectedRecipe() {
    let selectRecipe = localStorage.getItem('selectRecipe');
    let recipe = JSON.parse(localStorage.getItem(selectRecipe));
    return recipe;
}

/*
* The isTea function returns tea as the drink type
* within the given recipe, which is the function's parameter.
*/
export function isTea(recipe) {
    let drink_type = recipe['Drink_Type']; // Assign the drink type from the recipe to a variable
    return drink_type == "tea";
}

/*
* The swapToTeaColorTheme function calls the swapColorVars function
* to change the color theme from the coffee colors to our chosen tea colors
*/
export function swapToTeaColorTheme() {
    console.log("Swapping To Tea Colors");
    swapColorVars("--caffeinated-dark", "--tea-dark");
    swapColorVars("--caffeinated-medium-dark", "--tea-dark");
    swapColorVars("--caffeinated-medium", "--tea-medium");
    swapColorVars("--caffeinated-medium-light", "--tea-medium-light");
    swapColorVars("--caffeinated-light", "--tea-light");
    swapColorVars("--caffeinated-milk", "--tea-milk");
}

/*
* The swapColorVars function takes in two object parameters, from and to,
* which contain the colors we wish to swap from and the colors we wish
* to swap to, respectively. The function returns the object we swap to, 
* containing the desired CSS property values.
*/
function swapColorVars(from, to) {
    let toVal = getComputedStyle(document.documentElement) // Returns an object containing the values of all CSS properties of an element
        .getPropertyValue(to);
    document.documentElement.style
        .setProperty(from, toVal);
    return toVal;
}