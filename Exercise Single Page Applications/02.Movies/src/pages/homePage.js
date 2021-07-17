import { showDetails } from './detailsPage.js'

let main
let section
let container
let h3

async function getMovies() {
    const response = await fetch('http://localhost:3030/data/movies')
    const data = await response.json()

    return data
}

function createMovieCard(movie) {
    let element = document.createElement('div')
    element.className= 'card mb-4 movie'
    element.innerHTML =`   
        <img class="card-img-top" src="${movie.img}"
        alt="Card image cap" width="400">
        <div class="card-body">
            <h4 class="card-title">${movie.title}</h4>
        </div>
        <div class="card-footer">
            <button id="${movie._id}"type="button" class="btn btn-info movieDatailsLink" >Details</button>
        </div>`
        return element
}


export function setupHome(mainTarget, sectionTarger) {
    main = mainTarget
    section = sectionTarger
    container = section.querySelector('.card-deck.d-flex.justify-content-center')
    h3 = section.querySelector('#createLink')
    

    container.addEventListener('click', (e)=>{
        if(e.target.classList.contains('movieDatailsLink')){
            showDetails(e.target.id)
        }
    })
    
}
export async function showHome() {
    main.innerHTML = ''
    main.appendChild(section)

    const userId = sessionStorage.getItem('userId')
    if(userId == null){
        h3.style.display = 'none'
    }else{
        h3.style.display = 'block'
    }

    const movies = await getMovies()
    console.log(movies)

    const cards = movies.map(createMovieCard)

    const fragment = document.createDocumentFragment()

    cards.forEach(c => fragment.appendChild(c))
    container.innerHTML = ''

    container.appendChild(fragment)

}