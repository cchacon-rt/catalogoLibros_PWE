const formulario = document.getElementById("formulario");

//evita que el formulario se envíe de manera normal
formulario.addEventListener("submit", function(event){
    event.preventDefault();

    //Obtiene lo que el usuario escribió en cada input.
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const year = document.getElementById("year").value.trim();
    const genre = document.getElementById("genre").value;

    const message = document.getElementById("message");

    //Nossos elementos de error
    const errorTitle = document.getElementById("errorTitle");
    const errorAuthor = document.getElementById("errorAuthor");
    const errorYear = document.getElementById("errorYear");
    const errorGenre = document.getElementById("errorGenre");


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
            errorYear.textContent = "El año de publicación es obligatorio y debe estar en el rango de 1000 a 2026";
            valido = false;
        }else{
            errorYear.textContent = "";
        } 

        if(genre === ""){
            errorGenre.textContent = "Debes seleccionar un género";
            valido = false;
        }else{
            errorGenre.textContent = "";
        }

      ///////////  message class success
        if(valido) {
            message.textContent = "Libro añadido al catálogo";
            message.className = "success";
        }else{
            message.textContent = "";
            message.className = "";
        }

}
);  //hasta aca cierra el validador
