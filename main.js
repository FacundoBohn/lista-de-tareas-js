const Inputagregar = document.querySelector("#btn-agregar");
const Inputlista = document.querySelector('#tarea');
const InputTexto = document.querySelector('#texto');
const nuevaLista = document.createElement('li')
let guardarTareas = [];

function guardarTareasLocalStorage(){
    const tareasJSON = JSON.stringify(guardarTareas);
    localStorage.setItem('tareasLista', tareasJSON);
    console.log("Tareas guardadas", guardarTareas)
}

function cargarTareas(){
    const tareasJSON = localStorage.getItem('tareasLista');
    if(tareasJSON){
        guardarTareas = JSON.parse(tareasJSON);
        console.log("Tareas guardadas", guardarTareas);
    } else {
        guardarTareas = [];

        console.log("No hay tareas guardadas, iniciando una nueva lista vacía");
    }
}
function mostrarLasTareas(){

    Inputlista.innerHTML = '';

    for(let i = 0; i < guardarTareas.length;i++){
        const tareaActual = guardarTareas[i]
        const nuevoLi = document.createElement('li');
        nuevoLi.textContent = tareaActual;
        Inputlista.appendChild(nuevoLi);

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'X'
        botonEliminar.classList.add('btn-eliminar');
        nuevoLi.appendChild(botonEliminar);
        botonEliminar.addEventListener('click',()=>{
           eliminartarea(i);
        })
    }
}

function eliminartarea(indiceAeliminar){
    guardarTareas.splice(indiceAeliminar,1);
    guardarTareasLocalStorage();
    mostrarLasTareas();
}
Inputagregar.addEventListener('click',()=>{
   let textoDeLaTarea = InputTexto.value.trim();
   if(textoDeLaTarea.trim() === ''){
    alert("No haz escrito nada.")
    return;
}
guardarTareas.push(textoDeLaTarea);
guardarTareasLocalStorage();
InputTexto.value = '';

   mostrarLasTareas();

});
cargarTareas();
mostrarLasTareas();