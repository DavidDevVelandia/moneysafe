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
        <CategoryComp v-if="categoryIsAdded"/>
        <button>confirm</button>
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
    height: 80%;
}
.window{
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 40vw;
    min-width: 300px;
    height: 20rem;
    padding: 1rem;
    background-color: $md-theme-light-on-primary;
    border: 3px solid $md-theme-light-tertiary;
}
.categories-container{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 5rem;
    width: 100%;
    background-color: #787680;
}
</style>
<script setup>
import { ref } from "vue";
//import AddCategory from "./../categories/categories"
import { ShowCategories } from "../categories/categories";
import CategoryComp from "./CategoryComp.vue"
const categories = ref(ShowCategories())
const categoryIsAdded = ref(true)
console.log(categories.value[0].name)

function handleClick(category){
    
    if(category.name==="add"){
        categoryIsAdded.value = !categoryIsAdded.value
    }
    else{
        categoryIsAdded.value = false
    }
}
</script>