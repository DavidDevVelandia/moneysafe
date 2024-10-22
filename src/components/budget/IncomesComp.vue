<template>
    <!-- Título que indica el valor del ingreso que se va a introducir -->
    <p class="text title">Valor del ingreso</p>

    <!-- Contenedor para la entrada del ingreso -->
    <div class="inputContainer">
        <!-- Campo numérico para el valor del ingreso, enlazado a la variable reactiva 'income' -->
        <input type="number" class="inputNumber" v-model.number="income" />
        <!-- Símbolo de peso que acompaña el valor ingresado -->
        <p class="pesoSymbol">$</p>
    </div>

    <!-- Título para las categorías de ingresos -->
    <p class="text textCategory">Categorías</p>
    <div class="categoryDiv">
        <!-- Botón para añadir una nueva categoría; llama a 'changeWindow' al ser clicado -->
        <button @click.prevent="changeWindow" class="btnComponent">+</button>
        <!-- Muestra el nombre de la categoría seleccionada -->
        <p>{{ component.name }}</p>
    </div>

    <!-- Mostrar mensaje de error si los campos están vacíos o no son válidos -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <!-- Componente para añadir categorías de ingresos, mostrado condicionalmente -->
    <AddCategoryIncomeComp v-if="isShown" class="AddCategoryWindow" @confirmed="(category) => { changeWindow(); updateCategory(category) }" />

    <!-- Botón para enviar el ingreso -->
    <button @click.prevent="handleSend" class="btn">Énviar</button>
</template>

<style lang="scss" scoped>
@import "./../../scss/colors";

/* Estilos para el contenedor de la entrada del ingreso */
.inputContainer {
    width: 40vw; /* Ancho del contenedor */
    height: 4rem; /* Altura fija */
    margin: 0 auto; /* Centrar horizontalmente */
    position: relative; /* Posicionamiento relativo para el símbolo de peso */
}

/* Estilos para el contenedor de categorías */
.categoryDiv {
    display: flex; /* Disposición en flexbox */
    flex-direction: column; /* Elementos en columnas */
    margin: 0 auto; /* Centrar horizontalmente */
    width: 50%; /* Ancho del contenedor */
    align-items: center; /* Centrar elementos verticalmente */
    justify-content: space-around; /* Espaciado entre elementos */
}

/* Estilos para el botón que añade categorías */
.btnComponent {
    display: block; /* Se comporta como un bloque */
    justify-content: center; /* Centrar el contenido */
    align-items: center; /* Centrar verticalmente */
    border-radius: 40px; /* Bordes redondeados */
    width: 3rem; /* Ancho del botón */
    height: 3rem; /* Altura del botón */
    background-color: $md-theme-light-primary; /* Color de fondo */
    color: $md-theme-light-on-primary; /* Color del texto */
    border-style: none; /* Sin borde */
    text-decoration: none; /* Sin subrayado */
    font-size: 2.4vh; /* Tamaño de la fuente */
    margin: 0 auto; /* Centrar horizontalmente */
}

/* Estilos para el botón de enviar */
.btn {
    display: block; /* Se comporta como un bloque */
    justify-content: center; /* Centrar el contenido */
    align-items: center; /* Centrar verticalmente */
    border-radius: 40px; /* Bordes redondeados */
    margin: 4rem auto; /* Espaciado arriba/abajo y centrado horizontalmente */
    width: 10rem; /* Ancho del botón */
    height: 3rem; /* Altura del botón */
    background-color: $md-theme-light-primary; /* Color de fondo */
    color: $md-theme-light-on-primary; /* Color del texto */
    border-style: none; /* Sin borde */
    text-decoration: none; /* Sin subrayado */
    font-size: 2.4vh; /* Tamaño de la fuente */
}

/* Estilos para los textos */
.text {
    display: block; /* Se comporta como un bloque */
    width: 4rem; /* Ancho fijo para el texto */
    margin: 4rem auto; /* Espaciado arriba/abajo y centrado horizontalmente */
}

.textCategory {
    width: 4rem; /* Ancho fijo para el título de categorías */
}

/* Estilos para el símbolo de peso */
.pesoSymbol {
    display: block; /* Se comporta como un bloque */
    position: absolute; /* Posicionamiento absoluto dentro del contenedor */
    top: -5px; /* Ajustar la posición vertical */
    right: 10px; /* Ajustar la posición horizontal */
}

/* Estilos para el campo numérico */
.inputNumber {
    display: block; /* Se comporta como un bloque */
    width: 40vw; /* Ancho del campo */
    padding: 10px; /* Espaciado interno */
    font-size: 16px; /* Tamaño de la fuente */
    border: 1px solid #ccc; /* Borde gris claro */
    border-radius: 4px; /* Bordes redondeados */
    background-color: #f9f9f9; /* Color de fondo */
    box-sizing: border-box; /* Incluir el padding en el tamaño total */
    margin: 0 auto; /* Centrar horizontalmente */
}

