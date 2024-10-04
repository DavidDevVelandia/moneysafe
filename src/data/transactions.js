import { ref, watch } from "vue";

// Cargar transacciones de gastos e ingresos de localStorage o usar valores por defecto
const savedExpenses = JSON.parse(localStorage.getItem('transactionsExpenses')) || [];
const savedIncomes = JSON.parse(localStorage.getItem('transactionsIncomes')) || [];

const transactionsExpenses = ref(savedExpenses);
const transactionsIncomes = ref(savedIncomes);

export function addTransactionExpense(expense, category, date, id) {
  transactionsExpenses.value.push({ expense, category, date, id });
  saveTransactionsToLocalStorage(); // Guardar en localStorage
}

export function addTransactionIncome(income, category, date, id) {
  transactionsIncomes.value.push({ income, category, date, id });
  saveTransactionsToLocalStorage(); // Guardar en localStorage
}

// Funciones para eliminar transacciones
export function removeTransactionExpense(index) {
  transactionsExpenses.value.splice(index, 1);
  saveTransactionsToLocalStorage(); // Actualizar localStorage
}

export function removeTransactionIncome(index) {
  transactionsIncomes.value.splice(index, 1);
  saveTransactionsToLocalStorage(); // Actualizar localStorage
}

export function showTransactionExpense() {
  return transactionsExpenses;
}

export function showTransactionIncome() {
  return transactionsIncomes;
}

// Guardar las transacciones en localStorage
function saveTransactionsToLocalStorage() {
  localStorage.setItem('transactionsExpenses', JSON.stringify(transactionsExpenses.value));
  localStorage.setItem('transactionsIncomes', JSON.stringify(transactionsIncomes.value));
}

// Observar los cambios en las listas de transacciones para guardarlos automáticamente
watch(transactionsExpenses, saveTransactionsToLocalStorage, { deep: true });
watch(transactionsIncomes, saveTransactionsToLocalStorage, { deep: true });
