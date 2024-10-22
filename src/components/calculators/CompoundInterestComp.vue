<template>
  <!-- Título principal de la página -->
  <h1 class="title">Interés compuesto</h1>
  
  <!-- Contenedor para el presupuesto inicial -->
  <div class="input-container" id="input-container-budget">
      <input 
          type="number" 
          id="initialBudget" 
          class="input" 
          placeholder=" " 
          required 
          v-model.number="budget"> <!-- Enlaza el valor del input con la variable 'budget' -->
      <label for="initialBudget" class="input-label">¿Cuánto es el presupuesto inicial? $</label>
  </div>
  
  <!-- Contenedor para los campos de interés -->
  <div class="interest-container">
      <div class="input-container">
          <input 
              type="number" 
              id="interestRate" 
              class="input" 
              placeholder=" " 
              required 
              v-model.number="interest_rate"> <!-- Enlaza el valor del input con la variable 'interest_rate' -->
          <label for="interestRate" class="input-label">¿Cuál es la tasa de interés? %</label>
      </div>

      <div class="input-container">
          <select 
              id="interestPeriod" 
              class="input" 
              required 
              v-model="interest_period"> <!-- Enlaza el valor del select con la variable 'interest_period' -->
              <option value="" disabled selected hidden></option> <!-- Opción por defecto -->
              <option value="mensual">mensual</option>
              <option value="bimestral">bimestral</option>
              <option value="trimestral">trimestral</option>
              <option value="semestral">semestral</option>
              <option value="anual">anual</option>
          </select>
          <label for="interestPeriod" class="input-label">Período</label>
      </div>
  </div>
  
  <!-- Contenedor para el periodo de pago -->
  <div class="input-container" id="input-container-payment">
      <input 
          type="number" 
          id="paymentPeriod" 
          class="input" 
          placeholder=" " 
          required 
          v-model.number="period"> <!-- Enlaza el valor del input con la variable 'period' -->
      <label for="paymentPeriod" class="input-label">¿Cuánto es el periodo de pago en años?</label>
  </div>
  
  <!-- Botón para confirmar el cálculo -->
  <button @click.prevent="handleClick" class="confirm">Confirm</button>
  
  <!-- Mostrar resultado del cálculo -->
  <p v-if="result !== null" class="results">
    El valor final es: ${{ result.toFixed(2) }} <br>
    Pagando ${{ periodic_payment.toFixed(2) }} {{ period_label }} adicional.
  </p>
  
  <!-- Mostrar mensajes de error -->
  <p v-if="error" class="results">{{ error }}</p>
</template>

<style lang="scss" scoped>
@import "./../../scss/colors"; /* Importa los colores desde un archivo SCSS */

.title {
  display: block; /* Define como bloque para centrar el título */
  width: 16rem; /* Ancho fijo para el título */
  margin: 2rem auto; /* Margen superior e inferior, centrado horizontalmente */
}

.interest-container {
  display: flex; /* Usar flexbox para alinear los inputs */
  margin: 0 auto; /* Centrar el contenedor */
  width: 80vw; /* Ancho del 80% de la ventana */
  justify-content: space-between; /* Espacio entre los elementos hijos */
}

.confirm {
    display: block; /* Mostrar como bloque */
    height: 4rem; /* Altura del botón */
    width: 10rem; /* Ancho del botón */
    border-color: $md-theme-light-secondary; /* Color del borde */
    color: $md-theme-light-on-primary; /* Color del texto */
    font-size: 1.3rem; /* Tamaño de fuente */
    border-style: none; /* Sin borde */
    background-color: $md-theme-light-primary; /* Color de fondo */
    border-radius: 20px; /* Esquinas redondeadas */
    margin: 1rem auto; /* Margen superior e inferior, centrado horizontalmente */
}

.results {
  display: block; /* Mostrar como bloque */
  width: 100%; /* Ancho completo */
  text-align: center; /* Centrar el texto */
  margin: 1rem auto; /* Margen superior e inferior */
}

#input-container-budget {
  width: 20rem; /* Ancho fijo para el contenedor de presupuesto */
  margin: 0 auto; /* Centrar el contenedor */
  margin-bottom: 5rem; /* Espaciado inferior */
}

#initialBudget, #paymentPeriod {
  width: 20rem; /* Ancho fijo para los inputs */
  height: 2.5rem; /* Altura del input */
}

#input-container-payment {
  margin: 0 auto; /* Centrar el contenedor de pago */
  height: 5rem; /* Altura del contenedor */
}

body {
  display: flex; /* Usar flexbox para centrar todo el contenido de la página */
  flex-direction: column; /* Organizar los elementos en columna */
  align-items: center; /* Centrar los elementos horizontalmente */
  justify-content: center; /* Centrar los elementos verticalmente */
  min-height: 100vh; /* Altura mínima para ocupar toda la ventana */
  background-color: #f0f0f5; /* Color de fondo */
  font-family: Arial, sans-serif; /* Tipografía */
}

