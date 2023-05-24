
let paginaNov = 1;
const btnAnteriorNov = document.getElementById('btnAnteriorNov');
const btnSiguienteNov = document.getElementById('btnSiguienteNov');


//PASA A LA SIGUENTE PAGINA DE PELICULAS
btnSiguienteNov.addEventListener('click', () => {
	if(paginaNov < 1000){
		paginaNov += 1;
		cargarPeliculasNov();
	}
});

//RETROCEDE A LA PAGINA ANTERIROR DE PELICULAS
btnAnteriorNov.addEventListener('click', () => {
	if(paginaNov > 1){
		paginaNov -= 1;
		cargarPeliculasNov();
	}
});

//CARGA LAS PELICULAS TENDENCIAS
const cargarPeliculasNov = async() => {
   

    try{

    
    const respuestaNov =  await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=a60070faf034ecaa57adbea4299c3a88&language=es-ES&page=${paginaNov}`)
    

    const datosNov = await respuestaNov.json()
  
    let peliculasNov = '';

    //CREA LOS CARD DE LAS PELICULAS
    datosNov.results.forEach(peliculaNov => {
        console.log(datosNov.results)
        peliculasNov += `
        <div class="card">
        
        <a class="boton" href="#" onclick='obtenerVideo(${peliculaNov.id}, "${peliculaNov.title}", "${peliculaNov.overview}", "movie");'><i class="fas fa-eye"></i></a>

       
        <img src="https://image.tmdb.org/t/p/w500/${peliculaNov.poster_path}" class="avatar">
        <div class="content">
        
        <table width="100%" cellspacing="0">
        <tr>
				<td><img src="img/star.png" width="20" height="20"></img></td>
				<td>${peliculaNov.vote_average}</td>
			</tr>
            <tr>
                <td style="text-align: left;"><p>${peliculaNov.title}</p></td>
               
            </tr>

            
        </table>
    </div>
        </div>
    `;
    });

    document.getElementById('listNov').innerHTML = peliculasNov;

}catch(error){
    console.log(error)
}
}

cargarPeliculasNov()


