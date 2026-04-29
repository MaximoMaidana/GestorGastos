content = """# Gestor de Gastos - React

Aplicación sencilla para la gestión de finanzas personales, desarrollada como parte de la asignatura **Desarrollo de Software**.

## Descripción
Esta aplicación permite llevar un control detallado de ingresos y gastos diarios. Utiliza el almacenamiento local del navegador (`localStorage`) para que la información persista incluso al cerrar la página.

## Características Principales
- **Registro de Movimientos:** Añade ingresos y gastos especificando descripción, monto, fecha y categoría.
- **Control de Presupuesto:** Define un límite de gasto mensual. La aplicación mostrará una alerta visual si los gastos superan el límite establecido.
- **Filtros y Ordenación:** Filtra tus movimientos por categoría y ordénalos por fecha o monto (ascendente/descendente).
- **Persistencia de Datos:** Todos los datos se guardan automáticamente en el navegador.
- **Edición y Borrado:** Permite modificar o eliminar cualquier registro previo.

## Tecnologías Utilizadas
- **React**: Biblioteca principal para la interfaz de usuario.
- **Vite**: Herramienta de construcción y desarrollo.
- **CSS3**: Estilos personalizados con diseño responsivo para móviles.
- **JavaScript (ES6+)**: Lógica de la aplicación y manejo del estado.

## Instalación y Uso

1. Clonar el repositorio.
2. Instalar las dependencias:
   ```bash
   npm install
3. Ejecutar el proyecto en modo desarrollo:
    npm run dev