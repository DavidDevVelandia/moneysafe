<template>
  <div class="container">
      <!-- Botón para seleccionar gráfico diario -->
      <button class="btn" @click="ChartType='Daily'">Diario</button>
      <!-- Botón para seleccionar gráfico mensual -->
      <button class="btn" @click="ChartType='Monthly'">Mensual</button>
      <!-- Botón para seleccionar gráfico anual -->
      <button class="btn" @click="ChartType='Anualy'">Anual</button>
  </div>
  
  <!-- Componente de gráfico diario -->
  <DailyComp v-if="ChartType=='Daily'"/>
  <!-- Componente de gráfico mensual -->
  <MonthlyComp v-if="ChartType=='Monthly'"/>
  <!-- Componente de gráfico anual -->
  <AnualyComp v-if="ChartType=='Anualy'"/>
</template>

<style lang="scss" scoped>
@import './../../scss/colors'; // Importar estilos de colores desde un archivo SCSS

.container {
  display: flex; // Usar flexbox para alinear botones
  width: 80%; // Ancho del contenedor
  margin: 2rem auto; // Margen superior e inferior, centrar horizontalmente
  justify-content: space-around; // Espacio uniforme entre botones
}

.btn {
  height: 3rem; // Altura del botón
  width: 8rem; // Ancho del botón
  border-radius: 20px; // Bordes redondeados
  color: $md-theme-light-on-primary; // Color del texto
  background-color: $md-theme-light-primary; // Color de fondo
  border: none; // Sin borde
  cursor: pointer; // Cambiar cursor al pasar sobre el botón
}

.btn:hover {
  background-color: #5e51d4; // Color al pasar el mouse
}

.btn:active {
  background-color: #8076d8; // Color al hacer clic
}
</style>

<script setup>
// Importar componentes que se utilizarán
import AnualyComp from './IncomesDates/AnualyComp.vue';
import DailyComp from './IncomesDates/DailyComp.vue';
import MonthlyComp from './IncomesDates/MonthlyComp.vue';
import { ref } from 'vue'; // Importar ref de Vue para crear variables reactivas

// Variable reactiva para gestionar el tipo de gráfico seleccionado
const ChartType = ref("Daily"); // Valor inicial es "Daily"
</script>
