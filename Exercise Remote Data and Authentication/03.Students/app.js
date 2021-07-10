function submitForm() {
    let submitBtn = document.querySelector('#submit')
    submitBtn.addEventListener('click', handleForm)
}

function handleForm(e) {
    e.preventDefault()
    let mainForm = document.querySelector('#form')
    let data = new FormData(mainForm)

    let firstName = data.get('firstName')
    let lastName = data.get('lastName')
    let facultyNumber = data.get('facultyNumber')
    let grade = data.get('grade')
    let tbody = document.querySelector('tbody')
    while (tbody.firstChild) {
        tbody.removeChild(tbody.lastChild);
    }
    if (firstName != '' && lastName != '' && facultyNumber != '' && grade != '') {
        fetch(`http://localhost:3030/jsonstore/collections/students`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                facultyNumber: facultyNumber,
                grade: grade
            })
        })
            .then(response => response.json())
            .then(res => {
                fetch(`http://localhost:3030/jsonstore/collections/students`)
                    .then(response => response.json())
                    .then(data => {
                        Object.values(data)
                            .forEach(student => {
                                let tr = document.createElement('tr')
                                let tdFistName = document.createElement('td')
                                tdFistName.textContent = student.firstName

                                let tdLastName = document.createElement('td')
                                tdLastName.textContent = student.lastName

                                let tdFacultyNumber = document.createElement('td')
                                tdFacultyNumber.textContent = student.facultyNumber

                                let tdGrade = document.createElement('td')
                                tdGrade.textContent = student.grade

                                tr.appendChild(tdFistName)
                                tr.appendChild(tdLastName)
                                tr.appendChild(tdFacultyNumber)
                                tr.appendChild(tdGrade)

                                let tbody = document.querySelector('#results tbody')
                                tbody.appendChild(tr)

                                mainForm.reset();

                            })
                    })
            })
            .catch(err => alert(err))

    } else {
        fetch(`http://localhost:3030/jsonstore/collections/students`)
            .then(response => response.json())
            .then(data => {
                Object.values(data)
                    .forEach(student => {
                        let tr = document.createElement('tr')
                        let tdFistName = document.createElement('td')
                        tdFistName.textContent = student.firstName

                        let tdLastName = document.createElement('td')
                        tdLastName.textContent = student.lastName

                        let tdFacultyNumber = document.createElement('td')
                        tdFacultyNumber.textContent = student.facultyNumber

                        let tdGrade = document.createElement('td')
                        tdGrade.textContent = student.grade

                        tr.appendChild(tdFistName)
                        tr.appendChild(tdLastName)
                        tr.appendChild(tdFacultyNumber)
                        tr.appendChild(tdGrade)

                        let tbody = document.querySelector('#results tbody')
                        tbody.appendChild(tr)

                        mainForm.reset();

                    })
            })
    }

}

submitForm()