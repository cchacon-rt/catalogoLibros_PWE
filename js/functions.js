//let lista=[];

/*
lista.push({
title: title_rec,
author: author_rec,
year: year_rec,
genre: genre_rec
});


}


);
*/

//los escuchas
document.getElementById("formulario").addEventListener("submit", function(e) {
  e.preventDefault(); // Evita que se recargue la página

  let nombre = document.getElementById("nombre").value;
  let correo = document.getElementById("correo").value;

  // Guardar en localStorage como objeto convertido a JSON
  localStorage.setItem("usuario", JSON.stringify({ nombre, correo }));

  mostrarDatos(); // Llamamos a la función para mostrar lo guardado
});
