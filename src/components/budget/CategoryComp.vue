<template>
    <div>
        <input type="text" v-model="name">
        <button class="button__add" @click.prevent="handleClick">Add</button>
    </div>  
</template>
<style lang="scss" scoped>

</style>
<script setup>
import { ref } from "vue"
import { defineEmits } from "vue"
import { AddCategory, ShowCategories } from "../categories/categories";

const emit = defineEmits(
    ["category-added"]
)
const name = ref("")
    function handleClick(){
        AddCategory(name.value, "none")
        console.log("pressed")
        console.log(ShowCategories())
        emit('category-added');
    }
</script>