import { ref } from "vue";

const transactionsExpenses = ref([]);
const transactionsIncomes = ref([]);

export function addTransactionExpense(expense, category, date, id) {
  transactionsExpenses.value.push({
    expense,
    category,
    date,
    id
  });
}

export function addTransactionIncome(income, category, date, id) {
  transactionsIncomes.value.push({
    income, 
    category,
    date,
    id
  });
}

export function showTransactionExpense() {
  return transactionsExpenses;
}

export function showTransactionIncome() {
  return transactionsIncomes;
}
