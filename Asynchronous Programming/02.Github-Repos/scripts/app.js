function loadRepos() {

	let usernameField = document.querySelector('#username')
	let username = usernameField.value
	fetch(`https://api.github.com/users/${username}/repos`)
		.then(result => result.json())
		.then(repos =>{
			repos.forEach(el=>{
				let a = document.createElement('a')
				a.setAttribute('href', `${el.html_url}`)
				a.textContent = el.full_name
				let li = document.createElement('li')
				li.appendChild(a)
				
				let ul =document.querySelector('#repos')
				ul.appendChild(li)
			})
			

		})

}