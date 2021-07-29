import { html } from './../../node_modules/lit-html/lit-html.js'
import { getMyItems } from './../api/data.js'


const profileTemplate = (username, email, userMemes) => html`<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
        <div class="user-content">
            <p>Username: ${username}</p>
            <p>Email: ${email}</p>
            <p>My memes count: ${userMemes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    ${userMemes.length !=0 ? html `${userMemes.map(meme => memeCart(meme))}` 
    : html `<p class="no-memes">No memes in database.</p>`}
    <div class="user-meme-listings">

    
    </div>
</section>`


const memeCart = (meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href="/details/${meme._id}">Details</a>
</div>`



export async function profilePage(context) {

    
    const username = sessionStorage.getItem('username')
    const email = sessionStorage.getItem('email')
    const userMemes = await getMyItems()

    console.log(userMemes)
    context.render(profileTemplate(username, email, userMemes))
}