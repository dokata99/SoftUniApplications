import { html } from './../../node_modules/lit-html/lit-html.js'
import { createItem } from './../api/data.js'

const createTemplate = (onSubmit, make, model, year, des, price, img) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${'form-control' + (make ? ' is-invalid' : '' )} id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${'form-control' + (model ? ' is-invalid' : '' )} id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${'form-control' + (year ? ' is-invalid' : '' )} id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${'form-control' + (des ? ' is-invalid' : '' )} id="new-description" type="text"
                    name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class=${'form-control' + (price ? ' is-invalid' : '' )} id="new-price" type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class=${'form-control' + (img ? ' is-invalid' : '' )} id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>
`



export async function createPage(context) {

    context.render(createTemplate(onSubmit))


    async function onSubmit(e) {
        e.preventDefault()

        const formData = new FormData(e.target)


        let make = formData.get('make').trim()
        let model = formData.get('model').trim()
        let year = formData.get('year').trim()
        let description = formData.get('description').trim()
        let price = formData.get('price').trim()
        let img = formData.get('img').trim()
        let material = formData.get('material').trim()

        const data = {
            make,
            model,
            year,
            description,
            price,
            img,
            material
        }

        console.log(data.make)

        if (make == '' || model == ''
            || year == '' || description == ''
            || price == '' || img == '') {

            context.render(createTemplate(onSubmit, make == '',model == '', year == '', description == '', price == '', img == ''))
            return alert('Missing fields!')
        }

        await createItem(data)

        context.page.redirect('/')

    }
}