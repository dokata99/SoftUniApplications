import { html } from './../node_modules/lit-html/lit-html.js'


export let townLi = (town) => html `<li>${town}</li>`
export let allTownsTemplate = (towns) => 
    html`<ul>
            ${towns.map(town => townLi(town))}
        </ul>`
