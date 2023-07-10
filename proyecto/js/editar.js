function mod(id){
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

document.getElementById("id1").value=data.id
document.getElementById("nombre1").value = data.nombre
document.getElementById("imagen1").value =data.imagen
document.getElementById("fecha1").value =data.fecha
document.getElementById("genero1").value =data.genero
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
}).mount('#app1')
}

function modi(){
    id = document.getElementById("id1").value;
    const url = 'https://mauroac26.pythonanywhere.com/peliculas/' + id;

    let producto = {
    nombre:document.getElementById("nombre1").value,
    genero: document.getElementById("genero1").value,
    fecha: document.getElementById("fecha1").value,
    imagen:document.getElementById("imagen1").value
    }
    
    var options = {
    body: JSON.stringify(producto),
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow'
    }
    fetch(url, options)
    .then(function () {
    alert("Registro modificado")
    
    window.location.href = "../templates/prueba.html";
    })
    .catch(err => {
    console.error(err);
    alert("Error al Modificar")
    })
}

