function loadCommits() {
    let usernameField = document.querySelector('#username')
    let username = usernameField.value;
    let repositoryField = document.querySelector('#repo')
    let repository = repositoryField.value
    fetch(`https://api.github.com/repos/${username}/${repository}/commits`)
        .then(commits =>
            commits.json()
        )
        .then(text => {
            text.forEach(com =>{
                let ul = document.querySelector('#commits')
                let li = document.createElement('li')
                li.textContent = `${com.commit.author.name}: ${com.commit.message}`
                ul.appendChild(li)
            })
        })
        .catch(error =>{

            
            let ul = document.querySelector('#commits')
            while (ul.firstChild) {
                ul.removeChild(ul.lastChild);
            }
            let li = document.createElement('li')
            li.textContent = `${error.status} (Not Found)`
            ul.appendChild(li)

        })
}