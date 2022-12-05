import { isTea } from "../utils/utils.js";

class createRecipe extends HTMLElement {
    constructor() {
        super(); // Inheret everything from HTMLElement
        // Attaches the shadow DOM to this Web Component
        this.attachShadow({ mode: 'open' });
        let recipe = document.createElement('div');
        let img = document.createElement('img');
        let text = document.createElement('p');
        let styles = document.createElement('style');
        recipe.innerHTML =`
        <div>
        <button class="download"><img src = ./HomeScreen_files/savedrecipeloadbutton.png><button>
        <button class="recipeButton" onclick="window.location.href='./ViewRecipe.html'"><p></p><button>
        <p class="id" hidden></p>
        <div>
         `
        styles.innerHTML = getStyle(); // Calls getStyle function below to put within the html
        this.shadowRoot.append(styles, recipe);
    }
    /**
     * @param {any} data
     * Sets the data from the form
     * If the data is from a tea recipe, change the style to match the tea theme
     */
    set data(data) {
        if(!data) return;
        let shadow = this.shadowRoot;
        let text = shadow.querySelector('p');
        let id = shadow.querySelector('.id');
        text.innerHTML = data['name'];
        id.innerHTML = data['id'];

        if (isTea(data)) {
            let styleEl = shadow.querySelector('style');
            styleEl.innerHTML = getStyle(false);
        }
    }
}

/*
* The getStyle function returns the style for the webpage
* when the recipe being created is a coffee rather than a tea.
*/
function getStyle(isCoffee=true) {
    return `
    button {
        background-color: transparent;
        border: 0rem;
    }
    div {
        margin-bottom: 1.6rem;
        width: 100%;
        height: 5rem;
        display: flex;
        align-items: center;
        background-color: ${isCoffee ? "var(--caffeinated-medium-light)" : "var(--tea-medium-light)"};
        border-radius: 1.2rem;
        flex-shrink: 0;
    }
    img {
        margin: 0rem 9.5rem 0.263rem 0rem;
        width: 2.0095rem;
        height: 2.5373rem;
        object-fit: contain;
        vertical-align: top;
        flex-shrink: 0;
    }
    p {
        text-align: right;
        font-size: 2.4rem;
        font-weight: 400;
        line-height: 1.2125;
        color: ${isCoffee ? "var(--caffeinated-milk)" : "var(--tea-milk)"};
        font-family: Comfortaa, 'Source Sans Pro';
        white-space: nowrap;
        flex-shrink: 0;

    }
    `;
}
customElements.define('recipe-bar', createRecipe);

