<template>
  <!-- Contenedor principal del menú con dos botones: uno para mostrar la vista de Gastos y otro para Ingresos -->
  <div class="menu">
    <!-- Botón para mostrar la vista de Gastos, llama a showExpensesView cuando se hace clic -->
    <button @click="showExpensesView" class="btn">Gastos</button>
    <!-- Botón para mostrar la vista de Ingresos, llama a showIncomesView cuando se hace clic -->
    <Button @click="showIncomesView" class="btn">Ingresos</Button>
  </div>

  <!-- Contenedor para mostrar los gráficos de historial -->
  <div class="graphs">
    <!-- Muestra el componente de historial de gastos si showExpenses es true -->
    <ExpensesHistoryComp v-if="showExpenses"/>
    <!-- Muestra el componente de historial de ingresos si showIncomes es true -->
    <IncomesHistoryComp v-if="showIncomes"/>
  </div>
</template>

<style lang="scss" scoped>
@import './../scss/colors';

/* Estilo del contenedor de los botones */
.menu {
  display: flex;
  justify-content: space-evenly;  /* Distribuye los botones de manera uniforme */
  margin-top: 6rem;
  width: 100%;
}

/* Estilo de los botones */
.btn {
  height: 3rem;
  width: 6rem;
  color: $md-theme-light-on-primary;  /* Color del texto */
  background-color: $md-theme-light-primary;  /* Color de fondo del botón */
  border: none;
  border-radius: 30px;  /* Botones redondeados */
}

/* Cambia el color del botón cuando el usuario pasa el cursor por encima */
.btn:hover {
  background-color: #5e51d4;
}

/* Cambia el color del botón cuando se hace clic */
.btn:active {
  background-color: #8076d8;
}

/* Estilos para pantallas más grandes (mínimo 581px) */
@media (min-width: 581px) {
  .graphs {
    margin: 2rem auto;
    width: 70vw;  /* Ajusta el ancho del gráfico */
    border-radius: 20px;  /* Bordes redondeados para el contenedor */
    border-color: $md-theme-light-secondary-container;  /* Color del borde */
    border-style: solid;  /* Borde sólido */
  }
}
</style>

<script setup>
import { ref } from 'vue';
import ExpensesHistoryComp from '@/components/Transactions/ExpensesHistoryComp.vue';  /* Importa el componente de historial de gastos */
import IncomesHistoryComp from '@/components/Transactions/IncomesHistoryComp.vue';  /* Importa el componente de historial de ingresos */

/* Estados reactivos para controlar qué vista (Gastos o Ingresos) se muestra */
const showExpenses = ref(true);  /* Muestra la vista de Gastos por defecto */
const showIncomes = ref(false);  /* La vista de Ingresos está oculta por defecto */

/* Función para mostrar la vista de Gastos y ocultar la de Ingresos */
function showExpensesView() {
  showExpenses.value = true;
  showIncomes.value = false;
}

/* Función para mostrar la vista de Ingresos y ocultar la de Gastos */
function showIncomesView() {
  showExpenses.value = false;
  showIncomes.value = true;
}
</script>
