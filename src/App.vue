<template>
  <nav class="nav" :class="{'change_size': !buttonIsPulsed}">
    <img src="./assets/bars.svg" alt="Menu" class="menu" @click="swapClasses()" />

    <div class="nav__div" :class="{'hide': !buttonIsPulsed}" @click="swapClasses()">
      <router-link :to="{name: 'profile'}" class="router">Perfil</router-link>
      <router-link :to="{name: 'budget'}" class="router">Presupuesto</router-link>
      <router-link :to="{name: 'transactions'}" class="router">Transacciones</router-link>
      <router-link :to="{name: 'calculators'}" class="router interest_calc">Calculadoras de intereses</router-link>
    </div>
  </nav>
  <router-view />
</template>

<style lang="scss" scoped>
@import './scss/colors';

.menu {
  margin: 15px 15px;
  align-self: flex-start;
  height: 3.5rem;

  // Ocultar el icono en desktop
  @media (min-width: 581px) {
    display: none;
  }
}

.nav {
  display: flex;
  position: absolute;
  top: 0;
  flex-direction: column;
  background-color: $md-theme-light-primary;
  height: 5rem;
  width: 100%;
}

.nav__div {
  display: flex;
  height: 5rem;
  width: 70%;
  align-items: center;
}

.router {
  display: flex;
  width: 10rem;
  height: 5rem;
  justify-content: center;
  align-items: center;
  color: $md-theme-light-on-primary;
  text-decoration: none;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.interest_calc{
  width: 10rem;
  display: flex;
  justify-content: center;
  padding: 20px;
}
.router:hover{
  background-color: #6154db;
}
.router:active{
  background-color: #8076d8;
}
@media (max-width: 580px) {
  .nav {
    background-color: $md-theme-light-primary;
    height: 26rem;
    z-index: 1000;
  }

  .nav__div {
    display: flex;
    height: 80%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .router{
    width: 100%;
  }
  .hide {
    visibility: hidden;
  }

  .change_size {
    height: 5.5rem;
  }
}
</style>

<script setup>
import { ref } from 'vue';
const buttonIsPulsed = ref(true);
function swapClasses() {
  console.log("swap");
  buttonIsPulsed.value = !buttonIsPulsed.value;
}
</script>
