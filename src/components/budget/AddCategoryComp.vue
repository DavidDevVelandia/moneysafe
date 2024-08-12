<template>
<div class="div">
    <div class="window">
        <h1>Category Comp</h1>
        <div class="categories-container">
            <button v-for="category in categories" :key="category.id" class="item" @click="handleClick(category, $event)">
                <p>{{ category.name }}</p> 
                <p>{{ category.image }}</p>
            </button>
        </div>
        <CategoryComp v-if="categoryIsAdded" @category-added="refreshCategories"/>
        <button @click.prevent="confirm">confirm</button>
    </div>
</div>
</template>
<style lang="scss" scoped>
@import "./../../scss/colors";
.div{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100%;
    background-color: #1c1b1f83;
}
.item{
    display: block;
    width: 4rem;
    height: 4rem;
}
.window{
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 40vw;
    min-width: 300px;
    height: 80vh;
    padding: 1rem;
    background-color: $md-theme-light-on-primary;
    border: 3px solid $md-theme-light-tertiary;
}
.categories-container{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: fit-content;
    min-height: 80px;
    max-height: 400px;
    overflow-y: scroll;
    width: 100%;
    background-color: #787680;
}
</style>
<script setup>
import { defineEmits } from "vue"
import { ref } from "vue";
import { ShowCategories } from "../categories/categories";
import CategoryComp from "./CategoryComp.vue"
import { changeName } from "@/data/selectedComponent";

const categories = ref(ShowCategories())
const categoryIsAdded = ref(true)
const emit = defineEmits(
    ["confirmed"]
)

console.log(categories.value[0].name)

function handleClick(category){
    
    if(category.name==="add"){
        categoryIsAdded.value = !categoryIsAdded.value
    }
    else{
        changeName(category)
        categoryIsAdded.value = false
    }
}

function refreshCategories() {
    console.log("refreshed")
    categories.value = ShowCategories().value;
}
function confirm(){
    emit("confirmed")
}
</script>