/* Quitar flechas en navegadores basados en WebKit */
.inputNumber::-webkit-outer-spin-button,
.inputNumber::-webkit-inner-spin-button {
    -webkit-appearance: none; /* Chrome, Safari */
    margin: 0; /* Sin margen */
}

/* Estilo al enfocar el campo numérico */
.inputNumber:focus {
    outline: none; /* Quitar el contorno por defecto al enfocar */
}

/* Estilos para el contenedor del componente de añadir categoría */
.AddCategoryWindow {
    display: flex; /* Disposición en flexbox */
    position: absolute; /* Posicionamiento absoluto */
    width: 100vw; /* Ancho completo */
    height: 100%; /* Altura completa */
    top: 0; /* Posicionar en la parte superior */
    z-index: 1100; /* Mantener por encima de otros elementos */
}

/* Estilos para el título */
.title {
    width: 7rem; /* Ancho fijo para el título */
}

/* Estilos para los mensajes de error */
.error {
    color: red; /* Color del texto de error */
    font-size: 1.2rem; /* Tamaño de la fuente */
    margin-top: 1rem; /* Espaciado superior */
    text-align: center; /* Centrar el texto */
}
</style>

<script setup>
// Importar funciones y librerías necesarias desde Vue
import { ref } from "vue"; // Para crear variables reactivas
import AddCategoryIncomeComp from "./AddCategoryIncomeComp.vue"; // Importar el componente para añadir categorías de ingresos
import { showName } from "@/data/selectedComponent"; // Función para mostrar el nombre de la categoría seleccionada
import { addTransactionIncome, showTransactionIncome } from "@/data/transactions"; // Funciones para añadir y mostrar transacciones de ingresos

// Variables reactivas para almacenar los datos del formulario
const income = ref(0); // Almacena el valor del ingreso
const component = ref(""); // Almacena la categoría seleccionada
const isShown = ref(false); // Controla la visibilidad del componente para añadir categorías
const id = ref(0); // Almacena el ID único de la transacción
const date = ref({}); // Almacena la fecha de la transacción
const errorMessage = ref(""); // Nueva variable para manejar mensajes de error

// Función para cambiar la visibilidad del componente de añadir categorías
function changeWindow() {
    isShown.value = !isShown.value; // Alterna el valor de isShown
}

// Función para actualizar la categoría seleccionada
function updateCategory() {
    console.log("confirmed"); // Mensaje de depuración
    component.value = showName(); // Actualiza el valor de la categoría seleccionada
}

// Función para manejar el envío del formulario
function handleSend() {
    // Validar si los campos están llenos
    if (!component.value || income.value <= 0) {
        errorMessage.value = "Por favor, selecciona una categoría y añade un valor de ingreso válido."; // Mensaje de error
        return; // Salir si hay un error
    }

    // Generar un ID único para la transacción
    id.value = generateUniqueId();
    // Obtener la fecha y hora formateadas
    date.value = getFormattedDateTime();
    // Añadir la transacción de ingreso
    addTransactionIncome(income.value, component.value, date.value.formattedString, id.value);
    console.log("sent"); // Mensaje de depuración
    console.log(showTransactionIncome()); // Muestra las transacciones de ingresos

    // Reiniciar el mensaje de error después de enviar
    errorMessage.value = "";
}

// Función para obtener la fecha y hora actual formateada
function getFormattedDateTime() {
    const now = new Date(); // Obtener la fecha y hora actual
    const day = String(now.getDate()).padStart(2, '0'); // Obtener el día y formatear a dos dígitos
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Obtener el mes y formatear a dos dígitos
    const year = String(now.getFullYear()).slice(-2); // Obtener los últimos dos dígitos del año
    const hours = String(now.getHours()).padStart(2, '0'); // Obtener la hora y formatear a dos dígitos
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Obtener los minutos y formatear a dos dígitos

    // Devolver un objeto con la fecha en formato de cadena y el objeto de fecha
    return {
        dateObject: now,
        formattedString: `${day}/${month}/${year} ${hours}:${minutes}`, // Cadena formateada de la fecha y hora
    };
}

// Función para generar un ID único
function generateUniqueId() {
    const timestamp = Date.now(); // Obtener la marca de tiempo actual
    const randomNum = Math.floor(Math.random() * 100000); // Generar un número aleatorio
    const randomString = randomNum.toString().padStart(5, '0'); // Formatear el número aleatorio a cinco dígitos
    const uniqueId = `${timestamp}-${randomString}`; // Concatenar la marca de tiempo y el número aleatorio
    return uniqueId; // Devolver el ID único
}
</script>
