import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '@/views/ProfileView.vue'
import BudgetView from '@/views/BudgetView.vue'
import TransactionsView from '@/views/TransactionsView.vue'
import CalculatorsView from '@/views/CalculatorsView.vue'
import SimpleInterestComp from '@/components/calculators/SimpleInterestComp.vue'
import CompoundInterestComp from '@/components/calculators/CompoundInterestComp.vue'
import ExpensesComp from '@/components/budget/ExpensesComp.vue'
import IncomesComp from '@/components/budget/IncomesComp.vue'

const routes = [
  {
    path: '/',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/budget',
    name: 'budget',
    component: BudgetView,
    children: [
      {
        path: 'expenses',
        name: 'expenses',
        component: ExpensesComp
      },
      {
        path: 'incomes',
        name: 'incomes',
        component: IncomesComp
      }
    ]
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: TransactionsView
  },
  {
    path: '/calculators',
    name: 'calculators',
    component: CalculatorsView,
    children: [
      {
        path: 'simple-interest',
        name: 'simple-interest',
        component: SimpleInterestComp
      },
      {
        path: 'compound-interest',
        name: 'compound-interest',
        component: CompoundInterestComp
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
