import { showDetails } from "./detailsPage.js";

let main;
let section;
async function getMovieById(id){
    let response = await fetch('http://localhost:3030/data/movies/'+id)
    let data = await response.json()
    //console.log(data)

    return data
}


export function setupEdit(mainTarget, sectionTarger){
    main = mainTarget
    section = sectionTarger

    const form = section.querySelector('form')
    form.addEventListener('submit', handleEditFrom)

    async function handleEditFrom(e){
        e.preventDefault();
    
        const formData = new FormData(e.target)
        let movieIdInput = document.querySelector('#movieId')
        let movieId = movieIdInput.value
        console.log(movieId)
    
        let movieData = {
            title: formData.get('title'),
            description: formData.get('description'),
            img: formData.get('imageUrl'),
        }
    
        console.log(movieData.img)
    
        if(movieData.title == '' || movieData.description == '' || movieData.img == ''){
            return alert('All fields are required!')
        }
    
        const response = await fetch('http://localhost:3030/data/movies/' + movieId, {
            method: 'Put',
            headers: {
                'Content-type': 'application/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify(movieData)
        })
    
        if(response.ok){
            showDetails(movieId)        
    
        }else{
            const error = await response.json();
            alert(error.message)
        }
    }
    



}
export async function showEdit(id){
    main.innerHTML = ''
    main.appendChild(section)

    const movieData = await getMovieById(id)
    console.log(movieData.title)
    let titleInput = section.querySelector('#title')
    let descriptionInput = section.querySelector('#description')
    let imgInput = section.querySelector('#image')
    let hidden = section.querySelector('#movieId')

    titleInput.value = movieData.title
    descriptionInput.textContent = movieData.description
    imgInput.value = movieData.img
    hidden.value = movieData._id
    
}

