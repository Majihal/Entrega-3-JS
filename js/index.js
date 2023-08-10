let arr = [];


// Capturo valores del formulario
function valoresformulario (){
    const nombre = document.querySelector("#nombre").value
    const apellido = document.querySelector("#apellido").value
    const dni = document.querySelector("#dni").value
    const mail = document.querySelector("#mail").value
    const valores = [nombre, apellido, dni, mail, uuidv4()]
    const noerrores = valores.every ((campo) => campo !="")
    if (noerrores) {
        return valores
    } else {
        return false
    }
}

// genera un numero de cliente aleatorio
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }


function borrarvalores () {
    document.querySelector('#nombre').value = ""
    document.querySelector('#apellido').value = ""
    document.querySelector('#dni').value = ""
    document.querySelector('#mail').value = ""
}

// Agrega los items al HTML.
function agregaritemlista (){
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

// Elimina los items de la lista y ademas actualiza el local storage para que devuela unicamente los elementos que no se eliminaron o el array vacio.
function eliminarItem(index) {
    arr.splice(index, 1);
    document.querySelector('#lista-clientes').innerHTML = agregaritemlista();
    // actualizarListaHTML ()
    guardardatos ()
  }

// Agrega los items a la lista. Luego de agregarlos se le pasa la funcion borrar valores para dejar todos inputs vacios.
function renderlista (item) {
    arr.push (item)
    document.querySelector('#lista-clientes').innerHTML = agregaritemlista()
    borrarvalores ()
}

// Guardo datos en local storage
function guardardatos(){
    localStorage.setItem ("cliente", JSON.stringify(arr))
}

// Traigo los datos del local storage y actualizo la lista
function cargardatos(){
    const datosGuardados = localStorage.getItem ("cliente")
    if (datosGuardados) {
        arr = JSON.parse(datosGuardados)
        actualizarListaHTML();
    }
   
}


function actualizarListaHTML() {
    document.querySelector('#lista-clientes').innerHTML = agregaritemlista();
}

// Espera a que cargue toda la pagina para que no obtenga datos vacios y luego carga los datos en el caso de que haya.
document.addEventListener("DOMContentLoaded", () => {
    cargardatos();
})    


// Evento para agregar al apretar el boton del formulario los valores ingresados por el usuario
document.querySelector ("#formulario").addEventListener ("submit", (e) => {
    e.preventDefault()
    const valoresform = valoresformulario ()
    if (valoresform){
        renderlista (valoresform)
        guardardatos()
        console.log (valoresform)
    }

}
)

