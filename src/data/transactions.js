import { ref } from "vue"
const transactionsExpenses = ref([
    
])
export function addTransactionExpense(expense, category, date, id){
    transactionsExpenses.value.push({
        expense,
        category,
        date,
        id
    })
}

export function showTransactionExpense(){
    return transactionsExpenses
}