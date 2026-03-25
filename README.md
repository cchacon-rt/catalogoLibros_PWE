# Proyecto 2
## Catálogo de Libros Personales

---

## Descripción
    Crear una aplicación para registrar libros leídos o por leer. Cada libro tendrá título, autor, año de publicación y género. Los registros se mostrarán en una tabla o tarjetas, y se podrán filtrar por género o buscar por título. La información se almacena en localStorage .

---

## Requerimientos específicos
---
### HTML + CSS
    - Formulario con campos:
        - Título (texto, obligatorio)
        - Autor (texto, obligatorio)
        - Año (número, obligatorio, rango entre 1000 y año actual)
        - Género (select con opciones: Ficción, No Ficción, Ciencia Ficción, Biografía, etc., obligatorio)
    - Botón “Agregar libro”
    - Barra de búsqueda por título y filtro por género.
    - Área de listado de libros (tarjetas o tabla) mostrando todos los campos y botones para editar/eliminar.
    - Diseño limpio, utilizando sombras y bordes redondeados.

---

### JavaScript + DOM

    - Validaciones:
        - Campos obligatorios completos.
        - Año dentro del rango válido. 
    - Agregar libro: generar ID único, guardar en localStorage , refrescar listado.
    - Funcionalidad de búsqueda en tiempo real (filtrar por título mientras se escribe).
    - Filtro por género que muestre solo los libros del género seleccionado.
    - Editar libro: cargar datos al formulario, eliminar el antiguo y agregar el modificado (o usar actualización directa).
    - Eliminar libro con confirmación.
    - Al cargar la página, leer localStorage y mostrar los libros.

---

### Persistencia

    - Almacenar en 'localStorage' un arreglo de libros con campos: id, titulo, autor, año,
genero.
    - Mantener sincronizada la vista con los datos almacenados.
---

## Plan de trabajo sugerido (5 días)

    **-Día 1**
            Maquetar el HTML: formulario de registro, controles de búsqueda/filtro, contenedor de libros. Establecer estilos base con CSS (diseño de tarjetas o tabla).
        
    **-Día 2**
            Implementar validaciones del formulario y la lógica de agregar libro. Guardar en localStorage y renderizar la lista estáticamente (sin filtros aún).

    **-Día 3**
            Desarrollar las funciones de editar y eliminar libros. Asegurar que al editar se carguen los datos en el formulario y se actualice correctamente el registro.
    **-Día 4**
            Agregar la búsqueda por título (evento input ) y el filtro por género. Actualizar la vista dinámicamente en función de los filtros.
    **-Día 5**
            Probar todos los casos: validaciones, persistencia tras recargar, filtros combinados, responsividad. Realizar ajustes de CSS y pulir la experiencia de usuario.