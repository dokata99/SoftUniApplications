import { showHome } from "./homePage.js"

let main
let section

async function onSubmit(e) {
    e.preventDefault()
    let formData = new FormData(e.target)

    let email = formData.get('email')
    let password = formData.get('password')

    const response = await fetch('http://localhost:3030/users/login', {
        method: 'Post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            email,
            password
        })
    })


    if (response.ok) {
        e.target.reset()
        const data = await response.json()
        console.log(data)
        sessionStorage.setItem('authToken', data.accessToken)
        sessionStorage.setItem('userId', data._id)
        sessionStorage.setItem('email', data.email)

        let userLinks = document.querySelectorAll('nav .user')
        let guestLinks = document.querySelectorAll('nav .guest')
        

        for (const link of userLinks) {
            link.style.display = 'block'
        }
        for (const link of guestLinks) {
            link.style.display = 'none'
        }

        showHome()
    }else{
        let error = await response.json()
        alert(error.message)
    }

}

export function setupLogin(mainTarget, sectionTarger) {
    main = mainTarget
    section = sectionTarger
    let form = section.querySelector('form')
    form.addEventListener('submit', onSubmit)
}
export async function showLogin() {
    main.innerHTML = ''
    main.appendChild(section)
}