async function solution() {

    let baseUrl = 'http://localhost:3030/jsonstore/advanced/articles/list'

    let articles = await fetch(baseUrl)

    let data = await articles.json()

    for (const artic of data) {
        let titleDiv = createArticle(artic)
        let divAccordion = document.createElement('div')
        divAccordion.classList.add('accordion')
        divAccordion.appendChild(titleDiv)

        let mainSection = document.querySelector('#main')
        mainSection.appendChild(divAccordion)
    }




    console.log(data)
    //TODO .....
}

function createArticle(artic) {

    let span = document.createElement('span')
    span.textContent = artic.title
    let button = document.createElement('button')
    button.classList.add('button')
    button.textContent = 'More'
    button.setAttribute('id', `${artic._id}`)
    button.addEventListener('click', extraHandler)

    let div = document.createElement('div')
    div.classList.add('head')

    div.appendChild(span)
    div.appendChild(button)

    return div
}

function extraHandler(e){
    let buttonId = e.target.getAttribute('id')
    let button = e.target.textContent
    
    if(button == 'More'){
        fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${buttonId}`)
        .then(result => result.json())
        .then(extraInfo =>{
            
            e.target.textContent = 'Less'
            let extraDiv = document.createElement('div')
            let p = document.createElement('p')
            p.textContent = extraInfo.content
            extraDiv.appendChild(p)
            
            let article = e.target.parentNode.parentNode

            article.appendChild(extraDiv)
            
        })
    }else{
        let article = e.target.parentNode.parentNode
        let extraDiv = article.querySelectorAll('div')
        extraDiv[1].classList.add('extra')
        article.lastChild.remove();

        e.target.textContent = 'More'
    }
    
    


}

window.onload = solution;