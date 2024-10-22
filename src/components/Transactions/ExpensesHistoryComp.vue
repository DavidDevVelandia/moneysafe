<template>
  <div class="container">
    <!-- Botón para seleccionar gráfico diario -->
    <button class="btn" @click="ChartType='Daily'">Diario</button>
    <!-- Botón para seleccionar gráfico mensual -->
    <button class="btn" @click="ChartType='Monthly'">Mensual</button>
    <!-- Botón para seleccionar gráfico anual -->
    <button class="btn" @click="ChartType='Anualy'">Anual</button>
  </div>
  
  <!-- Renderización condicional de los componentes de gráficos -->
  <DailyComp v-if="ChartType=='Daily'"/>
  <MonthlyComp v-if="ChartType=='Monthly'"/>
  <AnualyComp v-if="ChartType=='Anualy'"/>
</template>

<style lang="scss" scoped>
@import './../../scss/colors'; // Importar colores desde un archivo SCSS

.container {
  display: flex; // Usar flexbox para alinear los botones
  width: 80%; // Ancho del contenedor
  margin: 2rem auto; // Margen superior e inferior, centrar horizontalmente
  justify-content: space-around; // Espaciado uniforme entre botones
}

.btn {
  height: 3rem; // Altura del botón
  width: 8rem; // Ancho del botón
  border-radius: 20px; // Bordes redondeados
  color: $md-theme-light-on-primary; // Color del texto
  background-color: $md-theme-light-primary; // Color de fondo del botón
  border: none; // Sin borde
  cursor: pointer; // Cambiar el cursor al pasar sobre el botón
}

.btn:hover {
  background-color: #5e51d4; // Color de fondo al pasar el mouse
}

.btn:active {
  background-color: #8076d8; // Color de fondo al hacer clic
}
</style>

<script setup>
import { ref } from 'vue'; // Importar ref de Vue para crear variables reactivas

// Importar los componentes que se utilizarán para los diferentes tipos de gráficos
import DailyComp from './ExpensesDates/DailyComp.vue';
import MonthlyComp from './ExpensesDates/MonthlyComp.vue';
import AnualyComp from './ExpensesDates/AnualyComp.vue';

// Crear una variable reactiva para gestionar el tipo de gráfico seleccionado
const ChartType = ref("Daily"); // Valor inicial es "Daily"
</script>
