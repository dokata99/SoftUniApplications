import { html } from './../../node_modules/lit-html/lit-html.js'
import { getAll } from './../api/data.js'

const memesTemplate = (memes) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${memes ? memes.map(meme => memeCart(meme)) : html`<p class="no-memes">No memes in database.</p>`}
    </div>
</section>`

const memeCart = (meme) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${meme._id}">Details</a>
        </div>
    </div>
</div>`

export async function memesPage(context) {
    
    const memes = await getAll()

    context.render(memesTemplate(memes))

}