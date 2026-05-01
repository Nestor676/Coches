// Elementos del DOM (adaptados al HTML)
const btnCarregar = document.getElementById("boton_cargar");
const btnAfegir = document.getElementById("boton_añadir");
const tipusInput = document.getElementById("tipo");
const llista = document.getElementById("lista");
const tituloCarga = document.getElementById("titulo_carga");
const cajaContenido = document.querySelector(".caja_contenido");

// Función para ocultar el título de carga
function ocultarTituloCarga() {
    tituloCarga.style.display = "none";
}

// Función para mostrar el título de carga
function mostrarTituloCarga() {
    tituloCarga.style.display = "block";
    tituloCarga.textContent = "Carga los datos";
}

// Función para ocultar el fondo de contenido
function ocultarFondoContenido() {
    cajaContenido.style.backgroundColor = "transparent";
}

// Función para mostrar el fondo de contenido
function mostrarFondoContenido() {
    cajaContenido.style.backgroundColor = "white";
}

// Cargar vehículos
async function carregarDades() {
    llista.innerHTML = "<div>⏳ Cargando vehículos...</div>";
    try {
        const vehicles = await obtenirVehicles();
        mostrarVehicles(vehicles);
        ocultarTituloCarga();
        ocultarFondoContenido();
    } catch (error) {
        llista.innerHTML = `<div style="color:red;">❌ Error: ${error}</div>`;
    }
}

// Añadir vehículo
async function afegirVehicles(e){
    e.preventDefault(); // evita recargar página

    const tipus = tipusInput.value;
    const marca = document.getElementById("marca").value;
    const model = document.getElementById("modelo").value;
    const any = document.getElementById("año").value;
    const extra = document.getElementById("puertas").value;

    try {
        const nouVehicle = await afegirVehicle(tipus, marca, model, any, extra);
        afegirVehicleAlDOM(nouVehicle, vehicles.length - 1);
        ocultarTituloCarga();
        ocultarFondoContenido();
    } catch (error) {
        alert(error);
    }
}

// Mostrar lista
function mostrarVehicles(vehicles) {
    llista.innerHTML = "";
    vehicles.forEach((vehicle, index) => afegirVehicleAlDOM(vehicle, index));
}

// Pintar en DOM
function afegirVehicleAlDOM(vehicle, index) {
    const div = document.createElement("div");
    div.id = `vehicle-${index}`;
    div.innerHTML = vehicle.mostrarDetalls(index);
    llista.appendChild(div);
}

// Eventos
btnCarregar.addEventListener("click", carregarDades);
btnAfegir.addEventListener("click", afegirVehicles);

// Eliminar
window.eliminarVehicleDelDOM = async function(index) {
    try {
        await eliminarVehicle(index);
        document.getElementById(`vehicle-${index}`).remove();
        
        // Verificar si quedan vehículos
        if (vehicles.length === 0) {
            mostrarTituloCarga();
            mostrarFondoContenido();
        }
    } catch (error) {
        alert(error);
    }
};