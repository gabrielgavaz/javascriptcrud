// variables globales
let fila = null;
restante = 0;




//guardar presupuesto
const guardarPresupuesto = () => {
    let presupuesto = parseInt(document.querySelector("#presupuestoInicial").value);

    // Se asigna el presupuesto inicial a la variable restante
    restante = presupuesto; 

    // Verifica si el presupuesto es válido
    if (presupuesto < 1 || isNaN(presupuesto)) { 
      mostrarError("#msj_error_pregunta", "Cantidad No Válida");
      return;
    }

     // Guardamos el presupuesto en el almacenamiento local
    localStorage.setItem("presupuesto", presupuesto);
    actualizarVista();
}


//actualizar vista
const actualizarVista = () => {
    let presupuesto = localStorage.getItem("presupuesto");
  
    let divPregunta = document.querySelector("#pregunta");
    let divGastos = document.querySelector("#divGastos");
    let divControlGastos = document.querySelector("#divControlGastos");
  
    divPregunta.style.display = "none";
    divGastos.style.display = "none";
  
  
    let controlGastos = `<div class="gastos-realizados">
                        <div class="alert alert-success">
                        Presupuesto:$ ${presupuesto}</div>
                        <div class="alert alert-success">
                        Restante:$ ${presupuesto}</div>
                        <button onclick="reiniciarPresupuesto()" class="botonPrincipal">
                              Reiniciar presupuesto</button>
                      </div>`;
  
    if (!presupuesto) {
      divPregunta.style.display = "block"; // Si no hay presupuesto guardado, muestra la sección del presupuesto para ingresar el dinero total que tenemos
    } else {
      divPregunta.style.display = "none"; // aqui es lo que ocurre si hay ya un presupuesto establecio y guardado en el local
      divGastos.style.display = "block";
      divControlGastos.innerHTML = controlGastos;
    }
  }


//reiniciar presupuesto
const reiniciarPresupuesto=()=>{
  localStorage.clear();
  location.reload(true);
}

//agregamos gastos
const agregarGasto = () =>{
    let datosRecuperados = recuperarDatos();
    let leerDatos = datosLocalStorage(datosRecuperados);

    if(datosRecuperados == false){
        msg.innerHTML = "Ingrese datos"
    }else{
        if( fila == null){
            insertar(leerDatos);
            msg.innerHTML= "datos insertados"; 
        }else{
            update();
            msg.innerHTML= "datos actualizados";
        }
    }


 
}


// recuperar datos del formulario
let recuperarDatos =() =>{
    let tipoGasto = document.getElementById('tipoGasto').value;
    let cantidadGasto = parseInt(document.getElementById('cantidadGasto').value);

    if (cantidadGasto < 1 || isNaN(cantidadGasto) || tipoGasto.trim() === '' || !/^[a-zA-Z]+$/.test(tipoGasto)) {  //verificaom que los datos entrantes son validos
        mostrarError("#msg", "ERROR EN CAMPOS");
        return;
      }

    let arr = [tipoGasto, cantidadGasto]
    
    if(arr.includes("")){
        return false;
        }else{
            return arr;
        }
}


//datos en el localStorage
let datosLocalStorage = (datosRecuperados) =>{

    // guardamos los datos en el localStorage
    let tg = localStorage.setItem('tipo de gasto', datosRecuperados[0]);
    let cg = localStorage.setItem('cantidad de gasto', datosRecuperados[1]);

    //obtenemos los datos del localStorage
    let tg1 = localStorage.getItem('tipo de gasto', tg);
    let cg1 = localStorage.getItem('cantidad de gasto', cg);

    let arr = [tg1, cg1];
    return arr;
}


//inserrtar datos
const insertar = (leerDatos) =>{
    let fila = table.insertRow();
    fila.insertCell(0).innerHTML = leerDatos[0];
    fila.insertCell(1).innerHTML = leerDatos[1];
    fila.insertCell(2).innerHTML = `<button onclick = edit(this)>edit</button>
    <button onclick = remove(this)>Borrar</button>`;
}

//editar fila

const edit = (td) => {
    fila = td.parentElement.parentElement;
    document.getElementById("tipoGasto").value = fila.cells[0].innerHTML;
    document.getElementById("cantidadGasto").value = fila.cells[1].innerHTML;
}

// actualizar fila

const update = () =>{
    fila.cells[0].innerHTML =  document.getElementById("tipoGasto").value;
    fila.cells[1].innerHTML =  document.getElementById("cantidadGasto").value;
    fila = null;
}

//eliminar fila

const remove = (td) =>{
    let ans = confirm("are you sure");
    if(ans == true){
        fila = td.parentElement.parentElement;
        document.getElementById("table").deleteRow(fila.rowIndex);
    }

     
}


//mostrar error
const mostrarError = (elemento, mensaje) => {
    let divError = document.querySelector(elemento);
    divError.innerHTML = `<p class="alerta-error">${mensaje}</p>`;
    setTimeout(() => {
      divError.innerHTML = "";
    }, 2000);
  }
  


