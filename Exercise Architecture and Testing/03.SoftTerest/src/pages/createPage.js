import { showDashboard } from "./dashboardPage.js"

let main
let section
async function handleCreateFrom(e) {
    e.preventDefault()

    const formData = new FormData(e.target)

    let idea = {
        title: formData.get('title'),
        description: formData.get('description'),
        img: formData.get('imageURL')
    }

    if (idea.title == '' || idea.description == '' || idea.img == '') {
        return alert('All fields are required!')
    } else if (idea.title.length < 6 || idea.description.length < 10 || idea.img.length < 5) {
        return alert('Lenght is too short!')
    }

    const response = await fetch('http://localhost:3030/data/ideas', {
        method: 'Post',
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authToken')
        },
        body: JSON.stringify(idea)
    })

    if(response.ok){
        showDashboard()
    }else{
        const error = await response.json();
        return alert(error.message)
    }
}
export function setupCreate(mainTarget, sectionTarger) {
    main = mainTarget
    section = sectionTarger

    const form = section.querySelector('form')
    form.addEventListener('submit', handleCreateFrom)
}
export async function showCreate() {
    main.innerHTML = ''
    main.appendChild(section)
}