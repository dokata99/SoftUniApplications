function solve() {    
    
    function depart() {
        let firstStopId = 'depot'
        let divStopName = document.querySelector('#info .info')

        let nextStopId = divStopName.getAttribute('next-stop-id')
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`)
            .then(result => result.json())
            .then(stopInfo=>{
               
                divStopName.textContent = stopInfo.name
                divStopName.setAttribute('next-stop-id', `${stopInfo.next}`)
                let buttonDepart = document.querySelector('#depart')
                buttonDepart.disabled = true
                let buttonArrive = document.querySelector('#arrive')
                buttonArrive.disabled = false


            }).catch(error =>{
                fetch(`http://localhost:3030/jsonstore/bus/schedule/${firstStopId}`)
                .then(result => result.json())
                .then(stopInfo=>{
                   
                    divStopName.textContent = stopInfo.name
                    divStopName.setAttribute('next-stop-id', `${stopInfo.next}`)
                    let buttonDepart = document.querySelector('#depart')
                    buttonDepart.disabled = true
                    let buttonArrive = document.querySelector('#arrive')
                    buttonArrive.disabled = false
    
    
                })
            })    

    }

    function arrive() {
        let divStopName = document.querySelector('#info .info')

        let nextStopId = divStopName.getAttribute('next-stop-id')
        console.log(nextStopId)
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`)
            .then(result => result.json())
            .then(stopInfo=>{

                divStopName.textContent = stopInfo.name
                divStopName.setAttribute('next-stop-id', `${stopInfo.next}`)
                let buttonDepart = document.querySelector('#depart')
                buttonDepart.disabled = false
                let buttonArrive = document.querySelector('#arrive')
                buttonArrive.disabled = true

            })
            .catch(err => {
                divStopName.textContent = `Error`;
                buttonDepart.disabled = true;
                buttonArrive.disabled = true;
            })
            
    }

    return {
        depart,
        arrive
    };
}

let result = solve();