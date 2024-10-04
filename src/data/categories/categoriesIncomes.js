import { ref, watch } from "vue";

// Cargar categorías de ingresos de localStorage o usar valores por defecto
const savedCategoriesIncomes = JSON.parse(localStorage.getItem('categoriesIncomes')) || [
    { name: "Trabajo", id: generateUniqueId() },
    { name: "add", id: generateUniqueId() }
];

const categoriesIncomes = ref(savedCategoriesIncomes);

function createCategory(name){
    return {
        name: name,
        id: generateUniqueId()
    }
}

export function AddCategoryIncome(name){
    categoriesIncomes.value.splice(categoriesIncomes.value.length - 1, 0, createCategory(name));
    saveCategoriesIncomesToLocalStorage(); // Guardar en localStorage
}

export function ShowCategoriesIncomes(){
    return categoriesIncomes;
}

// Guardar las categorías de ingresos en localStorage
function saveCategoriesIncomesToLocalStorage() {
    localStorage.setItem('categoriesIncomes', JSON.stringify(categoriesIncomes.value));
}

function generateUniqueId() {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 100000);
    const randomString = randomNum.toString().padStart(5, '0');
    return `${timestamp}-${randomString}`;
}

// Observar los cambios en la lista de categorías de ingresos para guardarlos automáticamente
watch(categoriesIncomes, saveCategoriesIncomesToLocalStorage, { deep: true });
