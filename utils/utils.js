export function getCurrentRecipe() {
    let index = localStorage.getItem('index');
    let recipe = JSON.parse(localStorage.getItem(`newRecipe${index}`));
    return recipe;
}

export function getSelectedRecipe() {
    let selectRecipe = localStorage.getItem('selectRecipe');
    let recipe = JSON.parse(localStorage.getItem(selectRecipe));
    return recipe;
}

export function isTea(recipe) {
    let drink_type = recipe['Drink_Type'];
    return drink_type == "tea";
}

export function swapToTeaColorTheme() {
    console.log("Swapping To Tea Colors");
    swapColorVars("--caffeinated-dark", "--tea-dark");
    swapColorVars("--caffeinated-medium-dark", "--tea-dark");
    swapColorVars("--caffeinated-medium", "--tea-medium");
    swapColorVars("--caffeinated-medium-light", "--tea-medium-light");
    swapColorVars("--caffeinated-light", "--tea-light");
    swapColorVars("--caffeinated-milk", "--tea-milk");
}

function swapColorVars(from, to) {
    let toVal = getComputedStyle(document.documentElement)
        .getPropertyValue(to);
    document.documentElement.style
        .setProperty(from, toVal);
    return toVal;
}