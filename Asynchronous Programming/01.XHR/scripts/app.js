function loadRepos() {
   fetch('https://api.github.com/users/testnakov/repos')
      .then(result => result.text())
      .then(repos =>{
         let res = document.querySelector('#res')

       
         res.textContent=repos
        

         console.log(repos)
      })
}