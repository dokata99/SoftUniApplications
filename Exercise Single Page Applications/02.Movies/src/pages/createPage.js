import { showHome } from "./homePage.js";

let main;
let section;
async function onSubmitForm(e){
    e.preventDefault();

    const formData = new FormData(e.target)

    let movieData = {
        title: formData.get('title'),
        description: formData.get('description'),
        img: formData.get('imageUrl')
    }

    if(movieData.title == '' || movieData.description == '' || movieData.img == ''){
        return alert('All fields are required!')
    }

    const response = await fetch('http://localhost:3030/data/movies', {
        method: 'Post',
        headers: {
            'X-Authorization': sessionStorage.getItem('authToken')
        },
        body: JSON.stringify(movieData)
    })

    if(response.ok){
        showHome()        

    }else{
        const error = await response.json();
        alert(error.message)
    }
}

export function setupCreate(mainTarget, sectionTarger){
    main = mainTarget
    section = sectionTarger

    document.querySelector('form').addEventListener('submit', onSubmitForm)
}
export async function showCreate(){
    main.innerHTML = ''
    main.appendChild(section)
}