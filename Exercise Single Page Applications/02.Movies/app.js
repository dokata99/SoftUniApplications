
import { setupHome, showHome } from './src/pages/homePage.js'
import { setupLogin, showLogin } from './src/pages/loginPage.js'
import { setupRegister, showRegister } from './src/pages/registerPage.js'
import { setupEdit, showEdit } from './src/pages/editPage.js'
import { setupDetails, showDetails } from './src/pages/detailsPage.js'
import { setupCreate, showCreate } from './src/pages/createPage.js'
import { logoutUser } from './src/services/logoutService.js'


const mainApp = document.querySelector('main')

const links = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister,
    'createLink': showCreate,
    'logoutBtn': logoutUser,
}

setupNavigation()

//showHome()



setupSection('home-page', setupHome)
setupSection('form-login', setupLogin)
setupSection('form-sign-up', setupRegister)
setupSection('edit-movie', setupEdit)
setupSection('movie-details', setupDetails)
setupSection('add-movie', setupCreate)


//Start application at home view
showHome()


function setupSection(sectionId, setup) {
    const section = document.getElementById(sectionId)
    setup(mainApp, section)
}

export function setupNavigation(){
    let userLinks = document.querySelectorAll('nav .user')
    let guestLinks = document.querySelectorAll('nav .guest')
    let msg =document.querySelector('#user-welcome')
    let email = sessionStorage.getItem('email')
    if(email != null){
        msg.textContent = `Welcome ${email}`
        for(const link of userLinks) {
            link.style.display = 'block'
        }
        for(const link of guestLinks) {
            link.style.display = 'none'
        }
    }else{
        msg.textContent = `Welcome guest`
        for(const link of userLinks) {
            link.style.display = 'none'
        }
        for(const link of guestLinks) {
            link.style.display = 'block'
        }
    }

    document.querySelector('nav').addEventListener('click', (e) =>{
        if(e.target.tagname = 'A'){
            const view = links[e.target.id]
            if(typeof view == 'function'){
                e.preventDefault()
                view()
            }
        }
    })

    if(createLink != null){
        let createLink = document.getElementById('createLink')
        createLink.addEventListener('click', (e) =>{
            e.preventDefault()
            showCreate()
        })

    }
    /* if(createLink != null){
        
        const userId = sessionStorage.getItem('userId')
        if(userId == null){
            createLink.style.display = 'none'
        }else{
            createLink.style.display = 'block'
            createLink.addEventListener('click', (e) =>{
                e.preventDefault()
                showCreate()
            })
        }
    } */
    
}

