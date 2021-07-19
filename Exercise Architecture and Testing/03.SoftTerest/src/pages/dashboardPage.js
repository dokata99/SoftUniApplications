import {showDetails} from './detailsPage.js'

let main
let section
let container


async function getIdeas() {
    const response = await fetch('http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc')
    const data = await response.json()

    return data
}

function createIdeaCard(idea){
    let element = document.createElement('div')
    element.className = 'card overflow-hidden current-card details'
    element.style.width = '20rem'
    element.style.height = '18rem'
    let cardBodyDiv = document.createElement('div')
    cardBodyDiv.className = 'card-body'
    let p = document.createElement('p')
    p.className = 'card-text'
    p.textContent = idea.title
    
    cardBodyDiv.appendChild(p)
    let image = document.createElement('img')
    image.className = 'card-image'
    image.setAttribute('src', idea.img)

    let a = document.createElement('a')
    a.className = 'btn'
    a.setAttribute('href', '#')
    a.setAttribute('id', idea._id)
    a.textContent = 'Details'
     
    element.appendChild(cardBodyDiv)
    element.appendChild(image)
    element.appendChild(a)

    return element

}

export function setupDashboard(mainTarget, sectionTarger) {
    main = mainTarget
    section = sectionTarger
    container = section.querySelector('#dashboard-holder')


    container.addEventListener('click', (e)=>{
        if(e.target.classList.contains('btn')){
            showDetails(e.target.id)
        }
    })
}
export async function showDashboard() {
    main.innerHTML = ''
    main.appendChild(section)

    const ideas = await getIdeas()
    

    const cards = ideas.map(createIdeaCard)

    const fragment = document.createDocumentFragment()

    cards.forEach(c => fragment.appendChild(c))
    container.innerHTML = ''

    container.appendChild(fragment)
}