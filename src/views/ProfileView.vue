<template>
  <div class="transactions-container">
    <!-- Muestra el balance total calculado -->
    <h1 class="balance-total">Balance Total: ${{ balanceTotal }}</h1>
    
    <!-- Título de la tabla de últimos gastos -->
    <h2 class="table-title">Últimos Gastos</h2>
    <table class="transactions-table">
      <thead>
        <tr>
          <th>Gasto</th> <!-- Columna para el valor del gasto -->
          <th>Categoría</th> <!-- Columna para la categoría del gasto -->
          <th>Fecha</th> <!-- Columna para la fecha del gasto -->
          <th>Acción</th> <!-- Columna para la acción a realizar -->
        </tr>
      </thead>
      <tbody>
        <!-- Itera sobre los últimos gastos y crea una fila para cada uno -->
        <tr v-for="(gasto, index) in ultimosGastos" :key="gasto.date + gasto.category.name">
          <td>{{ gasto.expense }}</td> <!-- Muestra el gasto -->
          <td>{{ gasto.category.name }}</td> <!-- Muestra la categoría del gasto -->
          <td>{{ gasto.date }}</td> <!-- Muestra la fecha del gasto -->
          <td>
            <!-- Botón para eliminar el gasto, llama a la función eliminarGasto -->
            <button @click="eliminarGasto(index)" class="delete-btn">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Título de la tabla de últimos ingresos -->
    <h2 class="table-title">Últimos Ingresos</h2>
    <table class="transactions-table">
      <thead>
        <tr>
          <th>Ingreso</th> <!-- Columna para el valor del ingreso -->
          <th>Categoría</th> <!-- Columna para la categoría del ingreso -->
          <th>Fecha</th> <!-- Columna para la fecha del ingreso -->
          <th>Acción</th> <!-- Columna para la acción a realizar -->
        </tr>
      </thead>
      <tbody>
        <!-- Itera sobre los últimos ingresos y crea una fila para cada uno -->
        <tr v-for="(ingreso, index) in ultimosIngresos" :key="ingreso.date + ingreso.category.name">
          <td>{{ ingreso.income }}</td> <!-- Muestra el ingreso -->
          <td>{{ ingreso.category.name }}</td> <!-- Muestra la categoría del ingreso -->
          <td>{{ ingreso.date }}</td> <!-- Muestra la fecha del ingreso -->
          <td>
            <!-- Botón para eliminar el ingreso, llama a la función eliminarIngreso -->
            <button @click="eliminarIngreso(index)" class="delete-btn">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Botones para ver el historial completo de gastos e ingresos -->
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
              <th>Gasto</th> <!-- Columna para el valor del gasto -->
              <th>Categoría</th> <!-- Columna para la categoría del gasto -->
              <th>Fecha</th> <!-- Columna para la fecha del gasto -->
              <th>Acción</th> <!-- Columna para la acción a realizar -->
            </tr>
          </thead>
          <tbody>
            <!-- Itera sobre todos los gastos y crea una fila para cada uno -->
            <tr v-for="(gasto, index) in gastos" :key="gasto.date + gasto.category.name">
              <td>{{ gasto.expense }}</td> <!-- Muestra el gasto -->
              <td>{{ gasto.category.name }}</td> <!-- Muestra la categoría del gasto -->
              <td>{{ gasto.date }}</td> <!-- Muestra la fecha del gasto -->
              <td>
                <!-- Botón para eliminar el gasto, llama a la función eliminarGasto -->
                <button @click="eliminarGasto(index)" class="delete-btn">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Botón para cerrar el modal -->
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
              <th>Ingreso</th> <!-- Columna para el valor del ingreso -->
              <th>Categoría</th> <!-- Columna para la categoría del ingreso -->
              <th>Fecha</th> <!-- Columna para la fecha del ingreso -->
              <th>Acción</th> <!-- Columna para la acción a realizar -->
            </tr>
          </thead>
          <tbody>
            <!-- Itera sobre todos los ingresos y crea una fila para cada uno -->
            <tr v-for="(ingreso, index) in ingresos" :key="ingreso.date + ingreso.category.name">
              <td>{{ ingreso.income }}</td> <!-- Muestra el ingreso -->
              <td>{{ ingreso.category.name }}</td> <!-- Muestra la categoría del ingreso -->
              <td>{{ ingreso.date }}</td> <!-- Muestra la fecha del ingreso -->
              <td>
                <!-- Botón para eliminar el ingreso, llama a la función eliminarIngreso -->
                <button @click="eliminarIngreso(index)" class="delete-btn">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Botón para cerrar el modal -->
        <button class="close-btn" @click="mostrarHistorialIngresos = false">Cerrar</button>
      </div>
    </div>
  </div>

  <!-- Sección para gestión de datos -->
  <h2>Gestión de datos</h2>
  <div class="ioActions">
    <!-- Botón para exportar datos como archivo .mon -->
    <button @click="exportData" class="export-btn">Exportar Datos</button>

    <!-- Etiqueta para seleccionar un archivo, estilizada -->
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
    // Referencias para mostrar los modales
    const mostrarHistorialGastos = ref(false);
    const mostrarHistorialIngresos = ref(false);

    // Obtiene los gastos e ingresos
    const gastos = showTransactionExpense();
    const ingresos = showTransactionIncome();

    // Calcula el balance total (ingresos - gastos)
    const balanceTotal = computed(() => {
      const totalIngresos = ingresos.value.reduce((acc, item) => acc + item.income, 0);
      const totalGastos = gastos.value.reduce((acc, item) => acc + item.expense, 0);
      return totalIngresos - totalGastos; // Devuelve el balance total
    });

    // Obtiene los últimos 10 gastos e ingresos
    const ultimosGastos = computed(() => gastos.value.slice(-10).reverse());
    const ultimosIngresos = computed(() => ingresos.value.slice(-10).reverse());

    // Funciones para eliminar gastos e ingresos
    const eliminarGasto = (index) => {
      removeTransactionExpense(index); // Elimina el gasto en la posición dada
    };

    const eliminarIngreso = (index) => {
      removeTransactionIncome(index); // Elimina el ingreso en la posición dada
    };

    // Función para exportar los datos como archivo .mon
    const exportData = () => {
      const data = {
        gastos: gastos.value,
        ingresos: ingresos.value
      };

      // Convierte los datos a formato JSON
      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob); // Crea un objeto URL para el blob
      link.download = 'transactions.mon'; // Nombre del archivo a descargar
      link.click(); // Inicia la descarga
      URL.revokeObjectURL(link.href); // Libera la URL del objeto
    };

    // Función para importar los datos desde un archivo .mon
    const importData = (event) => {
      const file = event.target.files[0]; // Obtiene el archivo seleccionado

      if (file && file.name.endsWith('.mon')) { // Verifica que el archivo sea válido
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target.result;
            const parsedData = JSON.parse(content); // Parsea el contenido del archivo

            // Reemplaza los valores actuales con los del archivo importado
            gastos.value = parsedData.gastos || [];
            ingresos.value = parsedData.ingresos || [];
            alert('Datos importados exitosamente'); // Notificación de éxito
          } catch (error) {
            console.error("Error al importar el archivo:", error);
            alert('El archivo seleccionado no tiene un formato válido.'); // Notificación de error
          }
        };
        reader.readAsText(file); // Lee el archivo como texto
      } else {
        alert('Por favor, selecciona un archivo .mon válido.'); // Mensaje si el archivo no es válido
      }
    };

    // Devuelve las propiedades y funciones para usarlas en el template
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
@import "@/scss/_colors.scss"; // Importa los estilos de color

