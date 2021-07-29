import { html } from './../../node_modules/lit-html/lit-html.js'
import { createItem } from './../api/data.js'


const createTemplate = (onSubmit) => html`
<section id="create-meme">
    <form @submit=${onSubmit} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>`


export async function createPage(context) {

    context.render(createTemplate(onSubmit))

    async function onSubmit(e) {
        e.preventDefault()

        const formData = new FormData(e.target)

        const data = {
            title: formData.get('title'),
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl')
        }


        if(data.title == '' || data.description == '' || data.img == ''){
            return alert('All fields are required!')
        }
        await createItem(data)

        context.page.redirect('/memes')

    }

    console.log('create')

}