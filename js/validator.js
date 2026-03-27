// Esperamos a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("formulario");

    if (formulario) {
        //evita que el formulario se envíe de manera normal
        formulario.addEventListener("submit", function(event){
            event.preventDefault();

            //Recupera lo que el usuario escribió en cada input.
            const title = document.getElementById("title").value.trim();
            const author = document.getElementById("author").value.trim();
            const year = document.getElementById("year").value.trim();

            // Obtener tanto el value como el texto visible del select
            const genreSelect = document.getElementById("genre");
            const genreValue = genreSelect.value; // value interno
            const genreText  = genreSelect.options[genreSelect.selectedIndex].text; // texto visible

            const message = document.getElementById("message");

            //Nossos elementos de error
            const errorTitle = document.getElementById("errorTitle");
            const errorAuthor = document.getElementById("errorAuthor");
            const errorYear = document.getElementById("errorYear");

            //Técnica del centinela: una sola variable que vigila si todo está correcto.
            let valido = true; //ponemos una variable booleana
            if(title === ""){
                errorTitle.textContent = "El título es obligatorio";
                valido = false;
            }else{
                errorTitle.textContent = "";
            }

            if(author === ""){
                errorAuthor.textContent = "El autor es obligatorio";
                valido = false;
            }else{
                errorAuthor.textContent = "";
            }

            if(year === "" || (year<1000 || year>2026)){
                errorYear.textContent = "El año debe estar entre 1000 y 2026";
                valido = false;
            }else{
                errorYear.textContent = "";
            } 

            if(valido) {
                message.textContent = "Libro añadido al catálogo";
                message.className = "success";

                // Texto visible para mostrar, y el value para lógica interna
                const libro = { 
                    title, 
                    author, 
                    year, 
                    genre: genreText,       // se mostrará en la ficha
                    genreValue: genreValue 
                };

                let libros = JSON.parse(localStorage.getItem("librosGuardados")) || [];
                libros.push(libro);
                localStorage.setItem("librosGuardados", JSON.stringify(libros));

                mostrarDatos(); // refresca la lista
            }else{
                message.textContent = "";
                message.className = "";
            }
        });
    }

    // Funct para mostrar libros (con botones editar/eliminar)
    //  Ahora acepta dos filtros: titulo y genero
    function mostrarDatos(filtroTitulo = "", filtroGenero = "") {
        const datos = localStorage.getItem("librosGuardados");
        const resultado = document.getElementById("resultado");

        if (!resultado) return;
        resultado.innerHTML = "";

        if (datos) {
            const libros = JSON.parse(datos);

            libros
              .filter(libro =>
                libro.title.toLowerCase().includes(filtroTitulo.toLowerCase()) &&
                (filtroGenero === "" || libro.genreValue === filtroGenero)
              )
              .forEach((libro, index) => {
                resultado.innerHTML += `
                    <div class="libro">
                        <h3>${libro.title}</h3>
                        <p><strong>Autor:</strong> ${libro.author}</p>
                        <p><strong>Año:</strong> ${libro.year}</p>
                        <p><strong>Género:</strong> ${libro.genre}</p>
                        <button onclick="editarLibro(${index})">Editar</button>
                        <button onclick="eliminarLibro(${index})">Eliminar</button>
                    </div>
                `;
              });
        } else {
            resultado.textContent = "No hay libros guardados.";
        }
    }

    mostrarDatos();

    // Listener para busqueda en tiempo real
    const inputBusqueda = document.getElementById("busqueda");
    const filtroGenero = document.getElementById("filtroGenero");

    // Funct que aplica ambos filtros aka busqueda y genero
    function aplicarFiltros() {
        const titulo = inputBusqueda ? inputBusqueda.value : "";
        const genero = filtroGenero ? filtroGenero.value : "";
        mostrarDatos(titulo, genero);
    }

    if (inputBusqueda) {
        inputBusqueda.addEventListener("input", aplicarFiltros);
    }

    if (filtroGenero) {
        filtroGenero.addEventListener("change", aplicarFiltros);
    }

    // Funct editar libro
    window.editarLibro = function(index) {
        let libros = JSON.parse(localStorage.getItem("librosGuardados")) || [];
        const libro = libros[index];

        // Cargar datos al formulario
        document.getElementById("title").value = libro.title;
        document.getElementById("author").value = libro.author;
        document.getElementById("year").value = libro.year;
        document.getElementById("genre").value = libro.genreValue; //value para que el select se marque bien

        // Eliminar el libro viejo para que al guardar se reemplace
        libros.splice(index, 1);
        localStorage.setItem("librosGuardados", JSON.stringify(libros));
        mostrarDatos();
    }

    //Funct para eliminar libro (con confirmacion)
    window.eliminarLibro = function(index) {
        let libros = JSON.parse(localStorage.getItem("librosGuardados")) || [];
        if (confirm("¿Seguro que quieres eliminar este libro?")) {
            libros.splice(index, 1);
            localStorage.setItem("librosGuardados", JSON.stringify(libros));
            mostrarDatos();
        }
    }

});
