let categories = [
    {
        name: "David",
        image: "not now",
        id: generateUniqueId()
    },
    {
        name: "Juan",
        image: "not now",
        id: generateUniqueId()
    },
    {
        name: "add",
        image: "not now",
        id: generateUniqueId()
    }
];

function createCategory(name, image){
    return {
        name: name,
        image: image,
        id: generateUniqueId()
    }
}

export function AddCategory(name, image){
    categories.push(createCategory(name, image))
}
export function ShowCategories(){
    return categories
}

function generateUniqueId() {
    const timestamp = Date.now();
 
    const randomNum = Math.floor(Math.random() * 100000);
    
    const randomString = randomNum.toString().padStart(5, '0');
    
    const uniqueId = `${timestamp}-${randomString}`;
    
    return uniqueId;
}