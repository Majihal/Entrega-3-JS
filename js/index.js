let arr = [];

// Capturo valores del formulario
function leerValoresFormulario (){
    const valores = []
    let noErrores = true
    const campos = [
        'nombre', 
        'apellido', 
        'dni', 
        'mail',
        'telefono'
    ]

    campos.forEach(campo => {
        const valorDelCampo = document.querySelector('#'+ campo).value
        if(valorDelCampo == '') {
            document.getElementById('error' + campo).innerHTML = "Ingrese un " + campo+" valido";
            noErrores = false
        } else {
            document.getElementById('error' + campo).innerHTML = "";
        }
        if(campo == 'telefono') {
            return
        }
        if(campo == 'dni') {
            if (valorDelCampo === "" || valorDelCampo.length !== 8 || isNaN(valorDelCampo)) {
                noErrores = false
                document.getElementById('errordni').innerHTML = "Ingrese un DNI válido de 8 cifras.";
            }  else  if (arr.find(user => user[2] === valorDelCampo) ){
                noErrores = false
                document.getElementById('errordni').innerHTML = "Ya existe el DNI registrado";
            } else {
                document.getElementById('errordni').innerHTML = "";
            }
        }

        if(campo == 'nombre' || campo == 'apellido') {
            if (valorDelCampo === "" || !validarCaracteresEspeciales(valorDelCampo)) {
                noErrores = false
                document.getElementById(`error${campo}`).innerHTML = `El ${campo} tiene caracteres invalidos`;
                return
            } else {
                document.getElementById(`error${campo}`).innerHTML = "";
            }
        }   
        
        valores.push( valorDelCampo )
    })
    valores.push(uuidv4())
    
    if (noErrores){
        return valores
    } 
    return false
}

// Agrega los items al HTML.
function renderLista (){
    let copiaarr = arr.map((user, index) => (
        `<tr>
            <td>${user[0]}</td>
            <td>${user[1]}</td>
            <td>${user[2]}</td>
            <td>${user[3]}</td>
            <td>${user[4]}</td>
            <td><button onclick="eliminarItem(${index})">Eliminar</button></td>
        </tr>
        `
    )) 

    return copiaarr.join ("")
}

function borrarValoresForm (){
    document.querySelector('#nombre').value = ""
    document.querySelector('#apellido').value = ""
    document.querySelector('#dni').value = ""
    document.querySelector('#mail').value = ""
    
}

// genera un numero de cliente aleatorio
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

function eliminarItem(index) {
    arr.splice(index, 1);
    document.querySelector('#lista-clientes').innerHTML = renderLista();
    guardarDatosEnLocal ()
  }

function agregarItems (item) {
    arr.push (item)
    document.querySelector('#lista-clientes').innerHTML = renderLista()
    borrarValoresForm ()
}

// Guardo datos en local storage
function guardarDatosEnLocal(){
    localStorage.setItem ("cliente", JSON.stringify(arr))
}

function cargarDatosLocal(){
    const datosGuardados = localStorage.getItem ("cliente")
    if (datosGuardados) {
        arr = JSON.parse(datosGuardados)
        actualizarListaHTML();
    }
   
}

function actualizarListaHTML() {
    document.querySelector('#lista-clientes').innerHTML = renderLista();
}

function validarCaracteresEspeciales(texto) {
    var letters = /^[A-Za-z]+$/;
    return texto.match(letters);
}



// https://documenter.getpostman.com/view/1134062/T1LJjU52#4a76c2d7-6826-43a3-98b0-18d6d929f414 GET cities and dial codes. Use este codigo para hacer el fecth.
  fetch("https://countriesnow.space/api/v0.1/countries/codes", {
    method: 'GET',
    redirect: 'follow'
  })
    .then(respuesta => respuesta.text())
    .then(resultado =>{
        const respuesta = JSON.parse( resultado )
        //Argentina (+54)
        const respuestacopia = respuesta.data.map(element => {
            return( `<option value="${element.dial_code}">${element.name}(${element.dial_code})</option>`)
        });
        const renderPaises = respuestacopia.join("")
        document.querySelector('#render-pais').innerHTML = renderPaises
        

    } )
    .catch(error => console.log('error', error));


// Espera a que cargue toda la pagina para que no obtenga datos vacios y luego carga los datos en el caso de que haya.
document.addEventListener("DOMContentLoaded", () => {
    cargarDatosLocal();
})    




// Evento para agregar al apretar el boton del formulario los valores ingresados por el usuario
document.querySelector ("#formulario").addEventListener ("submit", (e) => {
    e.preventDefault()
    const valoresform = leerValoresFormulario ()
    if (valoresform) {
        agregarItems (valoresform)
        guardarDatosEnLocal()
        }
})
