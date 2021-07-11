let editId = '';

function mainEvents(){
    
    let loadButton = document.querySelector('#loadBooks')
    loadButton.addEventListener('click', loadBooks)

    let formData = document.querySelector('form')
    formData.addEventListener('submit', handleForm)

}
mainEvents()


async function loadBooks(){

    let trElements = document.querySelectorAll('tbody tr')
    Array.from(trElements).forEach(el=> el.remove())
    let res = await fetch(`http://localhost:3030/jsonstore/collections/books`)
    let responseData = await res.json()

    let tbody = document.querySelector('tbody')
    
    tbody.appendChild(createBooks(responseData))

}

function createBooks(responseData){

    let contaiter = document.createDocumentFragment()

    Object.keys(responseData).forEach(key =>{
        let tr = document.createElement('tr')
        tr.setAttribute('id',key)
        let tdAuthor = document.createElement('td')
        tdAuthor.textContent = responseData[key].author
        tdAuthor.dataset.author = 'author'

        let tdTitle = document.createElement('td')
        tdTitle.textContent = responseData[key].title
        tdTitle.dataset.title = 'title'

        let tdButtons = document.createElement('td')

        let editButton = document.createElement('button')
        editButton.textContent = 'Edit'
        
        //edit 
        editButton.addEventListener('click', editButtonHandler)

        let deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete'

        deleteButton.addEventListener('click', deleteBook)

        tdButtons.appendChild(editButton)
        tdButtons.appendChild(deleteButton)

        tr.appendChild(tdTitle)
        tr.appendChild(tdAuthor)
        tr.appendChild(tdButtons)

        contaiter.appendChild(tr)

    })
    return contaiter
}
function editButtonHandler(e){
    e.preventDefault()

    let h3 = document.querySelector('form h3')
    h3.textContent = 'EDIT FORM'

    let tr = e.target.parentNode.parentNode

    editId = tr.getAttribute('id')

    let titleInput = document.querySelector('input[name="title"]')
    let authorInput = document.querySelector('input[name="author"]')

    let titleName = tr.querySelector('tr [data-title="title"]')
    let authorName = tr.querySelector('tr [data-author="author"]')

    authorInput.value = authorName.textContent
    titleInput.value = titleName.textContent


}


async function handleForm(e){
    e.preventDefault()

    let dataForm = new FormData(e.currentTarget)

    console.log(dataForm.get('title'))
    console.log(dataForm.get('author'))

    let h3 = document.querySelector('form h3')
    
    
    if(h3.textContent == 'EDIT FORM'){
        let editBook = {
            title: dataForm.get('title'),
            author: dataForm.get('author')
        };
    
        await fetch(`http://localhost:3030/jsonstore/collections/books/${editId}`,{
            headers: {'Content-Type': 'application/json'},
            method: 'Put',
            body: JSON.stringify(editBook)
        })
    
        let titleInput = document.querySelector('input[name="title"]')
        let authorInput = document.querySelector('input[name="author"]')
    
        authorInput.value = ''
        titleInput.value = ''

        h3.textContent = 'FORM'
    }else{

        let editBook = {
            title: dataForm.get('title'),
            author: dataForm.get('author')
        };
    
        await fetch(`http://localhost:3030/jsonstore/collections/books`,{
            headers: {'Content-Type': 'application/json'},
            method: 'Post',
            body: JSON.stringify(editBook)
        })

        let titleInput = document.querySelector('input[name="title"]')
        let authorInput = document.querySelector('input[name="author"]')
    
        authorInput.value = ''
        titleInput.value = ''

    }
    loadBooks()
}

function deleteBook(e){
    e.preventDefault()

    tr = e.target.parentNode.parentNode

    editId = tr.getAttribute('id')

    fetch(`http://localhost:3030/jsonstore/collections/books/${editId}`, {
        method: 'Delete'
    }).then(loadBooks)


}
