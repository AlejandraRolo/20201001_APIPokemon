// Obtenemos la API por medio de promesas

/** 
 * fecth() a 2015 es una funcionalidad nueva de JS
 * permite controlar errores mas facilmente
 * trabaja por medio de http o https y se basa en "promesas"
 * se basa en un sistema de peticiones y respuestas (cliente-servidor)
*/

// URL de la API
const API= 'https://pokeapi.co/api/v2/pokemon';

// Obtener el retorno de la API
const obtenerDataAll = (api, accion) => {
    return fetch(api)
        // obtener listado de pokemones y mapear la respuesta en formato Json
        .then((response) => response.json())
        .then((json) => {
            paginacion(json, accion);
            json.results.forEach((item) => {
                // pasar la url de cada pokemon como parametro
                obtenerDataId(item.url)
            })
        })
        .catch((error) => {
            console.log('Error: ', error)
        });
}

const obtenerDataId = (urlPokemon) => {
    return fetch(urlPokemon)
        .then((response) => response.json())
        .then((jsonPokemon) => {
            // obtener datos de pokemon
            llenarDatos(jsonPokemon);
        })
        .catch((error) => {
            console.log('Error: ', error)
        });
}

// llenar datos en nuestra página
let html= '';
const llenarDatos = (data)=> {

    html += '<div class="col-sm-12 col-md-6 col-lg-4">';
    html += '<div class="card mb-3 p-3 border-container text-white bg-dark" style="max-width: 540px;">'
    html += '<div class="row no-gutters">';
    html += '<div class="col-md-3">';
    html += `<img src="${data.sprites.other.dream_world.front_default}" class="card-img-top" alt="">`;
    html += `<img src="${data.sprites.other['official-artwork'].front_default}" class="card-img-top" alt="">`;
    html += '</div>';
    html += '<div class="col-md-9">';
    html += '<div class="card-body">';
    html += `<h5 class="card-title text-center">${data.name.toUpperCase()}</h5>`;
    for(let i= 0; i< data.abilities.length; i++){  
        html += `<p class="card-text"><b>Habilidad ${i+1}:</b> ${data.abilities[i].ability.name}</p>`;
    }
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    document.getElementById('datosPokemon').innerHTML= html;
}

let contador= 1;
let pag= 0;
const paginacion = (data, accion) => {
    html= ''
    let htmlpag= '';
    let htmlLabelPag= ''

    // establecer url de previo o siguiente navegación
    htmlpag += `<li class="page-item ${data.previous==null?'disabled':''}"><a class="page-link" onclick="obtenerDataAll('${data.previous}', 'prev')">Previo</a></li>`;
    htmlpag += `<li class="page-item ${data.next==null?'disabled':''}"><a class="page-link" onclick="obtenerDataAll('${data.next}', 'next')">Siguiente</a></li>`;
    document.getElementById('paginacion').innerHTML = htmlpag;

    // establecer página de navegación
    accion=='next' ? contador++ : accion=='prev' ? contador-- : contador;
    pag= contador;
    htmlLabelPag = `<p>Página ${pag} de ${data.count}`
    document.getElementById('displayPag').innerHTML = htmlLabelPag;
}

// Activo o invoco la función
obtenerDataAll(API);



