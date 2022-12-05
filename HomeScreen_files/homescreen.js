// Once the HTML document has been completely parsed and all deferred scripts have downloaded and executed, call the init function
window.addEventListener('DOMContentLoaded', init);

/*
* The init function initializes the webpage that enables the user to
* select a saved recipe, create a new recipe, or upload a recipe.
*/
function init() {
    if(localStorage.getItem('index') == null) { // If there is no index item in the local storage,
        localStorage.setItem('index', 1); // Save one under the integer 1
    }

    let index = localStorage.getItem('index'); // Let 'index' be the index from local storage
    let keys = Object.keys(localStorage); // Assign the local storage objects' keys to 'keys'
    /*
    * Add all recipes into the saved recipes list for every object
    * in the local storage that is not a selected recipe
    */
    keys.forEach((el) => { // For every key in the object's keys,
        if(el != 'index' && el != 'debug' && el != "selectRecipe") { // When the key is not an index, debug, and selectRecipe,
            let savedRecipes = document.querySelector('.savedRecipes'); // Select the saved recipes and assign it to a variable
            let recipe = document.createElement('recipe-bar'); // Create a recipe-bar element within the document and assign it to 'recipe'
            let recipeObject = JSON.parse(localStorage.getItem(el)); // JSON parse the object so that it may be used
            recipe.data = recipeObject; // Input the data from the object into the recipe-bar element
            savedRecipes.append(recipe); // Add the recipe to the savedRecipes list
        }
    });
    /*
    * For every recipe, 
    */
    let recipes = document.querySelectorAll('recipe-bar'); // Assign every 'recipe-bar' element to the 'recipes' variable
    recipes.forEach((el) => { // For every recipe,
        let shadow = el.shadowRoot; // Assign the recipe's shadowroot to 'shadow'
        let recipeButton = shadow.querySelector('.recipeButton'); // Assign each recipe button to a variable
        let id = shadow.querySelector('.id').textContent; // Assign the recipe's id to a variable
        let download = shadow.querySelector('.download'); // Assign download button to 'download'
        download.addEventListener('click', () => {
            let json = localStorage.getItem(id); // Assign id from local storage to 'json'
            let object = JSON.parse(json); // Parse to make id usable
            let n = object['name'];
            json = [json];
            var blob1 = new Blob(json, { type: "text/plain;charset=utf-8" });
            //Check the Browser.
            var isIE = false || !!document.documentMode;
            if (isIE) {
                window.navigator.msSaveBlob(blob1, "Customers.txt");
            } else {
                var url = window.URL || window.webkitURL;
                var link = url.createObjectURL(blob1);
                var a = document.createElement("a");
                a.download = `${n}.json`;
                a.href = link;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        })
        /*
        * When the recipe button is clicked:
        * 1. Save it to the local storage under 'selectRecipe'
        */
        recipeButton.addEventListener('click', () => {
            localStorage.setItem('selectRecipe', id);
        });
    });
    
    let newCoffeeButton = document.querySelector('.newcoffee'); // Assign new coffee button to a variable
    /*
    * When the new coffee button is clicked:
    * 1. Create a new recipe object with the listed keys and values
    * 2. Save the recipe into local storage
    */
    newCoffeeButton.addEventListener('click', () => {
        let recipeObject = {
            id:`newRecipe${index}`,
            name: `newRecipe${index}`,
            Drink_Type: "coffee",
            Brew_Method: "",
            Brew_Time: "",
            Grind_Setting: "",
            Milk_Q: "",
            ProductBrand: "",
            Setting_Brew: "",
            Sugar: "",
            WaterToBrew: "",
        };
        localStorage.setItem(`newRecipe${index}`, JSON.stringify(recipeObject));
    });
    let newTeaButton = document.querySelector('.newtea'); // Assign new tea button to a variable
    /*
    * When the new tea button is clicked:
    * 1. Create a new recipe object with the listed keys and values
    * 2. Save the recipe into local storage
    */
    newTeaButton.addEventListener('click', () => {
        let recipeObject = {
            id:`newRecipe${index}`,
            name: `newRecipe${index}`,
            Drink_Type: "tea",
            Brew_Method: "",
            Brew_Time: "",
            Grind_Setting: "",
            Milk_Q: "",
            ProductBrand: "",
            Setting_Brew: "",
            Sugar: "",
            WaterToBrew: "",
        };
        localStorage.setItem(`newRecipe${index}`, JSON.stringify(recipeObject));
    });
    let upload = document.querySelector('.loadnewrecipe'); // Assign load new recipe button to variable
    /*
    * When the upload button is clicked:
    * 1. Allow user to browse for files and read in selected file as text
    * 2. Parse the file so that it may be used
    * 3. Save the item into local storage
    */
    upload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        let existed = false;
        reader.onload = function() {
            let jsonObject = JSON.parse(reader.result);
            keys.forEach((el) => {
                if(el == jsonObject['id']) {
                    console.log('recipe exists');
                    existed = true;
                }
            })
            if(!existed) {
                localStorage.setItem(jsonObject['id'], reader.result);
                location.reload();
            }
        };
    });
}