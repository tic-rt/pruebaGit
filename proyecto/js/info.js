function info(id){
    // const url = 'https://mauroac26.pythonanywhere.com/productos/' + id;

    const { createApp } = Vue
createApp({
data() {
return {
id:0,
nombre:"",
imagen:"",
stock:0,
precio:0,
url:'https://mauroac26.pythonanywhere.com/peliculas/'+id,

}

},

methods: {
fetchData(url) {
fetch(url)
.then(response => response.json())
.then(data => {
    this.productos = data;

// document.getElementById("id1").value=data.id
document.getElementById("infoNombre").textContent  = data.nombre
document.getElementById("infoGenero").textContent  = data.genero
document.getElementById("infoFecha").textContent  = data.fecha
// document.getElementById("imagen1").value =data.imagen
// document.getElementById("fecha1").value =data.fecha
// document.getElementById("genero1").value =data.genero
})
.catch(err => {
console.error(err);
this.error=true
})


},

},

created() {
this.fetchData(this.url)
},
}).mount('#app2')
}


