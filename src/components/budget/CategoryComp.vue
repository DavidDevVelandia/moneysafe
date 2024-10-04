<template>
    <div class="form">
        <input type="text" v-model="name" class="inp">

        <button class="button__add inp" @click.prevent="handleClick">Añadir</button>
    </div>  
</template>
<style lang="scss" scoped>
.form{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.inp{
    margin: 0.5rem;
    width: 10rem;
}
.button__add{
    width: 5rem;
}
</style>
<script setup>
import { ref } from "vue"
import { defineEmits } from "vue"
import { AddCategory } from "../../data/categories/categories";

const emit = defineEmits(
    ["category-added"]
)
const name = ref("")
function handleClick(){
    if(name.value !== ""){
        AddCategory(name.value, "none")
        emit('category-added');
    }
}
</script>