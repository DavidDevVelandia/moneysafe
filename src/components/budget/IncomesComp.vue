<template>
    <p class="text title">Valor del ingreso</p>
    <div class="inputContainer">
        <input type="number" class="inputNumber" v-model.number="income" />
        <p class="pesoSymbol">$</p>
    </div>
    <p class="text textCategory">Categorías</p>
    <div class="categoryDiv">
        <button @click.prevent="changeWindow" class="btnComponent">+</button>
        <p>{{ component.name }}</p>
    </div>

    <!-- Mostrar mensaje de error si los campos están vacíos o no son válidos -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <AddCategoryIncomeComp v-if="isShown" class="AddCategoryWindow" @confirmed="(category) => { changeWindow(); updateCategory(category) }" />
    <button @click.prevent="handleSend" class="btn">Énviar</button>
</template>

<style lang="scss" scoped>
@import "./../../scss/colors";
 
.inputContainer {
    width: 40vw;
    height: 4rem;
    margin: 0 auto;
    position: relative;
}

.categoryDiv {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 50%;
    align-items: center;
    justify-content: space-around;
}

.btnComponent {
    display: block;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    width: 3rem;
    margin: 0 auto;
    height: 3rem;
    background-color: $md-theme-light-primary;
    color: $md-theme-light-on-primary;
    border-style: none;
    text-decoration: none;
    font-size: 2.4vh;
}

.btn {
    display: block;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    margin: 4rem auto;
    width: 10rem;
    height: 3rem;
    background-color: $md-theme-light-primary;
    color: $md-theme-light-on-primary;
    border-style: none;
    text-decoration: none;
    font-size: 2.4vh;
}

.text {
    display: block;
    width: 4rem;
    margin: 4rem auto;
}

.textCategory {
    width: 4rem;
}

.pesoSymbol {
    display: block;
    position: absolute;
    top: -5px;
    right: 10px;
}

.inputNumber {
    display: block;
    width: 40vw;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
    box-sizing: border-box;
    margin: 0 auto;

    /* Quitar las flechas */
    -moz-appearance: textfield; /* Firefox */
}

.inputNumber::-webkit-outer-spin-button,
.inputNumber::-webkit-inner-spin-button {
    -webkit-appearance: none; /* Chrome, Safari */
    margin: 0;
}

.inputNumber:focus {
    outline: none;
}

.btn:hover {
    background-color: #5e51d4;
}

.btn:active {
    background-color: #8076d8;
}

.btnComponent:hover {
    background-color: #6154db;
}

.btnComponent:active {
    background-color: #8076d8;
}

.AddCategoryWindow {
    display: flex;
    position: absolute;
    width: 100vw;
    height: 100%;
    top: 0;
    z-index: 1100;
}

.title {
    width: 7rem;
}

/* Mensaje de error */
.error {
    color: red;
    font-size: 1.2rem;
    margin-top: 1rem;
    text-align: center;
}
</style>

<script setup>
import { ref } from "vue";
import AddCategoryIncomeComp from "./AddCategoryIncomeComp.vue";
import { showName } from "@/data/selectedComponent";
import { addTransactionIncome, showTransactionIncome } from "@/data/transactions";

const income = ref(0); // Cambié el nombre de "expense" a "income"
const component = ref("");
const isShown = ref(false);
const id = ref(0);
const date = ref({});
const errorMessage = ref(""); // Nueva variable para manejar mensajes de error

function changeWindow() {
    isShown.value = !isShown.value;
}

function updateCategory() {
    console.log("confirmed");
    component.value = showName();
}

function handleSend() {
    // Validar si los campos están llenos
    if (!component.value || income.value <= 0) {
        errorMessage.value = "Por favor, selecciona una categoría y añade un valor de ingreso válido."; // Mensaje de error
        return;
    }

    id.value = generateUniqueId();
    date.value = getFormattedDateTime();
    addTransactionIncome(income.value, component.value, date.value.formattedString, id.value);
    console.log("sent");
    console.log(showTransactionIncome());
    
    // Reiniciar el error después de enviar
    errorMessage.value = "";
}

function getFormattedDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
    return {
        dateObject: now,
        formattedString: formattedDateTime,
    };
}

function generateUniqueId() {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 100000);
    const randomString = randomNum.toString().padStart(5, '0');
    const uniqueId = `${timestamp}-${randomString}`;
    return uniqueId;
}
</script>
