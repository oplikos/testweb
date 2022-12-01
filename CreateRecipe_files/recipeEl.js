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
        styles.innerHTML = `
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
            background-color: #d49961;
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
            color: #faeadc;
            font-family: Comfortaa, 'Source Sans Pro';
            white-space: nowrap;
            flex-shrink: 0;
        }
        `;
        this.shadowRoot.append(styles, recipe);
    }
    /**
     * @param {any} data
     */
    set data(data) {
        if(!data) return;
        let shadow = this.shadowRoot;
        let text = shadow.querySelector('p');
        let id = shadow.querySelector('.id');
        text.innerHTML = data[0];
        id.innerHTML = data[1];
    }
}
customElements.define('recipe-bar', createRecipe);

// class createRecipe extends HTMLElement {
//     constructor() {
//         super(); // Inheret everything from HTMLElement
//         // Attaches the shadow DOM to this Web Component
//         this.attachShadow({ mode: 'open' });
//         let button = document.createElement('button');
//         let recipe = document.createElement('div');
//         let img = document.createElement('img');
//         let text = document.createElement('p');
//         let styles = document.createElement('style');
//         button.innerHTML =`
//         <div>
//         <img src = ./HomeScreen_files/loadrecipebutton.png>
//         <p ></p>
//         <div>
//         `
//         styles.innerHTML = `
//         button {
//             background-color: transparent;
//             border: 0rem;
//         }
//         div {
//             margin-bottom: 1.6rem;
//             width: 125%;
//             display: flex;
//             align-items: center;
//             background-color: #d49961;
//             border-radius: 1.2rem;
//             flex-shrink: 0;
//         }
        
//         img {
//             margin: 0rem 9.5rem 0.263rem 0rem;
//             width: 2.0095rem;
//             height: 2.5373rem;
//             object-fit: contain;
//             vertical-align: top;
//             flex-shrink: 0;
//         }
//         p {
//             text-align: right;
//             font-size: 2.4rem;
//             font-weight: 400;
//             line-height: 1.2125;
//             color: #faeadc;
//             font-family: Comfortaa, 'Source Sans Pro';
//             white-space: nowrap;
//             flex-shrink: 0;
//         }
//         `;
//         this.shadowRoot.append(styles,button);
//     }
//     /**
//      * @param {any} data
//      */
//     set data(data) {
//         if(!data) return;
//         let shadow = this.shadowRoot;
//         let text = shadow.querySelector('p');
//         text.innerHTML = data;
//     }
// }
// customElements.define('recipe-bar', createRecipe);