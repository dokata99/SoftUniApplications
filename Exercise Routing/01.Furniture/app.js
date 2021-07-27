import page from './node_modules/page/page.mjs'

import { createPage } from './src/views/createPage.js'
import { dashboardPage } from './src/views/dashboardPage.js'
import { detailsPage } from './src/views/detailsPage.js'
import { editPage } from './src/views/editPage.js'
import { registerPage } from './src/views/registerPage.js'
import { loginPage } from './src/views/loginPage.js'
import { myPage } from './src/views/myFurniturePage.js'
import { logout } from './src/api/data.js'


import { render } from './node_modules/lit-html/lit-html.js'

import * as api from './src/api/data.js'

window.api = api

const mainContainer = document.querySelector('.container')

page('/',decorateContext, dashboardPage)
page('/my-furniture',decorateContext, myPage) 
page('/details/:id',decorateContext, detailsPage)
page('/create',decorateContext, createPage)
page('/edit/:id',decorateContext, editPage)
page('/register',decorateContext, registerPage)
page('/login',decorateContext, loginPage)


document.getElementById('logoutBtn').addEventListener('click', async () =>{
    await logout()
    setUserNav()
    page.redirect('/')
})

setUserNav()

page.start()


function decorateContext(context, next){
    context.render = (content) => render(content, mainContainer)
    context.setUserNav =setUserNav;
    next()
}



function setUserNav(){
    const userId = sessionStorage.getItem('userId')
    if(userId != null){
        document.getElementById('user').style.display = 'inline-block'
        document.getElementById('guest').style.display = 'none'
    }else{
        document.getElementById('user').style.display = 'none'
        document.getElementById('guest').style.display = 'inline-block'
    }
}