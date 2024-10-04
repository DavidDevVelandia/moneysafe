import { ref, watch } from "vue";

// Cargar categorías de localStorage o usar valores por defecto
const savedCategories = JSON.parse(localStorage.getItem('categories')) || [
    { name: "Comida", id: generateUniqueId() },
    { name: "Servicios", id: generateUniqueId() },
    { name: "add", id: generateUniqueId() }
];

const categories = ref(savedCategories);

function createCategory(name){
    return {
        name: name,
        id: generateUniqueId()
    }
}

export function AddCategory(name){
    categories.value.splice(categories.value.length - 1, 0, createCategory(name));
    saveCategoriesToLocalStorage(); // Guardar en localStorage
}

export function ShowCategories(){
    return categories;
}

// Guardar las categorías en localStorage
function saveCategoriesToLocalStorage() {
    localStorage.setItem('categories', JSON.stringify(categories.value));
}

function generateUniqueId() {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 100000);
    const randomString = randomNum.toString().padStart(5, '0');
    return `${timestamp}-${randomString}`;
}

// Observar los cambios en la lista de categorías para guardarlos automáticamente
watch(categories, saveCategoriesToLocalStorage, { deep: true });
