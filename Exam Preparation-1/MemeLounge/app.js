import { homePage } from './src/views/homePage.js'
import { memesPage } from './src/views/memesPage.js'
import { createPage } from './src/views/createPaje.js'
import { profilePage } from './src/views/profilePage.js'
import { editPage } from './src/views/editPage.js'
import { detailsPage } from './src/views/detailsPage.js'
import { loginPage } from './src/views/loginPage.js'
import { registerPage } from './src/views/registerPage.js'
import { render } from './node_modules/lit-html/lit-html.js'

import { logout } from './src/api/data.js'
 

import page from './node_modules/page/page.mjs'

const mainContainer = document.querySelector('#app')



page('/index.html', '/')

page('/', decorateContext, homePage)
page('/memes', decorateContext, memesPage)
page('/create', decorateContext, createPage)
page('/my-profile', decorateContext, profilePage)
page('/edit/:id', decorateContext, editPage)
page('/details/:id', decorateContext, detailsPage)
page('/login', decorateContext, loginPage)
page('/register', decorateContext, registerPage)

setUserNav()

page.start()


function decorateContext(context, next){
    context.render = (content) => render(content, mainContainer)
    context.setUserNav =setUserNav;
    next()
}

document.getElementById('logout-btn').addEventListener('click', async () =>{
    await logout()
    setUserNav()
    page.redirect('/')
})


function setUserNav(){
    const userId = sessionStorage.getItem('userId')
    const email = sessionStorage.getItem('email')

    
    if(userId != null){
        document.querySelector('#person-name').textContent = `Welcome, ${email}`
        document.querySelector('.user').style.display = 'inline-block'
        document.querySelector('.guest').style.display = 'none'
    }else{
        document.querySelector('.user').style.display = 'none'
        document.querySelector('.guest').style.display = 'inline-block'
    }
}