<template>
  <!-- Navegación principal con clase dinámica que ajusta el tamaño según el estado de buttonIsPulsed -->
  <nav class="nav" :class="{'change_size': !buttonIsPulsed}">
    <!-- Icono de menú (hamburguesa) que al hacer clic llama a swapClasses() para alternar el estado de buttonIsPulsed -->
    <img src="./assets/bars.svg" alt="Menu" class="menu" @click="swapClasses()" />

    <!-- Contenedor de enlaces de navegación, oculto si buttonIsPulsed es false -->
    <div class="nav__div" :class="{'hide': !buttonIsPulsed}" @click="swapClasses()">
      <!-- Enlaces de navegación usando router-link para redirigir a diferentes vistas de la aplicación -->
      <router-link :to="{name: 'profile'}" class="router">Perfil</router-link>
      <router-link :to="{name: 'budget'}" class="router">Presupuesto</router-link>
      <router-link :to="{name: 'transactions'}" class="router">Transacciones</router-link>
      <router-link :to="{name: 'calculators'}" class="router interest_calc">Calculadoras de intereses</router-link>
    </div>
  </nav>
  
  <!-- router-view sirve como un contenedor dinámico donde se cargarán los componentes según la ruta -->
  <router-view />
</template>

<style lang="scss" scoped>
@import './scss/colors';

/* Estilos para el icono del menú (hamburguesa) */
.menu {
  margin: 15px 15px;
  align-self: flex-start;
  height: 3.5rem;

  // Ocultar el icono en pantallas más grandes (desktop)
  @media (min-width: 581px) {
    display: none;
  }
}

/* Estilos de la barra de navegación */
.nav {
  display: flex;
  position: absolute;
  top: 0;
  flex-direction: column;
  background-color: $md-theme-light-primary;
  height: 5rem;  /* Altura inicial de la barra de navegación */
  width: 100%;
}

/* Contenedor de los enlaces de navegación */
.nav__div {
  display: flex;
  height: 5rem;
  width: 70%;  /* Ancho del contenedor en pantallas grandes */
  align-items: center;
}

/* Estilos de los enlaces de navegación */
.router {
  display: flex;
  width: 10rem;  /* Ancho de cada enlace */
  height: 5rem;
  justify-content: center;
  align-items: center;
  color: $md-theme-light-on-primary;  /* Color del texto */
  text-decoration: none;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Estilo específico para la calculadora de intereses */
.interest_calc{
  width: 10rem;
  display: flex;
  justify-content: center;
  padding: 20px;
}

/* Cambia el color de fondo cuando el usuario pasa el cursor por encima del enlace */
.router:hover {
  background-color: #6154db;
}

/* Cambia el color de fondo cuando el usuario hace clic en el enlace */
.router:active {
  background-color: #8076d8;
}

/* Estilos específicos para pantallas más pequeñas (menor a 580px) */
@media (max-width: 580px) {
  .nav {
    background-color: $md-theme-light-primary;
    height: 26rem;  /* Aumenta la altura cuando se despliega el menú */
    z-index: 1000;  /* Asegura que el menú esté por encima de otros elementos */
  }

  /* Alinea los enlaces verticalmente en pantallas pequeñas */
  .nav__div {
    display: flex;
    height: 80%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  /* Aumenta el ancho de los enlaces para que ocupen todo el ancho en pantallas pequeñas */
  .router {
    width: 100%;
  }

  /* Oculta el menú cuando buttonIsPulsed es false */
  .hide {
    visibility: hidden;
  }

  /* Ajusta la altura del menú cuando está comprimido */
  .change_size {
    height: 5.5rem;
  }
}
</style>

<script setup>
import { ref } from 'vue';

/* Estado reactivo que controla si el menú está desplegado o no */
const buttonIsPulsed = ref(true);

/* Función que alterna el valor de buttonIsPulsed para mostrar/ocultar el menú */
function swapClasses() {
  console.log("swap");
  buttonIsPulsed.value = !buttonIsPulsed.value;
}
</script>