/* Estilos Generales */
.transactions-container {
  background-color: $md-theme-light-background; // Color de fondo del contenedor
  color: $md-theme-light-on-background; // Color de texto del contenedor
  padding: 2rem; // Espaciado interno
  border-radius: 0.5rem; // Bordes redondeados
  max-width: 90%; // Ancho máximo del contenedor
  margin: 2rem auto; // Margen superior e inferior automático
  box-shadow: 0 0.4rem 0.8rem rgba($md-theme-light-shadow, 0.2); // Sombra del contenedor
  display: flex; // Flexbox para alinear los elementos
  flex-direction: column; // Orientación vertical de los elementos
  gap: 2rem; // Espaciado entre los elementos
}

h2 {
  display: block; // Se asegura de que h2 sea un bloque
  height: fit-content; // Ajusta la altura al contenido
  width: 11rem; // Ancho fijo
  margin: 0 auto; // Centra el título
}

h1.balance-total {
  margin-top: 4rem; // Margen superior
  font-size: 2rem; // Tamaño de fuente
  font-weight: bold; // Negrita
  margin-bottom: 1.5rem; // Margen inferior
  color: $md-theme-light-primary; // Color del texto
}

.table-title {
  font-size: 1.5rem; // Tamaño de fuente para títulos de tablas
  margin-top: 1.5rem; // Margen superior
  color: $md-theme-light-secondary; // Color del texto
}

.transactions-table {
  width: 100%; // Ancho total de la tabla
  border-collapse: collapse; // Colapsa bordes
  margin-bottom: 2rem; // Margen inferior
}

.transactions-table th,
.transactions-table td {
  padding: 1rem; // Espaciado interno
  text-align: left; // Alineación a la izquierda
  border: 0.1rem solid $md-theme-light-outline; // Bordes de las celdas
}

.transactions-table th {
  background-color: $md-theme-light-primary-container; // Color de fondo de las cabeceras
  color: $md-theme-light-on-primary-container; // Color del texto de las cabeceras
}

