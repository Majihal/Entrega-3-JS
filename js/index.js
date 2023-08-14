let arr = [];

// Capturo valores del formulario
function leerValoresFormulario (){
    const nombre = document.querySelector("#nombre").value
    const apellido = document.querySelector("#apellido").value
    const dni = document.querySelector("#dni").value
    const mail = document.querySelector("#mail").value
    const valores = [nombre, apellido, dni, mail, uuidv4()]
    const noErrores = valores.every ((campo) => campo !="")
    const dniRepetido = arr.find(user => user[2] === dni)
    if (dniRepetido){
        document.getElementById('errordni').innerHTML = "Ya existe el DNI registrado";
    }
    if (mail === "") {
        document.getElementById('errormail').innerHTML = "Ingrese un mail valido";
    } else {
        document.getElementById('errormail').innerHTML = "";
    }

    if (dni === "" || dni.length !== 8 || isNaN(dni)) {
        document.getElementById('errordni').innerHTML = "Ingrese un DNI válido de 8 cifras.";
    }  else {
        document.getElementById('errordni').innerHTML = "";
    }

    if (nombre === "" || !validarCaracteresEspeciales(nombre)) {
        document.getElementById('errornombre').innerHTML = "El nombre tiene caracteres invalidos";
    } else {
        document.getElementById('errornombre').innerHTML = "";
    }

    if (!validarCaracteresEspeciales(apellido)) {
        document.getElementById('errorapellido').innerHTML = "El apellido tiene caracteres invalidos";
    }  else {
        document.getElementById('errorapellido').innerHTML = "";
    } 
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