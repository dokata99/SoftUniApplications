import { showHome } from "./homePage.js"

let main
let section

async function onSubmit(e) {
    e.preventDefault()
    let formData = new FormData(e.target)

    let email = formData.get('email')
    let password = formData.get('password')
    let repass = formData.get('repeatPassword')

    if(email == '' || password == ''){
        return alert('All fields are required!')
    }else if(password != repass){
        return alert('Passwords don\'t match!')
    }else if(password.length < 6){
        return alert('Password must be at least 6 characters!')
    }

    const response = await fetch('http://localhost:3030/users/register', {
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

export function setupRegister(mainTarget, sectionTarger) {
    main = mainTarget
    section = sectionTarger

    let form = section.querySelector('form')
    form.addEventListener('submit', onSubmit)
}
export async function showRegister() {
    main.innerHTML = ''
    main.appendChild(section)
}