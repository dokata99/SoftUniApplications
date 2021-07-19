import { showHome } from "../pages/homePage.js"

export async function logoutUser(){
    const response = await fetch('http://localhost:3030/users/logout',{
        method: 'Get',
        headers: {
            'X-Authorization': sessionStorage.getItem('authToken')
        }
    })


    if(response.ok){
        sessionStorage.clear()
        let userLinks = document.querySelectorAll('nav .user')
        let guestLinks = document.querySelectorAll('nav .guest')
        for (const link of userLinks) {
            link.style.display = 'none'
        }
        for (const link of guestLinks) {
            link.style.display = 'block'
        }
        showHome()
    }else{
        const error = await response.json();
        alert(error.message)
    }
}