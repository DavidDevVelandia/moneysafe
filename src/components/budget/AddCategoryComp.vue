<template>
<div class="div">
    <div class="window">
        <h1>Category Comp</h1>
        <div class="categories-container">
            <div v-for="category in categories" :key="category.id">
                <p>{{ category.name }}</p> 
                <p>{{ category.image }}</p>
            </div>
        </div>
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
    height: 5rem;
    width: 100%;
    background-color: #787680;
}
</style>
<script setup>
import { ref } from "vue";
//import AddCategory from "./../categories/categories"
import { ShowCategories } from "../categories/categories";
const categories = ref(ShowCategories())

console.log(categories.value[0].name)
</script>