.input-container {
  position: relative; /* Posición relativa para la etiqueta flotante */
  width: 60vw; /* Ancho del 60% de la ventana */
  margin-bottom: 5rem; /* Espaciado inferior */
}

.confirm:hover {
  background-color: #5e51d4; /* Color de fondo al pasar el mouse */
}

.confirm:active {
  background-color: #8076d8; /* Color de fondo al hacer clic */
}

.input {
  width: 100%; /* Ancho completo */
  padding: 10px; /* Espaciado interno */
  font-size: 16px; /* Tamaño de fuente */
  border: 1px solid #ccc; /* Borde */
  border-radius: 4px; /* Esquinas redondeadas */
  background-color: #f9f9f9; /* Color de fondo */
  box-sizing: border-box; /* Incluir padding y border en el tamaño total */
}

select.input {
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Chrome, Safari, Edge, Opera */
  appearance: none; /* Eliminar estilo predeterminado del select */
}

.input-label {
  position: absolute; /* Posición absoluta para la etiqueta flotante */
  top: 20%; /* Posición superior */
  left: 1px; /* Posición izquierda */
  max-width: 750px; /* Ancho máximo para la etiqueta */
  transform: translateY(-50%); /* Centrar verticalmente la etiqueta */
  background: #f0f0f5; /* Color de fondo de la etiqueta */
  padding: 0 5px; /* Espaciado interno */
  transition: 0.3s ease; /* Transición suave */
  color: grey; /* Color de texto */
}

.input:focus + .input-label,
.input:not(:placeholder-shown) + .input-label,
select.input:valid + .input-label {
  top: -10px; /* Mover la etiqueta hacia arriba */
  font-size: 12px; /* Tamaño de fuente más pequeño */
  color: #333; /* Color de texto más oscuro */
}

.input:focus {
  outline: none; /* Eliminar contorno al enfocar el input */
  border-color: #6200ea; /* Cambiar color de borde al enfocar */
}

select.input {
  padding-right: 30px; /* Espacio para el icono del dropdown */
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%276200ea%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27/%3e%3c/svg%3e'); /* Icono de dropdown */
  background-repeat: no-repeat; /* No repetir la imagen */
  background-position: right 10px top 50%; /* Posición del icono */
  background-size: 16px 16px; /* Tamaño del icono */
}
</style>

<script setup>
// Importar ref de Vue para manejar el estado reactivo
import { ref } from "vue"

// Variables reactivas
const budget = ref(0); // Presupuesto inicial
const interest_rate = ref(0); // Tasa de interés
const period = ref(0); // Período de pago en años
const interest_period = ref(""); // Período de interés seleccionado
const result = ref(null); // Resultado del cálculo
const error = ref(""); // Mensaje de error
const periodic_payment = ref(0); // Pago periódico
const period_label = ref(""); // Etiqueta del período de pago

// Mapa de períodos por año
const periods_per_year = {
  "mensual": 12,
  "bimestral": 6,
  "trimestral": 4,
  "semestral": 2,
  "anual": 1
};

// Función que se ejecuta al hacer clic en el botón de confirmación
function handleClick() {
  // Reiniciar resultados y errores
  result.value = null;
  error.value = "";
  periodic_payment.value = 0;
  period_label.value = "";

  // Validaciones de entrada
  if (budget.value <= 0) {
      error.value = "El presupuesto inicial debe ser mayor que 0."; // Mensaje de error
      return; // Salir de la función si hay error
  }

  if (interest_rate.value <= 0) {
      error.value = "La tasa de interés debe ser mayor que 0."; // Mensaje de error
      return; // Salir de la función si hay error
  }

  if (period.value <= 0) {
      error.value = "El período debe ser mayor que 0."; // Mensaje de error
      return; // Salir de la función si hay error
  }

  if (!interest_period.value) {
      error.value = "Por favor, selecciona un período de interés."; // Mensaje de error
      return; // Salir de la función si hay error
  }

  // Cálculo de interés compuesto
  const n = periods_per_year[interest_period.value]; // Número de períodos por año
  const r = interest_rate.value / 100 / n; // Tasa de interés por período
  const t = period.value * n; // Total de períodos
  result.value = budget.value * Math.pow((1 + r), t); // Cálculo del valor final

  // Cálculo del pago por período
  switch (interest_period.value) {
    case "mensual":
      periodic_payment.value = result.value / (period.value * 12); // Cálculo mensual
      period_label.value = "mensuales"; // Etiqueta
      break;
    case "bimestral":
      periodic_payment.value = result.value / (period.value * 6); // Cálculo bimestral
      period_label.value = "bimestrales"; // Etiqueta
      break;
    case "trimestral":
      periodic_payment.value = result.value / (period.value * 4); // Cálculo trimestral
      period_label.value = "trimestrales"; // Etiqueta
      break;
    case "semestral":
      periodic_payment.value = result.value / (period.value * 2); // Cálculo semestral
      period_label.value = "semestrales"; // Etiqueta
      break;
    case "anual":
      periodic_payment.value = result.value / period.value; // Cálculo anual
      period_label.value = "anuales"; // Etiqueta
      break;
  }
}
</script>
