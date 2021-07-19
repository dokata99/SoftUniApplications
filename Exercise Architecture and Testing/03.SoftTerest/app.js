import { setupCreate, showCreate } from "./src/pages/createPage.js"
import { setupDashboard, showDashboard } from "./src/pages/dashboardPage.js"
import { setupDetails, showDetails } from "./src/pages/detailsPage.js"
import { setupHome, showHome } from "./src/pages/homePage.js"
import { setupLogin, showLogin } from "./src/pages/loginPage.js"
import { setupRegister, showRegister } from "./src/pages/registerPage.js"
import { logoutUser } from "./src/services/logoutService.js"


const mainApp = document.querySelector('main')

const links = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister,
    'createLink': showCreate,
    'dashboardLink': showDashboard,
    'detailsLink': showDetails,
    'logoutBtn': logoutUser,
}

setupNavigation()

setupSection('home-page', setupHome)
setupSection('login-page', setupLogin)
setupSection('register-page', setupRegister)
setupSection('details-page', setupDetails)
setupSection('create-page', setupCreate)
setupSection('dashboard-page', setupDashboard)


showHome()


function setupSection(sectionId, setup) {
    const section = document.getElementById(sectionId)
    setup(mainApp, section)
}

export function setupNavigation() {

    let userLinks = document.querySelectorAll('nav .user')
    let guestLinks = document.querySelectorAll('nav .guest')

    if(email != null){
        for (const link of userLinks) {
            link.style.display = 'none'
        }
        for (const link of guestLinks) {
            link.style.display = 'block'
        }
    }else{
        for (const link of userLinks) {
            link.style.display = 'block'
        }
        for (const link of guestLinks) {
            link.style.display = 'none'
        }
    }



    document.querySelector('nav').addEventListener('click', (e) => {
        if (e.target.tagname = 'A') {
            const view = links[e.target.id]
            if (typeof view == 'function') {
                e.preventDefault()
                view()
            }
        }
    })

    let element = document.getElementById('getStartedLink')
    console.log(element)
    element.addEventListener('click', (e) => {
        e.preventDefault()

        const userId = sessionStorage.getItem('userId')
        if(userId == null){
            showLogin()
        }else{
            showCreate()
        }
        
    })
}

