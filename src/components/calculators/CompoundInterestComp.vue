<template>
  <h1 class="title">Interés compuesto</h1>
  <div class="input-container" id="input-container-budget">
      <input type="number" id="initialBudget" class="input" placeholder=" " required v-model.number="budget">
      <label for="initialBudget" class="input-label">¿Cuánto es el presupuesto inicial? $</label>
  </div>
  <div class="interest-container">
      <div class="input-container">
          <input type="number" id="interestRate" class="input" placeholder=" " required v-model.number="interest_rate">
          <label for="interestRate" class="input-label">¿Cuál es la tasa de interés? %</label>
      </div>

      <div class="input-container">
          <select id="interestPeriod" class="input" required v-model="interest_period">
              <option value="" disabled selected hidden></option>
              <option value="mensual">mensual</option>
              <option value="bimestral">bimestral</option>
              <option value="trimestral">trimestral</option>
              <option value="semestral">semestral</option>
              <option value="anual">anual</option>
          </select>
          <label for="interestPeriod" class="input-label">Período</label>
      </div>
  </div>
  
  <div class="input-container" id="input-container-payment">
      <input type="number" id="paymentPeriod" class="input" placeholder=" " required v-model.number="period">
      <label for="paymentPeriod" class="input-label">¿Cuánto es el periodo de pago en años?</label>
  </div>

  <button @click.prevent="handleClick" class="confirm">Confirm</button>
  <p v-if="result !== null" class="results">El valor final es: ${{ result.toFixed(2) }}</p>
  <p v-if="error" class="results">{{ error }}</p>
</template>

<style lang="scss" scoped>
@import "./../../scss/colors";
.title {
  display: block;
  width: 16rem;
  margin: 5rem auto;
}
.interest-container {
  display: flex;
  margin: 0 auto;
  width: 80vw;
  justify-content: space-between;
}
.confirm{
    display: block;
    height: 4rem;
    width: 10rem;
    border-color: $md-theme-light-secondary;
    color: $md-theme-light-on-primary;
    font-size: 1.3rem;
    border-style: none;
    background-color: $md-theme-light-primary;
    border-radius: 20px;
    margin: 1rem auto;
}
.results {
  display: block;
  width: rem;
  margin: 0 auto;
}
.interest-container.input-container {}
#input-container-budget {
  width: 20rem;
  margin: 0 auto;
}
#input-container-budget {
  margin-bottom: 5rem;
}
#initialBudget {
  width: 20rem;
  height: 4rem;
}
#paymentPeriod {
  height: 5rem;
}
#input-container-payment {
  margin: 0 auto;
  height: 5rem;
}
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f0f5;
  font-family: Arial, sans-serif;
}

.input-container {
  position: relative;
  width: 60vw;
  margin-bottom: 5rem;
}

.input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  box-sizing: border-box;
}

select.input {
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Chrome, Safari, Edge, Opera */
  appearance: none;
}

.input-label {
  position: absolute;
  top: 20%;
  left: 1px;
  max-width: 750px;
  transform: translateY(-50%);
  background: #f0f0f5;
  padding: 0 5px;
  transition: 0.3s ease;
  color: grey;
}

.input:focus + .input-label,
.input:not(:placeholder-shown) + .input-label,
select.input:valid + .input-label {
  top: -10px;
  font-size: 12px;
  color: #333;
}

.input:focus {
  outline: none;
  border-color: #6200ea;
}

select.input {
  padding-right: 30px; /* espacio para el icono de dropdown */
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%276200ea%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27/%3e%3c/svg%3e');
  background-repeat: no-repeat;
  background-position: right 10px top 50%;
  background-size: 16px 16px;
}
</style>

<script setup>
import { ref } from "vue"

const budget = ref(0);
const interest_rate = ref(0);
const period = ref(0);
const interest_period = ref("");
const result = ref(null);
const error = ref("");

const periods_per_year = {
  "mensual": 12,
  "bimestral": 6,
  "trimestral": 4,
  "semestral": 2,
  "anual": 1
};

function handleClick() {
  result.value = null;
  error.value = "";

  if (budget.value <= 0) {
      error.value = "El presupuesto inicial debe ser mayor que 0.";
      return;
  }

  if (interest_rate.value <= 0) {
      error.value = "La tasa de interés debe ser mayor que 0.";
      return;
  }

  if (period.value <= 0) {
      error.value = "El período debe ser mayor que 0.";
      return;
  }

  if (!interest_period.value) {
      error.value = "Por favor, selecciona un período de interés.";
      return;
  }

  const n = periods_per_year[interest_period.value];
  const r = interest_rate.value / 100 / n;
  const t = period.value * n;
  result.value = budget.value * Math.pow((1 + r), t);
}
</script>
