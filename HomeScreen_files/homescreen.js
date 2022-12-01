window.addEventListener('DOMContentLoaded', init);

function init() {
    if(localStorage.getItem('index') == null) {
        localStorage.setItem('index', 1);
    }
    let index = localStorage.getItem('index');
    let keys = Object.keys(localStorage);
    keys.forEach((el) => {
        if(el != 'index') {
            let savedRecipes = document.querySelector('.savedRecipes');
            let recipe = document.createElement('recipe-bar');
            let recipeObject = JSON.parse(localStorage.getItem(el));
            let recipeName = recipeObject['name'];
            let recipeId = recipeObject['id'];
            let data = [recipeName, recipeId];
            recipe.data = data;
            savedRecipes.append(recipe);
        }
    });
    let recipes = document.querySelectorAll('recipe-bar');
    recipes.forEach((el) => {
        let shadow = el.shadowRoot;
        let recipeButton = shadow.querySelector('.recipeButton');
        let id = shadow.querySelector('.id').textContent;
        let download = shadow.querySelector('.download');
        download.addEventListener('click', () => {
            let json = localStorage.getItem(id);
            let object = JSON.parse(json);
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
        recipeButton.addEventListener('click', () => {
            localStorage.setItem('selectRecipe', id);
        });
    });
    let newCoffeeButton = document.querySelector('.newcoffee');
    newCoffeeButton.addEventListener('click', () => {
        let recipeObject = {
            id:`newRecipe${index}`,
            name: `newRecipe${index}`,
            milk: "Whole, 1 cup",
            time: "05:00",
            sugar: "1 sp",
            CG: "1 tbsp, black"
        };
        localStorage.setItem(`newRecipe${index}`, JSON.stringify(recipeObject));
    });
    let upload = document.querySelector('.file');
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

