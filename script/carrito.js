var DateTime = luxon.DateTime;
let dtn = DateTime.now();

let arrCursos = [
  {
    id: 1,
    nombre: "Master Class Negocios",
    descripcion: "En esta master class podras aprender lo necesario para ser un buen negociante. Ya sea que quieras crear tu propio negocio, mejorar tu negocio o simplemente dar un mejor desempeño en negocios de una empresa en la que trabajas, este curso es para ti.",
    precio: 2500,
    duracion: 2,
    fin: dtn.plus({days:4}).toLocaleString({weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})
  },
  {
    id: 2,
    nombre: "Emprendiendo tu Negocio",
    descripcion: "Este es el curso perfecto para quienes inician su negocio o incluso para quienes ya tienen un negocio establecido pero quieren saber como hacerlo crecer y tener las bases de tu negocio bien establecidas.",
    precio: 9250,
    duracion: 14,
    fin: dtn.plus({days:28}).toLocaleString({weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})
  },
  {
    id: 3,
    nombre: "Desarrolla tus Habilidades como Vendedor",
    descripcion: "Si quieres vender mas productos para tu negocio o para la empresa en la que trabajas, en este curso te decimos como mejorar tus estrategias de vendedor. Desde que se puede trabajar en el propio producto hasta el seguimiento al cliente.",
    precio: 6999,
    duracion: 6,
    fin: dtn.plus({days:12}).toLocaleString({weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})
  },
];

console.log(dtn.plus({days:5}).toLocaleString());

let carrito = [];

const cursosContainer = document.querySelector(".cursosContainer");
const cursosLink = document.querySelectorAll(".cursosLink");
const curso1 = document.getElementById("curso1");
const curso2 = document.getElementById("curso2");
const curso3 = document.getElementById("curso3");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const carritoFlex = document.querySelector(".carritoFlex");
const carritoProductos = document.querySelector(".carritoProductos"); //
const carritoContainer = document.querySelector(".carritoContainer");
const carritoClose = document.querySelector("#carritoClose");
const carritoIconContainer = document.querySelector(".carritoIconContainer");
const carritoCantidad = document.querySelectorAll(".carritoCantidad");
const carritoIcon = document.querySelector("#carritoIcon");
const precioTotal = document.querySelector(".precioTotal");
const carritoCurso = document.querySelectorAll(".carritoCurso");
const carritoStatus = document.querySelector("#carritoStatus");
const carricono = document.querySelector(".carricono");

mostrarProductos(arrCursos);

// MOSTRAR CURSOS EN PANTALLA

function mostrarProductos(array) {
  let pesoMXN = Intl.NumberFormat('es-MX', {
    style: "currency",
    currency: "MXN"
  });
  array.forEach(element => {
    let divCursos = document.createElement('div');
    divCursos.classList.add('cursosLink');
    divCursos.setAttribute('id', `curso${element.id}`)

    divCursos.innerHTML += `
      <h2 class="tituloCurso">${element.nombre}</h2>
      <p class="cursoDesc">${element.descripcion}</p>
      <p class="cursoDuracion">Este curso tiene una duración total de ${element.duracion} horas.</p>
      <p class="cursoFin">Si inicias este curso el dia de hoy la fecha estiamada de finalización será el día ${element.fin}</p>
      <p class="cursoPrecio">Precio: ${pesoMXN.format(element.precio)}</p>
      <button id="btn${element.id}">Agregar</button>
    `

    cursosContainer.appendChild(divCursos);

    let btnAgregar = document.getElementById(`btn${element.id}`);
    btnAgregar.onclick = () => {
      agregarCarrito(element.id);
    }
  });
}

//AGREGAR CURSOS SELECCIONADOS AL ARRAY CARRITO AL CLICK DEL BOTON

function agregarCarrito(id) {
  let cursoSeleccionado = arrCursos.find(element => element.id == id);
  if (carrito.find(element => element.id == cursoSeleccionado.id)) {
    
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-start',
      showConfirmButton: false,
      timer: 3000,
    })
    Toast.fire({
      padding: '0.5rem',
      background: '#F9B458',
      color: '#727072',
      icon: 'info',
      title: 'Ya se encuentra en tu carrito'
    })
  }
  else {
    carrito.push(cursoSeleccionado);
    mostrarCarrito(cursoSeleccionado);
    
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-start',
      showConfirmButton: false,
      timer: 3000,
    })
    Toast.fire({
      padding: '0.5rem',
      background: '#F9B458',
      color: '#727072',
      icon: 'success',
      title: 'Se ha añadido a tu carrito'
    })
  }

  localStorage.setItem("carritoStr", JSON.stringify(carrito));
}

