let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionGastos = [];
let limite;
let upDate=1;
//Esta función se invoca al momento de que el usuario hace clic en el
//boton
function clickBoton() {
    //evaluamos los campos
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    let limiteGasto = document.getElementById('limite').value;
    let descripcion = document.getElementById('DescripcionGasto').value;
    const limitGasto = document.getElementById('limite');

    if(upDate==1){
        if(nombreGasto !='' && valorGasto !='' && limiteGasto !=''){//evaluamos si existe un dato ingresado
        
            limite = Number(limiteGasto);//guardamos el limite de gastos
            limitGasto.disabled = true;


            //metemos datos a las arrays
            listaNombresGastos.push(nombreGasto);
            listaValoresGastos.push(valorGasto);
            listaDescripcionGastos.push(descripcion);
    
            //alert('Click de usuario');
            actualizarListaGastos();
        }
        else{
            alert("Completa los datos");//mandmos alert para llenar datos completos
        }
    }
    else{

        if(nombreGasto !='' && valorGasto !='' && limiteGasto !=''){//evaluamos si existe un dato ingresado
        
            //metemos datos a las arrays
            listaNombresGastos[upDate]=nombreGasto;
            listaValoresGastos[upDate]=valorGasto;
            listaDescripcionGastos[upDate]=descripcion;
            
            actualizarListaGastos();
            document.getElementById('botonFormulario').textContent='Agregar Gasto';
        }
        else{
            alert("Completa los datos");//mandmos alert para llenar datos completos
        }
        upDate=1;
        
    }
    
    
}
function sinlimite(){
    
}

function actualizarListaGastos() {
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    

    let htmlLista = '';
    let totalGastos = 0;

    listaNombresGastos.forEach((elemento, posicion) => {

        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcion = listaDescripcionGastos[posicion];

        if(valorGasto<limite){
            htmlLista += `<li>
                    ${elemento} - USD ${valorGasto.toFixed(2)} - ${descripcion}
                    <button onclick="modificarGasto(${posicion});">Modificar</button>
                    <button onclick="eliminarGasto(${posicion});">Eliminar</button>
                    </li>`;
            //Calculamos el total de gastos
            totalGastos += Number(valorGasto);
            
        }
        else{
            alert("Ingreso excedido");
        }

    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();

    if(totalGastos==0){
        const limitGasto = document.getElementById('limite');
        limitGasto.disabled = false;
    }

}

function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('DescripcionGasto').value = '';
}

function eliminarGasto(posicion) {

    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    actualizarListaGastos();
}

function modificarGasto(posicion){

    document.getElementById('nombreGasto').value = listaNombresGastos[posicion];
    document.getElementById('valorGasto').value = listaValoresGastos[posicion];
    document.getElementById('DescripcionGasto').value = listaDescripcionGastos[posicion];
    upDate=posicion;
   let boton = document.getElementById('botonFormulario').textContent='Actualizar';
    
    if(boton=='Actualizar'){
        const buton = document.getElementById('botonFormulario');
        buton.onclick = clickBoton;
        
    }
}
