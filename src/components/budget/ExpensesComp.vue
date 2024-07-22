<template>
    <p class="text">Valor del gasto</p>
    <div class="inputContainer">
        <input type="number" class="inputNumber" v-model.number="expense">
        <p class="pesoSymbol">$</p>
    </div>
    <p class="text">Categorías</p>
    <button @click.prevent="ShowWindow">+</button>
    <AddCategoryComp v-if="isShown" class="AddCategoryWindow"/>
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

    display: block;
    position: absolute;
    width: 80vw;
    top: 10rem;
}
</style>
<script setup>
import { ref } from "vue";
import AddCategoryComp from "./AddCategoryComp.vue"
//import { AddCategory } from "../categories/categories";
const expense = ref(0)
const isShown = ref(true)
function ShowWindow(){
    isShown.value = !isShown.value
}
</script>