//MOSTRAR EL DIV DEL CARRITO

function mostrarCarrito(cursoSeleccionado) {
  let pesoMXN = Intl.NumberFormat('es-MX', {
    style: "currency",
    currency: "MXN"
  });
  let divCarrito = document.createElement('div');
  divCarrito.className = "carritoCurso";
  divCarrito.setAttribute('id', `carritoCurso${cursoSeleccionado.id}`);
  divCarrito.innerHTML = 
  `<h4 class="carritoNombre">${cursoSeleccionado.nombre}</h4>
    <p>${pesoMXN.format(cursoSeleccionado.precio)} MXN</p>
    <button class="btnEliminar" id="eliminar${cursoSeleccionado.id}">
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
      </svg>
    </button>`
  carritoProductos.appendChild(divCarrito);
  actualizarCarrito();

  let btnEliminar = document.getElementById(`eliminar${cursoSeleccionado.id}`);
  btnEliminar.onclick = () => {

    Swal.fire({
      width: '25%',
      background: '#F9B458',
      title: '¿Deseas eliminar este curso de tu carrito?',
      // icon: 'warning',
      color: '#727072',
      showCancelButton: true,
      confirmButtonColor: '#e6563c',
      cancelButtonColor: '#a7a19c',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        btnEliminar.parentElement.remove();
        carrito = carrito.filter(element => element.id != cursoSeleccionado.id);
        actualizarCarrito();
        localStorage.setItem("carritoStr", JSON.stringify(carrito));
        
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-start',
          showConfirmButton: false,
          timer: 3000,
        })
        Toast.fire({
          padding: '0.5rem',
          background: '#F9B458',
          color: '#727072',
          icon: 'error',
          title: 'Se ha eliminado de tu carrito'
        })
      }
    })


  }
}

//MODIFICAR EL CARRITO CON LOS ITEMS SELECCIONADOS

function actualizarCarrito() {
  if (carrito.length > 0) {
    carritoIconContainer.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" class="bi bi-cart"
      viewBox="0 0 16 16" id="carritoIcon">
        <path
          d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
      </svg>
      <p>${carrito.length}</p>`
  } else {
    carritoIconContainer.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" class="bi bi-cart"
    viewBox="0 0 16 16" id="carritoIcon">
      <path
        d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>`
  }
  let total = carrito.reduce((acc, el) => acc + el.precio, 0);
  let descuento = carrito.length;
  let pesoMXN = Intl.NumberFormat('es-MX', {
    style: "currency",
    currency: "MXN"
  });
  if (descuento <= 0) {
    carritoStatus.innerHTML = `El carrito esta vacío.<br>Recuerda que al adquirir mas de 1 de nuestros cursos obtendras un descuento.`
    precioTotal.innerHTML = `
      <p>Total: ${pesoMXN.format(total)} MXN</p>
      `
  }
  else if (descuento == 1) {
    carritoStatus.innerHTML = `Selecciona uno mas de nuestos cursos para obtener un descuento.`
    precioTotal.innerHTML = `
      <p>Total: ${pesoMXN.format(total)} MXN</p>
      `
  }
  else if (descuento == 2) {
    carritoStatus.innerHTML = `Obtienes 5% de descuento al seleccionar 2 de nuestros cursos.<br>Selecciona otro de nuestros cursos y recibe un descuento mayor.`
    precioTotal.innerHTML = `
      <p>Total: ${pesoMXN.format(total * 0.95)} MXN</p>
      `
  }
  else {
    carritoStatus.innerHTML = `Obtienes 10% de descuento al seleccionar 3 de nuestros cursos.`
    precioTotal.innerHTML = `
      <p>Total: ${pesoMXN.format(total * 0.9)} MXN</p>
      `
  }
}

//GUARDAR CARRITO EN LOCAL STORAGE

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

//MOSTRAR Y CERRAR CARRITO AL PRESIONAR ICONO

carritoIconContainer.onclick = () => {
  // carritoContainer.style.display = "none";
  if (carritoContainer.style.display === "flex") {
    carritoContainer.style.display = "none";
  } else {
    carritoContainer.style.display = "flex";
  }
}

carritoClose.onclick = () => {
  carritoContainer.style.display = "none";
}