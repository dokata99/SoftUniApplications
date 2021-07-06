function getInfo() {
    let stopIdInput = document.getElementById('stopId')
    let stopId= stopIdInput.value

    let baseUrl = 'http://localhost:3030/jsonstore/bus/businfo'
    let ul = document.querySelector('#buses')
    
   

    fetch(`${baseUrl}/${stopId}`)
        .then(res => res.json())
        .then(businfo=>{

            //remove li elements
            while (ul.firstChild) {
                ul.removeChild(ul.lastChild);
              }

            let divStopName = document.querySelector('#stopName')
            divStopName.textContent = businfo.name
            
            let buses = businfo.buses
            Object.keys(buses).forEach(key =>{
                let li = document.createElement('li')
                li.textContent = `Bus ${key} arrives in ${businfo.buses[key]}`
                
                ul.appendChild(li)
            })
            
        })
        .catch(error =>{
            //remove li elements
            while (ul.firstChild) {
                ul.removeChild(ul.lastChild);
            }
        
        
            let divStopName = document.querySelector('#stopName')
            divStopName.textContent = 'Error'
        })
}