<template>
  <div class="transactions-container">
    <!-- Balance Total -->
    <h1 class="balance-total">Balance Total: ${{ balanceTotal }}</h1>
    
    <!-- Tabla de Últimos Gastos -->
    <h2 class="table-title">Últimos Gastos</h2>
    <table class="transactions-table">
      <thead>
        <tr>
          <th>Gasto</th>
          <th>Categoría</th>
          <th>Fecha</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(gasto, index) in ultimosGastos" :key="gasto.date + gasto.category.name">
          <td>{{ gasto.expense }}</td>
          <td>{{ gasto.category.name }}</td>
          <td>{{ gasto.date }}</td>
          <td>
            <button @click="eliminarGasto(index)" class="delete-btn">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Tabla de Últimos Ingresos -->
    <h2 class="table-title">Últimos Ingresos</h2>
    <table class="transactions-table">
      <thead>
        <tr>
          <th>Ingreso</th>
          <th>Categoría</th>
          <th>Fecha</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ingreso, index) in ultimosIngresos" :key="ingreso.date + ingreso.category.name">
          <td>{{ ingreso.income }}</td>
          <td>{{ ingreso.category.name }}</td>
          <td>{{ ingreso.date }}</td>
          <td>
            <button @click="eliminarIngreso(index)" class="delete-btn">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Botones para ver historial -->
    <div class="history-buttons">
      <button class="view-history-btn" @click="mostrarHistorialGastos = true">Ver Historial Completo de Gastos</button>
      <button class="view-history-btn" @click="mostrarHistorialIngresos = true">Ver Historial Completo de Ingresos</button>
    </div>

    <!-- Modal de Historial Completo de Gastos -->
<div v-if="mostrarHistorialGastos" class="modal-overlay">
  <div class="modal-content">
    <h2>Historial Completo de Gastos</h2>
    <table class="transactions-table">
      <thead>
        <tr>
          <th>Gasto</th>
          <th>Categoría</th>
          <th>Fecha</th>
          <th>Acción</th> <!-- Nueva columna para acción -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(gasto, index) in gastos" :key="gasto.date + gasto.category.name">
          <td>{{ gasto.expense }}</td>
          <td>{{ gasto.category.name }}</td>
          <td>{{ gasto.date }}</td>
          <td>
            <button @click="eliminarGasto(index)" class="delete-btn">Eliminar</button> <!-- Botón de eliminar -->
          </td>
        </tr>
      </tbody>
    </table>
    <button class="close-btn" @click="mostrarHistorialGastos = false">Cerrar</button>
  </div>
</div>

<!-- Modal de Historial Completo de Ingresos -->
<div v-if="mostrarHistorialIngresos" class="modal-overlay">
  <div class="modal-content">
    <h2>Historial Completo de Ingresos</h2>
    <table class="transactions-table">
      <thead>
        <tr>
          <th>Ingreso</th>
          <th>Categoría</th>
          <th>Fecha</th>
          <th>Acción</th> <!-- Nueva columna para acción -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ingreso, index) in ingresos" :key="ingreso.date + ingreso.category.name">
          <td>{{ ingreso.income }}</td>
          <td>{{ ingreso.category.name }}</td>
          <td>{{ ingreso.date }}</td>
          <td>
            <button @click="eliminarIngreso(index)" class="delete-btn">Eliminar</button> <!-- Botón de eliminar -->
          </td>
        </tr>
      </tbody>
    </table>
    <button class="close-btn" @click="mostrarHistorialIngresos = false">Cerrar</button>
  </div>
</div>
</div>

<h2>Gestión de datos</h2>
 <!-- Sección para exportar e importar archivos -->
 <div class="ioActions">
    <!-- Botón para exportar -->
    <button @click="exportData" class="export-btn">Exportar Datos</button>

    <!-- Botón estilizado para seleccionar archivo -->
    <label for="import-file" class="import-label">Seleccionar Archivo .mon</label>
    <input type="file" id="import-file" @change="importData" accept=".mon" class="import-input" />

  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { 
  showTransactionExpense, 
  showTransactionIncome, 
  removeTransactionExpense, 
  removeTransactionIncome 
} from '@/data/transactions';

