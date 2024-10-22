<template>
    <!-- Título principal del componente -->
    <h1 class="title">Interés simple</h1>
    
    <!-- Contenedor para el presupuesto inicial -->
    <div class="input-container" id="input-container-budget">
        <input type="number" id="initialBudget" class="input" placeholder=" " required v-model.number="budget">
        <label for="initialBudget" class="input-label">¿Cuánto es el presupuesto inicial? $</label>
    </div>
    
    <!-- Contenedor para la tasa de interés -->
    <div class="input-container" id="input-container-interestrate">
        <input type="number" id="interestRate" class="input" placeholder=" " required v-model.number="interest_rate">
        <label for="interestRate" class="input-label">¿Cuál es la tasa de interés? %</label>
    </div>

    <!-- Contenedor para el período de pago en años -->
    <div class="input-container" id="input-container-payment">
        <input type="number" id="paymentPeriod" class="input" placeholder=" " required v-model.number="period">
        <label for="paymentPeriod" class="input-label">¿Cuánto es el periodo de pago en años?</label>
    </div>

    <!-- Botón para realizar el cálculo -->
    <button @click.prevent="handleClick" class="confirm">Confirm</button>

    <!-- Mostrar resultados del cálculo -->
    <p v-if="result !== null" class="results">El valor final a pagar es: ${{ (result + budget).toFixed(2) }}</p>

    <!-- Mostrar mensaje de error si hay alguno -->
    <p v-if="error" class="results">{{ error }}</p>
</template>

<style lang="scss" scoped>
@import './../../scss/colors'; // Importar colores desde un archivo SCSS

.title {
    display: block; // Mostrar como bloque
    width: 12.5rem; // Ancho fijo
    margin: 2rem auto; // Margen superior e inferior y centrar horizontalmente
}

.confirm {
    display: block; // Comportamiento de bloque
    height: 4rem; // Altura del botón
    width: 10rem; // Ancho del botón
    border-color: $md-theme-light-secondary; // Color del borde
    color: $md-theme-light-on-primary; // Color del texto
    font-size: 1.3rem; // Tamaño de la fuente
    border-style: none; // Sin borde
    background-color: $md-theme-light-primary; // Color de fondo
    border-radius: 20px; // Bordes redondeados
    margin: 1rem auto; // Margen superior e inferior y centrar horizontalmente
}

.confirm:hover {
    background-color: #5e51d4; // Color al pasar el mouse
}

.confirm:active {
    background-color: #8076d8; // Color al hacer clic
}

.results {
    display: block; // Mostrar como bloque
    width: 100%; // Ancho completo
    text-align: center; // Centrar el texto
    margin: 1rem auto; // Margen superior e inferior
}

#input-container-budget,
#input-container-payment,
#input-container-interestrate {
    width: 20rem; // Ancho fijo para los contenedores
    margin: 0 auto 4rem; // Margen inferior
}

#initialBudget,
#paymentPeriod {
    width: 100%; // Ancho completo del campo de entrada
    height: 3rem; // Altura del campo de entrada
}

body {
    display: flex; // Usar flexbox para disposición vertical
    flex-direction: column; // Disposición en columna
    align-items: center; // Alinear elementos al centro
    justify-content: center; // Justificar elementos al centro
    min-height: 100vh; // Mínima altura del cuerpo
    background-color: #f0f0f5; // Color de fondo
    font-family: Arial, sans-serif; // Tipografía
}

.input-container {
    position: relative; // Posicionamiento relativo para etiquetas
    width: 60vw; // Ancho relativo
    margin-bottom: 5rem; // Margen inferior
}

.input {
    width: 100%; // Ancho completo
    padding: 10px; // Espaciado interno
    font-size: 16px; // Tamaño de la fuente
    border: 1px solid #ccc; // Borde gris claro
    border-radius: 4px; // Bordes redondeados
    background-color: #f9f9f9; // Color de fondo
    box-sizing: border-box; // Incluir padding en el tamaño total
}

/* Estilos para la etiqueta de los campos de entrada */
.input-label {
    position: absolute; // Posicionamiento absoluto
    top: 20%; // Posición vertical
    left: 1px; // Posición horizontal
    max-width: 750px; // Ancho máximo
    transform: translateY(-50%); // Centrarse verticalmente
    background: #f0f0f5; // Color de fondo
    padding: 0 5px; // Espaciado interno
    transition: 0.3s ease; // Transición suave
    color: grey; // Color del texto
}

/* Cambios de estado para la etiqueta */
.input:focus + .input-label,
.input:not(:placeholder-shown) + .input-label {
    top: -10px; // Elevar etiqueta
    font-size: 12px; // Tamaño de la fuente
    color: #333; // Color del texto
}

/* Estilos al enfocar el campo de entrada */
.input:focus {
    outline: none; // Quitar contorno por defecto
    border-color: #6200ea; // Color del borde al enfocar
}
</style>

<script setup>
// Importar funciones y librerías necesarias desde Vue
import { ref } from "vue"; // Para crear variables reactivas

// Variables reactivas para almacenar los datos del formulario
const budget = ref(0); // Presupuesto inicial
const interest_rate = ref(0); // Tasa de interés
const period = ref(0); // Período de pago en años
const result = ref(null); // Resultado del cálculo
const error = ref(""); // Mensaje de error

// Función que se ejecuta al hacer clic en el botón
function handleClick() {
    // Reiniciar resultados y errores
    result.value = null;
    error.value = "";

    // Validación de entradas
    if (budget.value <= 0) {
        error.value = "El presupuesto inicial debe ser mayor que 0.";
        return; // Salir si hay error
    }

    if (interest_rate.value <= 0) {
        error.value = "La tasa de interés debe ser mayor que 0.";
        return; // Salir si hay error
    }

    if (period.value <= 0) {
        error.value = "El período debe ser mayor que 0.";
        return; // Salir si hay error
    }

    // Cálculo de interés simple
    result.value = budget.value * (interest_rate.value / 100) * period.value; // Cálculo del interés
}
</script>
