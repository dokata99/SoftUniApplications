import { html } from './../../node_modules/lit-html/lit-html.js'
import { editItemById , getItemById } from './../api/data.js'

const editTemplate = (meme, onSubmit) => html`<section id="edit-meme">
<form @submit=${onSubmit} id="edit-form">
    <h1>Edit Meme</h1>
    <div class="container">
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title" value=${meme.title}>
        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description">
            ${meme.description}
            </textarea>
        <label for="imageUrl">Image Url</label>
        <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value=${meme.imageUrl}>
        <input type="submit" class="registerbtn button" value="Edit Meme">
    </div>
</form>
</section>`

export async function editPage(context) {

    const meme = await getItemById(context.params.id)

    context.render(editTemplate(meme,onSubmit))


    async function onSubmit(e){
        e.preventDefault()
        console.log('hehe')
        const formData = new FormData(e.target)

        const data = {
            title: formData.get('title'),
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl')
        }


        if(data.title == '' || data.description == '' || data.img == ''){
            return alert('All fields are required!')
        }
        await editItemById(context.params.id,data)

        context.page.redirect('/memes')
    }

}