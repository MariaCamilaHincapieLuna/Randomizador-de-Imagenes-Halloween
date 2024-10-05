document.addEventListener('DOMContentLoaded', async () => {
  //CONSTANTES PAGINA
  const boton = document.querySelector('button');
  const imagenFHS = document.querySelector('.card-fhs-img');
  const textoFHS = document.querySelector('.card-fhs h3');
  const imagenHalloween = document.querySelector('.card-halloween-img');
  const textoHalloween = document.querySelector('.card-halloween h3');

  //VARIABLES
  var imagenesFHS = null
  var imagenesHalloween = null

  //LLENANDO LAS VARIABLES
  const imagenesFHSUrl = 'characters-fhs.json';
  const imagenesHalloweenUrl = 'characters-halloween.json';

  //lista Personajes FHS
  fetch(imagenesFHSUrl)
    .then(response => response.json())
    .then(data => {
      imagenesFHS = data;
    })
    .catch(error => console.error('Error fetching JSON:', error));

  //lista Personajes Tim Burton
  fetch(imagenesHalloweenUrl)
    .then(response => response.json())
    .then(data => {
      imagenesHalloween = data;
    })
    .catch(error => console.error('Error fetching JSON:', error));

  //VARIABLES DE TIEMPO
  let intervalo = 100; // Velocidad inicial en milisegundos
  let contador = 0;
  let intervaloId;

  //FUNCIÓN PARA OBTENER PERSONAJES ALEATORIOS
  function obtenerPersonajeAleatorio() {
    const indiceFHSAleatorio = Math.floor(Math.random() * imagenesFHS.length);
    const personajeFHSAleatorio = imagenesFHS[indiceFHSAleatorio];
    const indiceHalloweenAleatorio = Math.floor(Math.random() * imagenesHalloween.length);
    const personajeHalloweenAleatorio = imagenesHalloween[indiceHalloweenAleatorio];
    return {
      srcFHS: personajeFHSAleatorio.imagen,
      nombreFHS: personajeFHSAleatorio.nombre,
      srcHalloween: personajeHalloweenAleatorio.imagen,
      nombreHalloween: personajeHalloweenAleatorio.nombre
    };
  }

  //FUNCION PARA MEZCLAR PERSONAJES
  function mezclar() {
    const { srcFHS, nombreFHS, srcHalloween, nombreHalloween } = obtenerPersonajeAleatorio();
    imagenFHS.src = srcFHS;
    textoFHS.textContent = nombreFHS;
    imagenHalloween.src = srcHalloween;
    textoHalloween.textContent = nombreHalloween;

    intervalo += 100;
    if (intervalo >= 1500) {
      clearInterval(intervaloId);
      intervalo = 100;
      contador = 0;
    }
  }

  boton.addEventListener('click', () => {
    contador++;
    if (contador === 1) {
      intervaloId = setInterval(mezclar, intervalo);
    }
  });
});