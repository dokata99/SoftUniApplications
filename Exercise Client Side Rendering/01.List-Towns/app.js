import {render} from './../node_modules/lit-html/lit-html.js'

import { allTownsTemplate } from './townsTemp.js'

let form = document.querySelector('#towns-form')

form.addEventListener('submit',handleForm)

let root = document.querySelector('#root')

function handleForm(e){
    e.preventDefault()

    let form = new FormData(e.target)

    let townsStr = form.get('towns')

    let towns = townsStr.split(', ')



    render(allTownsTemplate(towns),root)



}