export default {
  name: 'TransactionsView',
  setup() {
    const mostrarHistorialGastos = ref(false);
    const mostrarHistorialIngresos = ref(false);

    const gastos = showTransactionExpense();
    const ingresos = showTransactionIncome();

    const balanceTotal = computed(() => {
    const totalIngresos = ingresos.value.reduce((acc, item) => acc + item.income, 0);
    const totalGastos = gastos.value.reduce((acc, item) => acc + item.expense, 0);
    return totalIngresos - totalGastos;
  });


    const ultimosGastos = computed(() => gastos.value.slice(-10).reverse());
    const ultimosIngresos = computed(() => ingresos.value.slice(-10).reverse());

    // Funciones para eliminar gastos e ingresos
    const eliminarGasto = (index) => {
      removeTransactionExpense(index);
    };

    const eliminarIngreso = (index) => {
      removeTransactionIncome(index);
    };

    // Función para exportar los datos como archivo .mon
    const exportData = () => {
      const data = {
        gastos: gastos.value,
        ingresos: ingresos.value
      };

      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'transactions.mon';
      link.click();
      URL.revokeObjectURL(link.href);
    };

    // Función para importar los datos desde un archivo .mon
    const importData = (event) => {
      const file = event.target.files[0];

      if (file && file.name.endsWith('.mon')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target.result;
            const parsedData = JSON.parse(content);

            // Reemplazar los valores actuales con los del archivo importado
            gastos.value = parsedData.gastos || [];
            ingresos.value = parsedData.ingresos || [];
            alert('Datos importados exitosamente');
          } catch (error) {
            console.error("Error al importar el archivo:", error);
            alert('El archivo seleccionado no tiene un formato válido.');
          }
        };
        reader.readAsText(file);
      } else {
        alert('Por favor, selecciona un archivo .mon válido.');
      }
    };

    return {
      mostrarHistorialGastos,
      mostrarHistorialIngresos,
      balanceTotal,
      ultimosGastos,
      ultimosIngresos,
      gastos,
      ingresos,
      eliminarGasto,
      eliminarIngreso,
      exportData,
      importData,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_colors.scss";

/* Estilos Generales */
.transactions-container {
  background-color: $md-theme-light-background;
  color: $md-theme-light-on-background;
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 90%;
  margin: 2rem auto;
  box-shadow: 0 0.4rem 0.8rem rgba($md-theme-light-shadow, 0.2);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

h2{
  display: block;
  height: fit-content;
  width: 11rem;
  margin: 0 auto;
}

h1.balance-total {
  margin-top: 4rem;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: $md-theme-light-primary;
}

.table-title {
  font-size: 1.5rem;
  margin-top: 1.5rem;
  color: $md-theme-light-secondary;
}

.transactions-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

.transactions-table th,
.transactions-table td {
  padding: 1rem;
  text-align: left;
  border: 0.1rem solid $md-theme-light-outline;
}

.transactions-table th {
  background-color: $md-theme-light-primary-container;
  color: $md-theme-light-on-primary-container;
}

.transactions-table td {
  background-color: $md-theme-light-surface;
  color: $md-theme-light-on-surface;
}

.history-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

/* Botones */
button {
  padding: 1rem 1.5rem;
  margin: 0.5rem;
  cursor: pointer;
  border: none;
  border-radius: 0.4rem;
  font-size: 1rem;
  display: inline-block;
  text-align: center;
}

.view-history-btn {
  background-color: $md-theme-light-secondary;
  color: $md-theme-light-on-secondary;
}

.view-history-btn:hover {
  background-color: $md-theme-light-secondary-container;
  color: $md-theme-light-on-secondary-container;
}

/* Botón de eliminación */
.delete-btn {
  background-color: $md-theme-light-error;
  color: $md-theme-light-on-error;
  border-radius: 0.4rem;
  padding: 0.5rem 1rem;
}

.delete-btn:hover {
  background-color: $md-theme-light-error-container;
  color: $md-theme-light-on-error-container;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: $md-theme-light-surface;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.4rem 0.8rem rgba($md-theme-light-shadow, 0.2);
  max-width: 80%;
}

.close-btn {
  background-color: $md-theme-light-primary;
  color: $md-theme-light-on-primary;
}

.ioActions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.export-btn {
  background-color: $md-theme-light-secondary;
  color: $md-theme-light-on-secondary;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.export-btn:hover {
  background-color: $md-theme-light-secondary-container;
}

.import-input {
  display: block;
}

/* Estilos para la sección de importación */
.import-label {
  background-color: $md-theme-light-secondary;
  color: $md-theme-light-on-secondary;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  font-size: 1rem;
  margin: 0.5rem;
}

.import-label:hover {
  background-color: $md-theme-light-secondary-container;
  color: $md-theme-light-on-secondary-container;
}

/* Ocultar el input de archivo original */
.import-input {
  display: none;
}

</style>
