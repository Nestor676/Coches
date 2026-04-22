
// Constructor base Vehicle
function Vehicle(marca, model, any) {
    this.marca = marca;
    this.model = model;
    this.any = any;
}

Vehicle.prototype.mostrarDetalls = function() {
    return `🚗 ${this.marca} ${this.model} (${this.any})`;
};

// Constructor Cotxe (hereta de Vehicle)
function Cotxe(marca, model, any, portes) {
    Vehicle.call(this, marca, model, any);
    this.portes = portes;
}
Cotxe.prototype = Object.create(Vehicle.prototype);
Cotxe.prototype.constructor = Cotxe;
Cotxe.prototype.mostrarDetalls = function(index) {
    return `<div class="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-2">
                <div class="p-8 flex w-full justify-around">
                    <div class="pr-4">
                        <p class="text-4xl font-bold">🚙</p>
                    </div>
                    <div>
                        <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">${this.marca}</div>
                        <p class="text-gray-500">(${this.any})</p>
                    </div>
                    <div >    
                        <p class="text-gray-500">${this.model}</p>    
                        <p class="text-gray-500">${this.portes} portes</p>
                    </div>
                <button onclick="eliminarVehicleDelDOM(${index})">❌</button>
                </div>
                
            </div>`;
};

// Constructor Moto (hereta de Vehicle)
function Moto(marca, model, any, tipus) {
    Vehicle.call(this, marca, model, any);
    this.tipus = tipus;
}
Moto.prototype = Object.create(Vehicle.prototype);
Moto.prototype.constructor = Moto;
Moto.prototype.mostrarDetalls = function(index) {
    return `<div class="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-2">
                <div class="p-8 flex w-full justify-around">
                    <div class="pr-4">
                        <p class="text-4xl font-bold">🏍️</p>
                    </div>
                    <div>
                        <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">${this.marca}</div>
                        <p class="text-gray-500">(${this.any})</p>
                    </div>
                    <div >    
                        <p class="text-gray-500">${this.model}</p>    
                        <p class="text-gray-500">${this.tipus} tipus</p>
                    </div>
                <button onclick="eliminarVehicleDelDOM(${index})">❌</button>
                </div>
                
            </div>`;
};

// Constructor Camió (hereta de Vehicle)
function Camio(marca, model, any, pes) {
    Vehicle.call(this, marca, model, any);
    this.pes = pes;
}
Camio.prototype = Object.create(Vehicle.prototype);
Camio.prototype.constructor = Camio;
Camio.prototype.mostrarDetalls = function(index) {
    return `<div class="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-2">
    <div class="p-8 flex w-full justify-around">
        <div class="pr-4">
            <p class="text-4xl font-bold">🚛</p>
        </div>
        <div>
            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">${this.marca}</div>
            <p class="text-gray-500">(${this.any})</p>
        </div>
        <div >    
            <p class="text-gray-500">${this.model}</p>    
            <p class="text-gray-500">${this.pes} pes</p>
        </div>
    <button onclick="eliminarVehicleDelDOM(${index})">❌</button>
    </div>
    
</div>`;
};

// Simulació de base de dades
const vehicles = [
    new Cotxe("Toyota", "Corolla", 2020, 4),
    new Moto("Yamaha", "R1", 2022, "Esportiva"),
    new Camio("Volvo", "FH16", 2018, 20)
];

// Simula la càrrega de dades amb asincronia
function obtenirVehicles() {
    return new Promise(resolve => {
        setTimeout(() => resolve(vehicles), 2000);
    });
}

// Afegir un vehicle segons el tipus
function afegirVehicle(tipus, marca, model, any, extra) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!marca || !model || !any || !extra) {
                reject("⚠️ Tots els camps són obligatoris!");
                return;
            }

            let nouVehicle;
            if (tipus === "Cotxe") nouVehicle = new Cotxe(marca, model, any, extra);
            if (tipus === "Moto") nouVehicle = new Moto(marca, model, any, extra);
            if (tipus === "Camió") nouVehicle = new Camio(marca, model, any, extra);

            vehicles.push(nouVehicle);
            resolve(nouVehicle);
        }, 1000);
    });
}

// Eliminar un vehicle
function eliminarVehicle(index) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (index < 0 || index >= vehicles.length) {
                reject("⚠️ Vehicle no trobat!");
                return;
            }
            vehicles.splice(index, 1);
            resolve(index);
        }, 1000);
    });
}