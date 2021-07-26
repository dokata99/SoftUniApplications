import page from './node_modules/page/page.mjs'

import { createPage } from './src/views/createPage.js'
import { dashboardPage } from './src/views/dashboardPage.js'
import { detailsPage } from './src/views/detailsPage.js'
import { editPage } from './src/views/editPage.js'
import { registerPage } from './src/views/registerPage.js'
import { loginPage } from './src/views/loginPage.js'
import { myPage } from './src/views/myFurniturePage.js'

import { render } from './node_modules/lit-html/lit-html.js'

import * as api from './src/api/data.js'

window.api = api

const mainContainer = document.querySelector('.container')

page('/',renderMiddleware, dashboardPage)
page('/my-furniture',renderMiddleware, myPage) 
page('/details/:id',renderMiddleware, detailsPage)
page('/create',renderMiddleware, createPage)
page('/edit/:id',renderMiddleware, editPage)
page('/register',renderMiddleware, registerPage)
page('/login',renderMiddleware, loginPage)


page.start()


function renderMiddleware(context, next){
    context.render = (content) => render(content, mainContainer)
    next()
}