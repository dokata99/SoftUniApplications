function attachEvents() {

    let loadButton = document.querySelector('#btnLoad')

    loadButton.addEventListener('click', loadHandler)

    let addButton = document.querySelector('#btnCreate')

    addButton.addEventListener('click', addHandler)
}

function loadHandler(){
    let ulElem = document.querySelector('#phonebook')

    while (ulElem.firstChild) {
        ulElem.removeChild(ulElem.lastChild);
    }

    fetch(`http://localhost:3030/jsonstore/phonebook`)
        .then(res => res.json())
        .then(phones=>{
            Object.values(phones).forEach(phone =>{
                console.log(phone)

                let liElem = document.createElement('li')
                liElem.textContent = `${phone.person}: ${phone.phone}`

                let deleteButton = document.createElement('button')
                deleteButton.setAttribute('id',phone._id)
                deleteButton.textContent = 'Delete'

                deleteButton.addEventListener('click', deleteHandler)
                liElem.appendChild(deleteButton)
                let ulElem = document.querySelector('#phonebook')
                ulElem.appendChild(liElem)

            })
        })
}


function deleteHandler(e){

    buttonId = e.target.getAttribute('id')
    

    fetch(`http://localhost:3030/jsonstore/phonebook/${buttonId}`,{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
        .then(response => response.json())
        .then(res => loadHandler())


}


function addHandler(){
    let personInput = document.querySelector('#person')
    let phoneInput = document.querySelector('#phone')


    let person = personInput.value
    let phone = phoneInput.value

    personInput.value = ''
    phoneInput.value = ''

    fetch(`http://localhost:3030/jsonstore/phonebook`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            person: person,
            phone: phone
        })
    })
    .then(res => res.json())
    .then(response => loadHandler())
    .catch(error => alert(error))
    
}


attachEvents();