<template>
    <p class="text">Valor del gasto</p>
    <div class="inputContainer">
        <input type="number" class="inputNumber" v-model.number="expense">
        <p class="pesoSymbol">$</p>
    </div>
    <p class="text">Categorías</p>
    <button @click.prevent="changeWindow">+</button>
    <AddCategoryComp v-if="isShown" class="AddCategoryWindow" @confirmed="(category)=>{changeWindow(); updateCategory(category)}"/>
    <p>{{ component.name }}</p>
    <button @click.prevent="handleSend">Énviar</button>
</template>
<style lang="scss" scoped>
@import "./../../scss/colors";
.inputContainer{
    width: 40vw;
    height: 4rem;
    margin: 0 auto;
    position: relative;
}
.text{
    display: block;
    width: 6rem;
    margin: 4rem auto;
}
.pesoSymbol{
    display: block;
    position: absolute;
    top: -5px;
    right: 10px;
}
.inputNumber{
    display: block;
    width: 40vw;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
    box-sizing: border-box;
    margin: 0 auto;
    &:focus{
        outline: none;
    }
}
.AddCategoryWindow{
    display: flex;
    position: absolute;
    width: 100vw;
    height: 100%;
    top: 0;
    z-index: 1100;
}
</style>
<script setup>
import { ref } from "vue";
import AddCategoryComp from "./AddCategoryComp.vue"
import { showName } from "@/data/selectedComponent";
import { addTransactionExpense, showTransactionExpense } from "@/data/transactions";
const expense = ref(0)
const component = ref("")
const isShown = ref(false)
const id = ref(0)
const date = ref({})
function changeWindow(){
    isShown.value = !isShown.value
}
function updateCategory(){
    console.log("confirmed");
    component.value = showName()
}
function handleSend(){
    id.value = generateUniqueId()
    date.value = getFormattedDateTime()
    addTransactionExpense(expense.value, component.value, date.value.formattedString, id.value)
    console.log("sent")
    console.log(showTransactionExpense())
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
        formattedString: formattedDateTime
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