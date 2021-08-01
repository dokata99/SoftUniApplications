import page from './node_modules/page/page.mjs'
import { render } from './node_modules/lit-html/lit-html.js'


import { homePage } from './src/views/homePage.js'
import { loginPage } from './src/views/loginPage.js'
import { registerPage } from './src/views/registerPage.js'
import { catalogPage } from './src/views/catalogPage.js'
import { myPage } from './src/views/myPage.js'
import { editPage } from './src/views/editPage.js'
import { detailsPage } from './src/views/detailsPage.js'
import { searchPage } from './src/views/searchPage.js'
import { createPage } from './src/views/createPage.js'


const mainContainer = document.querySelector('#site-content')



page('/',decorateContext, homePage)
page('/login',decorateContext, loginPage)
page('/register',decorateContext, registerPage)
page('/catalog',decorateContext, catalogPage)
page('/my-page',decorateContext, myPage)
page('/edit/:id',decorateContext, editPage)
page('/details/:id',decorateContext, detailsPage)
page('/search',decorateContext, searchPage)
page('/create/',decorateContext, createPage)


setUserNav()

page.start()

function decorateContext(context, next){
    context.render = (content) => render(content, mainContainer)
    context.setUserNav =setUserNav;
    next()
}






function setUserNav(){
    const userId = sessionStorage.getItem('userId')
    const username = sessionStorage.getItem('username')
    if(userId != null){
        document.getElementById('profile').style.display = 'inline-block'
        document.getElementById('guest').style.display = 'none'
        document.getElementById('username').textContent = `Welcome ${username}`
    }else{
        document.getElementById('profile').style.display = 'none'
        document.getElementById('guest').style.display = 'inline-block'
    }
}