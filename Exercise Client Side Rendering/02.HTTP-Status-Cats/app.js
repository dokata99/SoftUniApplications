import { cats } from './catSeeder.js'
import { render } from './../node_modules/lit-html/lit-html.js'
import { renderCats } from './catsTemplate.js'
 

function toggleStatusCodeButton(e) {
    let button = e.target;
    button.textContent = button.textContent === 'Show status code'
        ? 'Hide status code'
        : 'Show status code';
    let infoDiv = button.closest('.info');
    let statusDiv = infoDiv.querySelector('.status');
    if(statusDiv.classList.contains('hidden')){
        statusDiv.classList.remove('hidden');
    } else {
        statusDiv.classList.add('hidden');
    }
}

const rootSection = document.querySelector('#allCats')
render(renderCats(cats, toggleStatusCodeButton), rootSection);



