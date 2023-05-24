//MUESTRA MENU AL HACER CLIC EN BOTON DEL NAV
const toggle = document.querySelector('.toggle');
const menu = document.querySelectorAll('.item');


  toggle.addEventListener('click', () => {

    menu.forEach(item =>{   
    
    item.classList.toggle('active')
       

  });
 
});


document.getElementById('flecha-derecha').onclick = function(){
  const widthItem = document.querySelector('.card').offsetWidth;
  document.getElementById('formList').scrollLeft += widthItem;
}
document.getElementById('flecha-izquierda').onclick = function(){
  const widthItem = document.querySelector('.card').offsetWidth;
  document.getElementById('formList').scrollLeft -= widthItem;
}

document.getElementById('flecha-derecha-series').onclick = function(){
  const widthItem = document.querySelector('.card').offsetWidth;
  document.getElementById('formListSeries').scrollLeft += widthItem;
}
document.getElementById('flecha-izquierda-series').onclick = function(){
  const widthItem = document.querySelector('.card').offsetWidth;
  document.getElementById('formListSeries').scrollLeft -= widthItem;
}

// document.getElementById('flecha-derechaNov').onclick = function(){
//   const widthItem = document.querySelector('.card').offsetWidth;
//   document.getElementById('formListNov').scrollLeft += widthItem;
// }
// document.getElementById('flecha-izquierdaNov').onclick = function(){
//   const widthItem = document.querySelector('.card').offsetWidth;
//   document.getElementById('formListNov').scrollLeft -= widthItem;
// }



let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

//PASA A LA SIGUENTE PAGINA DE PELICULAS
btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas();
	}
});

//RETROCEDE A LA PAGINA ANTERIROR DE PELICULAS
btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
	}
});

//CARGA LAS PELICULAS TENDENCIAS
const cargarPeliculas = async() => {
   

    try{

    
    const respuesta =  await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=a60070faf034ecaa57adbea4299c3a88&language=es-ES&page=${pagina}`)
    

    const datos = await respuesta.json()
    
    let peliculas = '';

    //CREA LOS CARD DE LAS PELICULAS
    datos.results.forEach(pelicula => {
        
        peliculas += `
        <div class="card">
        
        <a class="boton" href="#" onclick='obtenerVideo(${pelicula.id}, "${pelicula.title}", "${pelicula.overview}", "${pelicula.media_type}");'><i class="fas fa-eye"></i></a>

       
        <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="avatar">
        <div class="content">
        
        <table width="100%" cellspacing="0">
        <tr>
				<td><img src="img/star.png" width="20" height="20"></img></td>
				<td>${pelicula.vote_average}</td>
			</tr>
            <tr>
                <td style="text-align: left;"><p>${pelicula.title}</p></td>
               
            </tr>

            
        </table>
    </div>
        </div>
    `;
    });

    document.getElementById('list').innerHTML = peliculas;

}catch(error){
    console.log(error)
}
}

cargarPeliculas()


let paginaSeries = 1;
const btnAnteriorSeries = document.getElementById('btnAnteriorSeries');
const btnSiguienteSeries = document.getElementById('btnSiguienteSeries');

//PASA A LA SIGUENTE PAGINA DE SERIES
btnSiguienteSeries.addEventListener('click', () => {
	if(paginaSeries < 1000){
		paginaSeries += 1;
		cargarSeries();
	}
});

//RETROCEDE A LA PAGINA ANTERIOR DE LAS SERIES
btnAnteriorSeries.addEventListener('click', () => {
	if(paginaSeries > 1){
		paginaSeries -= 1;
		cargarSeries();
	}
});

//OBTIENE LAS SERIES TENDENCIAS
const cargarSeries = async() => {
    try{

 
    
    const respuesta =  await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=a60070faf034ecaa57adbea4299c3a88&language=es-ES&page=${paginaSeries}`)
    
    
    const datosSeries = await respuesta.json()
    
    let series = '';
    
    //CREAR LOS CARD DE LAS SERIES
    datosSeries.results.forEach(serie => {
        
        series += `
        <div class="card">
        <a class="boton" href="#" onclick='obtenerVideo(${serie.id}, "${serie.original_name}", "${serie.overview}", "${serie.media_type}");'><i class="fas fa-eye"></i></a>
        <img src="https://image.tmdb.org/t/p/w500/${serie.poster_path}" class="avatar">
        <div class="content">
        <table width="100%" cellspacing="0">
        <tr>
				<td><img src="img/star.png" width="" height="20"></img></td>
				<td>${serie.vote_average}</td>
			</tr>
            <tr>
                <td style="width: 100%;"><p>${serie.original_name}</p></td>
               
            </tr>
            
        </table>
    </div>
        </div>
    `;
    });

    document.getElementById('listSeries').innerHTML = series;

}catch(error){
    console.log(error)
}
}

cargarSeries()

//OBTNIENE VIDEO Y SINOPSIS
async function obtenerVideo(id, name, sinopsis, tipo){
alert(tipo)
// const obtenerVideo = async() => {

  try{

  
  const respuesta =  await fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=a60070faf034ecaa57adbea4299c3a88&append_to_response=videos`)
  
  
  let trailerSinopsis = '';
  const dataVideos = await respuesta.json()
  
  
  const trailer = dataVideos.videos.results.find(
      (vid) => vid.name === "Official Trailer"
      
    );

    //INSERTA HTML EN EL MODAL
    trailerSinopsis += `

    <h2>${name}</h2>
    <h3>Trailer</h3>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>
    <h3>Sinopsis</h3>
    <p>${sinopsis}</p>
    `;
      
    
    
        document.getElementById('modalContent').innerHTML = trailerSinopsis;

        





}catch(error){
  console.log(error)
}

//MODAL TRAILER Y SINOPSIS
var modal = document.getElementById('myModal');
var closeBtn = modal.getElementsByClassName('close')[0];

//MUESTRA EL MODAL
modal.style.display = 'block';

//CIERRA MODAL Y RECARGA LA PAGINA
closeBtn.addEventListener('click', function() {
modal.style.display = 'none';
window.location.reload()
});



}
