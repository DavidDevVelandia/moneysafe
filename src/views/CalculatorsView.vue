<template>
    <nav class="nav">
        <router-link :to="{name: 'simple-interest'}" class="router">Simple</router-link>

        <router-link :to="{name: 'compound-interest'}" class="router">Compuesto</router-link>
    </nav>
    <router-view/>
</template>
<style lang="scss" scoped>
@import './../scss/colors';
.nav{
    margin-top: 8rem;
    display: flex;
    width: 100%;
    justify-content: space-around;
}
.router{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    width: 10rem;
    height: 3rem;
    background-color: $md-theme-light-primary;
    color: $md-theme-light-on-primary;
    text-decoration: none;
    font-size: 2.4vh;
}
.router:hover{
    background-color: $md-theme-light-secondary;
}
</style>
<script setup>

</script>