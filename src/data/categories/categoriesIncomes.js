import { ref } from "vue"
const categoriesIncomes = ref([
    {
        name: "Trabajo",
        image: "not now",
        id: generateUniqueId()
    },
    {
        name: "add",
        image: "not now",
        id: generateUniqueId()
    }
]);

function createCategory(name, image){
    return {
        name: name,
        image: image,
        id: generateUniqueId()
    }
}

export function AddCategoryIncome(name, image){
    categoriesIncomes.value.splice(categoriesIncomes.value.length -1, 0, createCategory(name, image))
}

export function ShowCategoriesIncomes(){
    return categoriesIncomes
}

function generateUniqueId() {
    const timestamp = Date.now();
 
    const randomNum = Math.floor(Math.random() * 100000);
    
    const randomString = randomNum.toString().padStart(5, '0');
    
    const uniqueId = `${timestamp}-${randomString}`;
    
    return uniqueId;
}