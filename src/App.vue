<template>
  <nav class="nav" :class="{'change_size': !buttonIsPulsed}">
    <img src="./assets/bars.svg" alt="" class="menu" @click="swapClasses()">

    <div class="nav__div" :class="{'hide': !buttonIsPulsed}" @click="swapClasses()">
      <router-link :to="{name: 'profile'}" class="router" >Perfil</router-link>
      <router-link :to="{name: 'budget'}" class="router">Presupuesto</router-link>
      <router-link :to="{name: 'transactions'}" class="router">Transacciones</router-link>
      <router-link :to="{name: 'calculators'}" class="router">Calculadoras de intereses</router-link>
    </div>
  </nav>
  <router-view/>
</template>

<style lang="scss" scoped>
  @import './scss/colors';
  .menu{
    margin: 15px 15px;
    height: 3.5rem;
  }
  .nav{
    display: flex;
    position: absolute;
    top: 0;
    flex-direction: row;
    background-color: $md-theme-light-primary;
    height: 5rem;
    width: 100%;
  }
  .nav__div{
    display: flex;
    height: 5rem;
    width: 60%;
    justify-content: space-around;
    align-items: center;
  }
  .router{
    display: flex;
    width: 100%;
    height: 5rem;
    justify-content: center;
    align-items: center;
    color: $md-theme-light-on-primary; 
    text-decoration: none;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: clamp(16px, 1.7vw, 24px);
  }
  @media (max-width: 580px){
    .nav{
      background-color: $md-theme-light-primary;
      height: 35rem;
      z-index: 1000;
    }
    .nav__div{
    display: flex;
    height: 80%;
    width: 100%;
    flex-direction: column;
    justify-content: baseline;
    align-items: center;
    }
    .hide{
    visibility: hidden;
  }
    .change_size{
      height: 5.5rem;
    }
  }
  
</style>

<script setup>
import { ref } from 'vue'
  const buttonIsPulsed = ref(true)
  function swapClasses() {
    console.log("swap");
    buttonIsPulsed.value = !buttonIsPulsed.value
  }
</script>