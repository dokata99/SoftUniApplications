import { showEdit } from "./editPage.js";
import { showHome } from "./homePage.js";

let main;
let section;


async function getLikesByMovieId(id){
    let response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`)
    let data = await response.json()
    //console.log(data)

    return data
}
async function getOwnLikesByMovieId(id){

    let userId = sessionStorage.getItem('userId')
    console.log(userId)
    console.log(id)
    //143e5265-333e-4150-80e4-16b61de31aa035c62d76-8152-4626-8712-eeb96381bea8%22
    let response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22`)
    let data = await response.json()
    console.log(data)
    return data
}
async function getMovieById(id) {
    let response = await fetch('http://localhost:3030/data/movies/' + id)
    let data = await response.json()
    return data

}

function createMovieCard(movie,likes, ownLike) {
    //console.log(ownLike)

    let mainDiv = document.createElement('div')
    mainDiv.className = 'container'

    let secondMainDiv = document.createElement('div')
    secondMainDiv.className = 'row bg-light text-dark movie-details'

    let movieTitle = document.createElement('h1')
    movieTitle.textContent = `Movie title: ${movie.title}`

    let imgDiv = document.createElement('div')
    imgDiv.className = 'col-md-8'

    let img = document.createElement('img')
    img.setAttribute('src', movie.img)
    img.setAttribute('alt', 'Movie')

    imgDiv.appendChild(img)

    let descriptionDiv = document.createElement('div')
    descriptionDiv.className = 'col-md-4 text-center'

    let h3 = document.createElement('h3')
    h3.className = 'my-3'
    h3.textContent = 'Movie Description'

    let p = document.createElement('p')
    p.textContent = movie.description



    let deleteA = document.createElement('a')
    deleteA.className = 'btn btn-danger link delete'
    deleteA.setAttribute('href', "#")
    deleteA.textContent = 'Delete'

    deleteA.addEventListener('click', (e) => deleteMovie(e,movie._id))

    let editA = document.createElement('a')
    editA.className = 'btn btn-warning link'
    editA.setAttribute('href', "#")
    editA.textContent = 'Edit'
    editA.setAttribute('id', movie._id)

    editA.addEventListener('click', (e)=> {
        if(e.target.className == 'btn btn-warning link'){
            showEdit(movie._id)
        }
    })
    

    let likeA = document.createElement('a')
    likeA.className = 'btn btn-primary link like'
    likeA.setAttribute('href', "#")
    likeA.textContent = 'Like'

    let span = document.createElement('span')
    span.className = 'enrolled-span'
    span.textContent = likes + ' like' + (likes == 1 ? '' : 's')



    secondMainDiv.appendChild(movieTitle)
    secondMainDiv.appendChild(imgDiv)

    descriptionDiv.appendChild(h3)
    descriptionDiv.appendChild(p)

    const userId = sessionStorage.getItem('userId')
    if (userId != null) {
        if (userId == movie._ownerId) {
            descriptionDiv.appendChild(deleteA)
            descriptionDiv.appendChild(editA)
        }else if(ownLike.length == 0){
            descriptionDiv.appendChild(likeA)
            likeA.addEventListener('click', likeMovie)
        }
    }
    descriptionDiv.appendChild(span)
    secondMainDiv.appendChild(descriptionDiv)
    mainDiv.appendChild(secondMainDiv)


    return mainDiv

    async function likeMovie(e){
        e.preventDefault()
        const res = await fetch('http://localhost:3030/data/likes',{
            method: 'Post',
            headers: {
                'Content-type': 'application/json',
                'X-Authorization': sessionStorage.getItem('authToken')
            },
            body: JSON.stringify({
                movieId: movie._id
            })
        })
        if(res.ok){
            e.target.remove()
            likes++
            span.textContent = likes + ' like' + (likes == 1 ? '' : 's')
        }

    }
}

export function setupDetails(mainTarget, sectionTarger) {
    main = mainTarget
    section = sectionTarger
}
export async function showDetails(id) {
    section.innerHTML = ''

    main.innerHTML = ''
    main.appendChild(section)


    const [movie, likes, ownLike ] = await Promise.all([
        getMovieById(id),
        getLikesByMovieId(id),
        getOwnLikesByMovieId(id)
    ])
    const card = await createMovieCard(movie, likes, ownLike)

    section.appendChild(card)

}

async function deleteMovie(e,movieId){
    e.preventDefault();

    const confirmMsg = confirm('Are you sure you want to delete this movie?')
    if(confirmMsg){
        const response = await fetch('http://localhost:3030/data/movies/'+ movieId,{
            method: 'Delete',
            headers: {
                'X-Authorization': sessionStorage.getItem('authToken')
            }
        })
        if(response.ok){
            alert('Movie was successfully deleted!')
            showHome()
        }else{
            let error = await response.json()
            alert(error.message)
        }
    }
}