// Para sumar un producto:
// 1. Copia uno de los objetos de abajo y pégalo dentro de este arreglo.
// 2. Completa nombre, imagen, descripcion y precio con los datos nuevos.
// 3. Guarda la foto en "imagenes" y escribe aquí su ruta relativa.
// No hace falta modificar productos.html: las tarjetas se generan solas.
// Ejemplo para pegar dentro del arreglo, antes del corchete de cierre:
// {
//   nombre: 'Crema nutritiva',
//   imagen: 'imagenes/crema-nutritiva.webp',
//   descripcion: 'Crema nutritiva para el cuidado de la piel.',
//   precio: '$18.000'
// },
const productos = [
  // nombre: se muestra en la tarjeta y en el mensaje de WhatsApp.
  // imagen: ruta relativa a la carpeta donde está productos.html.
  // descripcion: detalle que recibirá la persona al consultar.
  // precio: texto que aparecerá en el mensaje de consulta.
  {
    nombre: 'Cremas faciales',
    imagen: 'imagenes/crema-facial.webp',
    descripcion: 'Crema hidratante para el cuidado diario de la piel.',
    precio: '$15.000'
  },
  {
    nombre: 'Cremas corporales',
    imagen: 'imagenes/crema-corporal.png',
    descripcion: 'Crema corporal para el cuidado diario de la piel.',
    precio: '$15.000'
  },
  {
    nombre: 'Sérums hidratantes',
    imagen: 'imagenes/serum-facial-hialuronico.webp',
    descripcion: 'Sérum hidratante para el cuidado diario de la piel.',
    precio: '$15.000'
  },
  {
    nombre: 'Protector solar',
    imagen: 'imagenes/protector-solar.webp',
    descripcion: 'Protector solar para el cuidado diario de la piel.',
    precio: '$15.000'
  },
  {
    nombre: 'Gel para circulación',
    imagen: 'imagenes/gel-activo-para-piernas.webp',
    descripcion: 'Gel para circulación para el cuidado diario de la piel.',
    precio: '$15.000'
  },
  {
    nombre: 'Loción Higiene Activa',
    imagen: 'imagenes/locion-higiene-activo.webp',
    descripcion: 'Loción Higiene Activa para el cuidado diario de la piel.',
    precio: '$15.000'
  }
];

const numeroWhatsApp = '3534063489';
const botonMenu = document.querySelector('.menu-hamburguesa');
const menuNav = document.querySelector('.nav-links');
const listaProductos = document.querySelector('#carousel-productos');
const viewport = document.querySelector('.carousel-viewport');
const botonAnterior = document.querySelector('.carousel-anterior');
const botonSiguiente = document.querySelector('.carousel-siguiente');

if (botonMenu && menuNav) {
  botonMenu.addEventListener('click', function () {
    menuNav.classList.toggle('nav-links-abierto');

    if (menuNav.classList.contains('nav-links-abierto')) {
      menuNav.style.display = 'flex';
      menuNav.style.flexDirection = 'column';
      menuNav.style.position = 'absolute';
      menuNav.style.top = '70px';
      menuNav.style.left = '0';
      menuNav.style.right = '0';
      menuNav.style.background = '#fff';
      menuNav.style.padding = '20px 24px';
      menuNav.style.gap = '16px';
    } else {
      menuNav.removeAttribute('style');
    }
  });
}

function crearTarjeta(producto) {
  const tarjeta = document.createElement('article');
  tarjeta.className = 'producto-card';

  const contenedorImagen = document.createElement('div');
  contenedorImagen.className = 'imagen-producto';

  const imagen = document.createElement('img');
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre;
  imagen.loading = 'lazy';
  contenedorImagen.appendChild(imagen);

  const nombre = document.createElement('p');
  nombre.textContent = producto.nombre;

  const mensaje = [
    'Hola! 😊 Quisiera consultar por este producto:',
    '',
    `Producto: ${producto.nombre}`,
    `Descripción: ${producto.descripcion}`,
    `Precio: ${producto.precio}`,
    '',
    '¿Me podrían brindar más información? Gracias!'
  ].join('\n');

  const enlaceConsulta = document.createElement('a');
  enlaceConsulta.className = 'boton-producto';
  enlaceConsulta.href = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  enlaceConsulta.target = '_blank';
  enlaceConsulta.rel = 'noopener noreferrer';
  enlaceConsulta.textContent = 'Consultar →';

  tarjeta.append(contenedorImagen, nombre, enlaceConsulta);
  return tarjeta;
}

function actualizarControles() {
  if (!viewport || !botonAnterior || !botonSiguiente) {
    return;
  }

  const maximoDesplazamiento = viewport.scrollWidth - viewport.clientWidth;
  const hayDesplazamiento = maximoDesplazamiento > 1;

  botonAnterior.disabled = !hayDesplazamiento || viewport.scrollLeft <= 1;
  botonSiguiente.disabled = !hayDesplazamiento
    || viewport.scrollLeft >= maximoDesplazamiento - 1;
}

function desplazarCarrusel(direccion) {
  if (!listaProductos || !viewport) {
    return;
  }

  const primeraTarjeta = listaProductos.querySelector('.producto-card');

  if (!primeraTarjeta) {
    return;
  }

  const espacioEntreTarjetas = parseFloat(getComputedStyle(listaProductos).gap) || 0;
  const distancia = primeraTarjeta.getBoundingClientRect().width + espacioEntreTarjetas;

  viewport.scrollBy({
    left: direccion * distancia,
    behavior: 'smooth'
  });
}

if (listaProductos && viewport && botonAnterior && botonSiguiente) {
  listaProductos.replaceChildren(...productos.map(crearTarjeta));

  botonAnterior.addEventListener('click', () => desplazarCarrusel(-1));
  botonSiguiente.addEventListener('click', () => desplazarCarrusel(1));
  viewport.addEventListener('scroll', actualizarControles, { passive: true });
  window.addEventListener('resize', actualizarControles);

  actualizarControles();
}
