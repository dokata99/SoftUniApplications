import { showDashboard } from "./dashboardPage.js";

let main
let section

async function deleteIdea(e, id) {
    e.preventDefault();

    const confirmMsg = confirm('Are you sure you want to delete this idea?')
    if (confirmMsg) {
        const response = await fetch('http://localhost:3030/data/ideas/' + id, {
            method: 'Delete',
            headers: {
                'X-Authorization': sessionStorage.getItem('authToken')
            }
        })
        if (response.ok) {
            alert('Movie was successfully deleted!')
            showDashboard()
        } else {
            let error = await response.json()
            alert(error.message)
        }

    }
}


async function getIdeaDetailsById(id) {
    let response = await fetch('http://localhost:3030/data/ideas/' + id)
    let data = await response.json()
    return data

}

function createIdeaDetailsCard(idea) {


    let main = document.createElement('div')
    main.className = 'container home some'
    let image = document.createElement('img')
    image.className = 'det-img'

    image.setAttribute("src", idea.img)

    let bodyDiv = document.createElement('div')
    bodyDiv.className = 'desc'
    let h2 = document.createElement('h2')
    h2.className = 'display-5'
    h2.textContent = idea.title

    let pOne = document.createElement('p')
    pOne.className = 'infoType'
    pOne.textContent = 'Description:'

    let pDesc = document.createElement('p')
    pDesc.className = 'idea-description'
    pDesc.textContent = idea.description

    bodyDiv.appendChild(h2)
    bodyDiv.appendChild(pOne)
    bodyDiv.appendChild(pDesc)

    let lastDiv = document.createElement('div')
    lastDiv.className = 'text-center'

    let deleteBtn = document.createElement('a')
    deleteBtn.className = 'btn detb'
    deleteBtn.setAttribute('href', "#")
    deleteBtn.setAttribute('id', idea._id)
    deleteBtn.textContent = 'Delete'
    const userId = sessionStorage.getItem('userId')
    if (userId == idea._ownerId) {
        lastDiv.appendChild(deleteBtn)

        deleteBtn.addEventListener('click', (e) => deleteIdea(e, idea._id))
    }

    main.appendChild(image)
    main.appendChild(bodyDiv)
    main.appendChild(lastDiv)



    return main
}
export function setupDetails(mainTarget, sectionTarger) {
    main = mainTarget
    section = sectionTarger
}
export async function showDetails(id) {
    main.innerHTML = ''
    main.appendChild(section)

    const idea = await getIdeaDetailsById(id)

    const ideaCard = await createIdeaDetailsCard(idea)


    section.innerHTML = ''
    section.appendChild(ideaCard)




}