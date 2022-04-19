// Cursos con prompt (no DOM ni Eventos)

let cursoSeleccionado;

class cursos {
  constructor(item, nombre, precio, duracion) {
    this.item = item;
    this.nombre = nombre;
    this.precio = precio;
    this.duracion = duracion;
  }
};

const cursoA = new cursos(1, "Master Class Negocios", 2500, 2);
const cursoB = new cursos(2, "Emprendiendo Tu Negocio", 9250, 14);
const cursoC = new cursos(3, "Desarrolla Tus Habilidades como Vendedor", 6999, 6);

const arrCursos = [cursoA, cursoB, cursoC];

const carrito = [];

let cursosContainer = document.querySelector(".cursosContainer");

const selectCursos = () => {
  let alertCursos = "";
  for (const curso of arrCursos) {
    alertCursos += `${curso.item}) ${curso.nombre}\t$${curso.precio}MXN\n`
  }
  let inCurso = parseInt(prompt(`Seleccione uno o mas de nuestros cursos:\n${alertCursos}\nO escriba "0" para salir.`));

  while (inCurso < 0 || inCurso > 3 || isNaN(inCurso)) {
    alert(`La opción que ingresaste no es valida, por favor vuelve a intentarlo.`);
    inCurso = parseInt(prompt(`Seleccione uno o mas de nuestros cursos:\n${alertCursos}\nO escriba "0" para salir.`));
  }

  return inCurso;
};

const addCursos = () => {
  if (cursoSeleccionado != 0) {
    let buscarCurso = arrCursos.find(
      (element) => element.item == cursoSeleccionado
    );

    let dobleSel = carrito.some(element => element.item == cursoSeleccionado);

    let addConfirm;

    if (dobleSel) {
      addConfirm = confirm("Ya has seleccionado este curso\n¿Deseas agregar orto curso?")
    }
    else {
      carrito.push(buscarCurso);
      if (carrito.length >= 3){
        addConfirm = false;
        alert("Ya has seleccionado todos nuestros cursos.")
      }
      else{
        addConfirm = confirm("¿Desea agregar otro curso?");
      }
    }



    if (addConfirm) {
      cursoSeleccionado = selectCursos();
      addCursos();
    }
  }
}

const mostrarCarrito = () => {
  const divCarrito = document.createElement("div")
  divCarrito.className = "carrito"
  cursosContainer.appendChild(divCarrito)

  let carritoMap = carrito.map(element => `<div>
  <h4>Curso: ${element.nombre}</h4>
  <h4>Precio: $${element.precio}MXN</h4>
  <h4>Duración: ${element.duracion} horas</h4>
  </div>`);

  divCarrito.innerHTML = carritoMap.join("\n");
}

const calcTotal = () => {
  let divTotal = document.createElement("div")
  divTotal.className = "divTotal"

  let precioTotal = carrito.reduce((acc, iter) => acc + iter.precio, 0)

  if (carrito.length == 3){
    precioTotal = precioTotal * 0.9

    divTotal.innerHTML = `<h3>Obtienes un 10% de descuento por seleccionar 3 de nuestros cursos.<br>Total: $${parseInt(precioTotal)} MXN</h3>`

    cursosContainer.append(divTotal)
  }

  else if (carrito.length == 2){
    precioTotal = precioTotal * 0.95

    divTotal.innerHTML = `<h3>Obtienes un 5% de descuento por seleccionar 2 de nuestros cursos.<br>Total: $${parseInt(precioTotal)} MXN</h3>`

    cursosContainer.append(divTotal)
  }

  else if (carrito.length == 1){
  divTotal.innerHTML = `<h3>Recuerda que puedes obtener un descuento al seleccionar mas de 1 de nuestros cursos.<br>Total: $${precioTotal} MXN</h3>`

  cursosContainer.append(divTotal)
  }
}

cursoSeleccionado = selectCursos();
addCursos();
/* mostrarCarrito();
calcTotal(); */

let selectCurso = [];

document.querySelector("#btn1").onclick = () => {
  if (selectCurso.includes(1)) {
    alert('Este curso ya ha sido agregado a tu carrito antes.')
  }
  else{
    selectCurso.push(1);
    alert('El curso "Master Class Negocios" se ha agregado a tu carrito');
  }
}

document.querySelector("#btn2").onclick = () => {
  alert('El curso "Emprendiendo tu Negocio" se ha agregado a tu carrito.');
}

document.querySelector("#btn3").onclick = () => {
  alert('El curso "Desarrolla tus habilidades como vendedor" se ha agregado a tu carrito.');
}

/* document.querySelector("#carritoIcon").onclick = () => {
  let hideCarrito = document.querySelector(".carrito");
} */