.transactions-table td {
  background-color: $md-theme-light-surface; // Color de fondo de las celdas
  color: $md-theme-light-on-surface; // Color del texto de las celdas
}

.history-buttons {
  display: flex; // Flexbox para los botones
  justify-content: space-between; // Espacio entre los botones
  gap: 1rem; // Espaciado entre botones
}

/* Estilos de botones */
button {
  padding: 1rem 1.5rem; // Espaciado interno de botones
  margin: 0.5rem; // Margen entre botones
  cursor: pointer; // Cambia el cursor al pasar sobre el botón
  border: none; // Sin borde
  border-radius: 0.4rem; // Bordes redondeados
  font-size: 1rem; // Tamaño de fuente
  display: inline-block; // Se muestra como un bloque en línea
  text-align: center; // Centra el texto en los botones
}

.view-history-btn {
  background-color: $md-theme-light-secondary; // Color de fondo de los botones de ver historial
  color: $md-theme-light-on-secondary; // Color del texto

  /* Efecto hover para el botón */
  &:hover {
    background-color: $md-theme-light-secondary-container; // Color de fondo al pasar el mouse
    color: $md-theme-light-on-secondary-container; // Color del texto al pasar el mouse
  }
}

/* Estilos para el botón de eliminación */
.delete-btn {
  background-color: $md-theme-light-error; // Color de fondo para botones de eliminación
  color: $md-theme-light-on-error; // Color del texto para botones de eliminación
  border-radius: 0.4rem; // Bordes redondeados
  padding: 0.5rem 1rem; // Espaciado interno

  /* Efecto hover para el botón de eliminación */
  &:hover {
    background-color: $md-theme-light-error-container; // Color de fondo al pasar el mouse
    color: $md-theme-light-on-error-container; // Color del texto al pasar el mouse
  }
}

/* Estilos para el modal */
.modal-overlay {
  position: fixed; // Fijo para cubrir toda la pantalla
  top: 0; // Alineado en la parte superior
  left: 0; // Alineado a la izquierda
  right: 0; // Alineado a la derecha
  bottom: 0; // Alineado en la parte inferior
  background-color: rgba(0, 0, 0, 0.7); // Fondo oscuro con opacidad
  display: flex; // Flexbox para centrar contenido
  justify-content: center; // Centra horizontalmente
  align-items: center; // Centra verticalmente
}

.modal-content {
  background-color: $md-theme-light-surface; // Color de fondo del modal
  padding: 2rem; // Espaciado interno
  border-radius: 0.5rem; // Bordes redondeados
  box-shadow: 0 0.4rem 0.8rem rgba($md-theme-light-shadow, 0.2); // Sombra del modal
  max-width: 80%; // Ancho máximo del modal
}

.close-btn {
  background-color: $md-theme-light-primary; // Color de fondo para el botón de cerrar
  color: $md-theme-light-on-primary; // Color del texto para el botón de cerrar
}

.ioActions {
  display: flex; // Flexbox para la sección de gestión de datos
  justify-content: center; // Centra horizontalmente
  gap: 1rem; // Espaciado entre botones
  margin-top: 2rem; // Margen superior
}

.export-btn {
  background-color: $md-theme-light-secondary; // Color de fondo para el botón de exportar
  color: $md-theme-light-on-secondary; // Color del texto para el botón de exportar
  border: none; // Sin borde
  padding: 1rem 1.5rem; // Espaciado interno
  border-radius: 0.5rem; // Bordes redondeados
  cursor: pointer; // Cambia el cursor al pasar sobre el botón

  /* Efecto hover para el botón de exportar */
  &:hover {
    background-color: $md-theme-light-secondary-container; // Color de fondo al pasar el mouse
  }
}

.import-input {
  display: block; // Muestra el input como bloque
}

/* Estilos para la sección de importación */
.import-label {
  background-color: $md-theme-light-secondary; // Color de fondo para la etiqueta de importación
  color: $md-theme-light-on-secondary; // Color del texto para la etiqueta de importación
  padding: 1rem 1.5rem; // Espaciado interno
  border-radius: 0.5rem; // Bordes redondeados
  cursor: pointer; // Cambia el cursor al pasar sobre la etiqueta
  display: inline-block; // Se muestra como un bloque en línea
  text-align: center; // Centra el texto en la etiqueta
  font-size: 1rem; // Tamaño de fuente
  margin: 0.5rem; // Margen entre etiquetas
}

/* Efecto hover para la etiqueta de importación */
.import-label:hover {
  background-color: $md-theme-light-secondary-container; // Color de fondo al pasar el mouse
  color: $md-theme-light-on-secondary-container; // Color del texto al pasar el mouse
}

/* Ocultar el input de archivo original */
.import-input {
  display: none; // Oculta el input original
}
</style>
