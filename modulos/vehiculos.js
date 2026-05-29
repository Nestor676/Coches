const tipo = document.getElementById("tipo");
const marca = document.getElementById("marca");
const modelo = document.getElementById("modelo");
const año = document.getElementById("año");
const puertas = document.getElementById("puertas");

import {listaVehiculos, imprimirLista} from "./gestorVehiculos";

document.getElementById("boton_añadir").addEventListener('click', function(event) {
    event.preventDefault();

    const vehiculo = [tipo.value, marca.value, modelo.value, año.value, puertas.value];

    listaVehiculos += vehiculo;

    console.log(vehiculo);
});


document.getElementById("boton_cargar").addEventListener('click', function() {
    
});