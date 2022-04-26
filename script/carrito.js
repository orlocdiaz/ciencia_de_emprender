let arrCursos = [
  {
    id: 1,
    nombre: "Master Class Negocios",
    descripcion: "En esta master class podras aprender lo necesario para ser un buen negociante. Ya sea que quieras crear tu propio negocio, mejorar tu negocio o simplemente dar un mejor desempeño en negocios de una empresa en la que trabajas, este curso es para ti.",
    precio: 2500,
    duracion: 2
  },
  {
    id: 2,
    nombre: "Emprendiendo tu Negocio",
    descripcion: "Este es el curso perfecto para quienes inician su negocio o incluso para quienes ya tienen un negocio establecido pero quieren saber como hacerlo crecer y tener las bases de tu negocio bien establecidas.",
    precio: 9250,
    duracion: 14
  },
  {
    id: 3,
    nombre: "Desarrolla tus Habilidades como Vendedor",
    descripcion: "Si quieres vender mas productos para tu negocio o para la empresa en la que trabajas, en este curso te decimos como mejorar tus estrategias de vendedor. Desde que se puede trabajar en el propio producto hasta el seguimiento al cliente.",
    precio: 6999,
    duracion: 6
  },
];

let carrito = [];

const cursosContainer = document.querySelector(".cursosContainer");
const cursosLink = document.querySelectorAll(".cursosLink");
const curso1 = document.getElementById("curso1");
const curso2 = document.getElementById("curso2");
const curso3 = document.getElementById("curso3");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const carritoContainer = document.querySelector(".carritoContainer");
const precioTotal = document.querySelector(".precioTotal");

mostrarProductos(arrCursos);

function mostrarProductos(array) {
  array.forEach(element => {
    let divCursos = document.createElement('div');
    divCursos.classList.add('cursosLink');
    divCursos.setAttribute('id', `curso${element.id}`)

    divCursos.innerHTML += `
      <h2 class="tituloCurso">${element.nombre}</h2>
      <p>${element.descripcion}</p>
      <button id="btn${element.id}">Agregar</button>
    `

    cursosContainer.appendChild(divCursos);

    let btnAgregar = document.getElementById(`btn${element.id}`);
    btnAgregar.onclick = () => {
      agregarCarrito(element.id);
    }
  });
}


function agregarCarrito(id) {
  let cursoSeleccionado = arrCursos.find(element => element.id == id);
  if (carrito.find(element => element.id == cursoSeleccionado.id)) {
    alert("Este curso ya se encuentra en tu carrito.")
  }
  else {
    carrito.push(cursoSeleccionado);
    mostrarCarrito(cursoSeleccionado);
    alert(`El curso "${cursoSeleccionado.nombre}" se ha añadido a tu carrito.`)
  }

  localStorage.setItem("carritoStr", JSON.stringify(carrito));
}


function mostrarCarrito(cursoSeleccionado) {
  let divCarrito = document.createElement('div');
  divCarrito.className = "carritoCurso";
  divCarrito.setAttribute('id', `carritoCurso${cursoSeleccionado.id}`);
  divCarrito.innerHTML = `
    <h4>Curso: ${cursoSeleccionado.nombre}</h4>
    <h4>Duración: ${cursoSeleccionado.duracion} horas</h4>
    <h4>Precio: $${cursoSeleccionado.precio} MXN</h4>
    <button class="btnEliminar" id="eliminar${cursoSeleccionado.id}">Eliminar</button>
  `
  carritoContainer.appendChild(divCarrito);
  actualizarCarrito();

  let btnEliminar = document.getElementById(`eliminar${cursoSeleccionado.id}`);
  btnEliminar.onclick = () => {
    btnEliminar.parentElement.remove();
    carrito = carrito.filter(element => element.id != cursoSeleccionado.id);
    actualizarCarrito();
    localStorage.setItem("carritoStr", JSON.stringify(carrito));
  }
}


function actualizarCarrito() {
  let total = carrito.reduce((acc, el) => acc + el.precio, 0);
  let descuento = carrito.length;
  if (descuento == 3) {
    precioTotal.innerHTML = `
      <h3>Total: $${parseInt(total * 0.9)} MXN</h3>
      <h3>Obtienes 10% de descuento al seleccionar 3 de nuestros cursos.</h3>
      `
  }
  else if (descuento == 2) {
    precioTotal.innerHTML = `
      <h3>Total: $${parseInt(total * 0.95)} MXN</h3>
      <h3>Obtienes 5% de descuento al seleccionar 2 de nuestros cursos.</h3>
      `
  }
  else if (descuento == 1) {
    precioTotal.innerHTML = `
      <h3>Total: $${parseInt(total)} MXN</h3>
      <h3>Recuerda que puedes obtener un descuento al seleccionar mas de uno de nuestros cursos.</h3>
      `
  }
  else {
    precioTotal.innerHTML = `
      <h3>Total: $${parseInt(total)} MXN</h3>
      <h3>No se han agregado cursos al carrito</h3>
      `
  }
}

function recuperar() {
  let recuperarCarrito = JSON.parse(localStorage.getItem("carritoStr"));

  if (recuperarCarrito) {
    recuperarCarrito.forEach(el => {
      mostrarCarrito(el)
      carrito.push(el)
      actualizarCarrito()
    })
  }
}

recuperar();