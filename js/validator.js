document.addEventListener("DOMContentLoaded", () => {                        // Esperamos a que el DOM esté cargado, aka  espera a que el HTML esté listo antes de ejecutar el JS
    
    const formulario = document.getElementById("formulario");               //guardamos variable formulario a parti de el id "formulario" en el html

    if (formulario) {
        formulario.addEventListener("submit", function(event){
            event.preventDefault();                 //evita que el formulario se envíe de forma normal

            //Recupera lo que el usuario escribió en cada input    &   trim elimina espacios al inicio y final
            const title = document.getElementById("title").value.trim();
            const author = document.getElementById("author").value.trim();
            const year = document.getElementById("year").value.trim();

            // Obtener tanto el value(interno) como el texto visible del select
            const genreSelect = document.getElementById("genre");               //busca genre, guarda en la var genreSelect
            const genreValue = genreSelect.value;                               // valor interno (lo que usa el prog. eg scifi)
            const genreText  = genreSelect.options[genreSelect.selectedIndex].text;             // texto visible (lo q ve el user eg CIencia ficcion)

            const message = document.getElementById("message");     //recupera mi id msj "Libro añadido al catálogo"

            //Nuestros elementos de error, captura los span ids
            const errorTitle = document.getElementById("errorTitle");
            const errorAuthor = document.getElementById("errorAuthor");
            const errorYear = document.getElementById("errorYear");

            //Técnica del centinela: una sola variable que vigila si todo está correcto.
            let valido = true; //ponemos una variable booleana
            if(title === ""){
                errorTitle.textContent = "El título es obligatorio";        //if false imprime el msj
                valido = false;
            }else{
                errorTitle.textContent = "";            //if true blank msg
            }

            if(author === ""){
                errorAuthor.textContent = "El autor es obligatorio";            //if empty = false, entonces imprime el msj
                valido = false;
            }else{
                errorAuthor.textContent = "";               //if true blank msg
            }

            if(year === "" || (year<1000 || year>2026)){                //if blank or (out of rango 1000 a 2026)
                errorYear.textContent = "El año debe estar entre 1000 y 2026";          //es false imprime el msj
                valido = false;
            }else{ 
                errorYear.textContent = "";             //if true blank msg
            } 

            if(valido) {                    //si valido sigue siendo true
                message.textContent = "Libro añadido al catálogo";          //then muestra el msg
                message.className = "success";              //clase success para css

                // Texto visible para mostrar, y el value para lógica interna
                const libro = { 
                    title, 
                    author, 
                    year, 
                    genre: genreText,      //el visible
                    genreValue: genreValue          //el value interno eg scifi
                };

                //guardar en el localStorage
                let libros = JSON.parse(localStorage.getItem("librosGuardados")) || [];             //recupera array de libros o array vacio
                libros.push(libro);             //agrega el nuevo libro
                localStorage.setItem("librosGuardados", JSON.stringify(libros));                //guarda en el array, hace string de libros

                mostrarDatos(); //llamamos a la funct, entonces refresca la lista
            }else{                  
                message.textContent = "";
                message.className = "";         //no muestra el msj de exito si hay inputs invalidos
            }
        });
    }

    // Funct para mostrar libros (con botones editar/eliminar)
    function mostrarDatos(filtroTitulo = "", filtroGenero = "") {           //  Acepta dos filtros: titulo y genero
        const datos = localStorage.getItem("librosGuardados");              //JSON guardada en lS con key "librosGuardados"
        const resultado = document.getElementById("resultado");             //const con ref al id resultado

        if (!resultado) return;             //si no existe resultado, detiene
        resultado.innerHTML = "";           //y limpia el contenido

        if (datos) {                        //si hay datos en lS pasa de JSON a array de obketos "libros"
            const libros = JSON.parse(datos);

            libros                  //aplica dos filtros, solo pasan los que cumplen ambas condiciones
              .filter(libro =>
                libro.title.toLowerCase().includes(filtroTitulo.toLowerCase()) &&
                (filtroGenero === "" || libro.genreValue === filtroGenero)              //o vacio o genreValue
              )
              .forEach((libro, index) => {              //recorre cada libro y genera un HTML
                resultado.innerHTML += `
                    <div class="libro">
                        <h3>${libro.title}</h3>
                        <p><strong>Autor:</strong> ${libro.author}</p>
                        <p><strong>Año:</strong> ${libro.year}</p>
                        <p><strong>Género:</strong> ${libro.genre}</p>
                        <button onclick="editarLibro(${index})">Editar</button>             
                        <button onclick="eliminarLibro(${index})">Eliminar</button>
                    </div>
                `;                  //incluye los botones editar y eliminar
              });
        } else {
            resultado.textContent = "No hay libros guardados.";         //sin datos en lS muestra el msg
        }
    }

    mostrarDatos();             //llamamos a la funct, entonces refresca la lista segun lo que suceda

    // Listener para busqueda en tiempo real
    const inputBusqueda = document.getElementById("busqueda");
    const filtroGenero = document.getElementById("filtroGenero");

    // Funct que aplica ambos filtros aka busqueda y genero
    function aplicarFiltros() {
        const titulo = inputBusqueda ? inputBusqueda.value : "";        // si existe el input lo muestra, si no empty
        const genero = filtroGenero ? filtroGenero.value : "";          //si existe el select de genero toma su valor, si no empty
        mostrarDatos(titulo, genero);                                   //llamamos a nuestra funct con ambos valores
    }

    if (inputBusqueda) {            //permite la actualizacion en tiempo real
        inputBusqueda.addEventListener("input", aplicarFiltros);
    }

    if (filtroGenero) {
        filtroGenero.addEventListener("change", aplicarFiltros);
    }

    // Funct editar libro
    window.editarLibro = function(index) {              //definimos la funcion
        let libros = JSON.parse(localStorage.getItem("librosGuardados")) || [];         //recupera el array del lS, si no empty
        const libro = libros[index];

        // Cargar datos al formulario
        document.getElementById("title").value = libro.title;
        document.getElementById("author").value = libro.author;
        document.getElementById("year").value = libro.year;
        document.getElementById("genre").value = libro.genreValue; //value para que el select se marque bien

        // Eliminar el libro viejo para que al guardar se reemplace
        libros.splice(index, 1);
        localStorage.setItem("librosGuardados", JSON.stringify(libros));                //actualiza lS
        mostrarDatos();                 //refresh lista
    }

    //Funct para eliminar libro (con confirmacion)
    window.eliminarLibro = function(index) {            //definimos funct eliminar libro, se llama onclick
        let libros = JSON.parse(localStorage.getItem("librosGuardados")) || [];             //recupera el array del lS, si no empty
        if (confirm("¿Seguro que quieres eliminar este libro? Este cambio no se puede deshacer.")) {          //solicita confirmacion
            libros.splice(index, 1);            //elimina elemento del array en posicion index... aka funct elim1 a partir de posicion index 
            localStorage.setItem("librosGuardados", JSON.stringify(libros));            //actualiza lS
            mostrarDatos();             //refresh lista on screen 
        }
    }

});
