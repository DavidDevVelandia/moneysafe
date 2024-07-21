<template>
    <input type="number" class="inputNumber" v-model.number="expense">
</template>
<style lang="scss" scoped>

</style>
<script setup>
import { ref } from "vue";
const expense = ref(0)
</script>