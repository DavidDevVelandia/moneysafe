let categories = [];

function createCategory(name, image){
    return {
        name: name,
        image: image
    }
}
export function AddCategory(name, image){
    categories.push(createCategory(name, image))
}