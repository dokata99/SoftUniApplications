function attachEvents() {

    let sendButton = document.querySelector('#submit')
    sendButton.addEventListener('click', sendMessage)
    let refreshButton = document.querySelector('#refresh')
    refreshButton.addEventListener('click', refreshHandler)
}

function sendMessage(e){
    e.preventDefault();
    let [ authorName, content ] = document.querySelectorAll('#controls input')
    console.log(authorName.value)
    fetch('http://localhost:3030/jsonstore/messenger',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author: authorName.value,
            content: content.value
        })
        
    })
    .then(response => response.json())
    .then(info=>{
        console.log(info)
    }).catch(error =>{
        alert(error)
    })
    authorName.value = ''
    content.value = ''
        
}


function refreshHandler(e){
    e.preventDefault();

    fetch('http://localhost:3030/jsonstore/messenger')
        .then(response => response.json())
        .then(messages => {
            let messagesTextArea = document.querySelector('#messages')
            messagesTextArea.textContent = ''

            Object.values(messages)
                .forEach(message => {
                    messagesTextArea.textContent += `${message.author}: ${message.content}\n`

                })
        })
}
attachEvents();