function Vehicle(marca, model, any) {
    this.marca = marca;
    this.model = model;
    this.any = any;
}

Vehicle.prototype.mostrarDetalls = function() {
    return `🚗 ${this.marca} ${this.model} (${this.any})`;
};

function Cotxe(marca, model, any, portes) {
    Vehicle.call(this, marca, model, any);
    this.portes = portes;
}
Cotxe.prototype = Object.create(Vehicle.prototype);
Cotxe.prototype.constructor = Cotxe;
Cotxe.prototype.mostrarDetalls = function(index) {
    return `<div class="vehicle-item">
                <div class="vehicle-info">
                    <div class="vehicle-icono">🚙</div>
                    <div class="vehicle-datos">
                        <p class="vehicle-marca">${this.marca}</p>
                        <p class="vehicle-año">(${this.any})</p>
                    </div>
                    <div class="vehicle-extra">    
                        <p class="vehicle-modelo">${this.model}</p>    
                        <p class="vehicle-puertas">${this.portes} puertas</p>
                    </div>
                <button class="boton-eliminar" onclick="eliminarVehicleDelDOM(${index})">❌</button>
                </div>
            </div>`;
};

function Moto(marca, model, any, tipus) {
    Vehicle.call(this, marca, model, any);
    this.tipus = tipus;
}
Moto.prototype = Object.create(Vehicle.prototype);
Moto.prototype.constructor = Moto;
Moto.prototype.mostrarDetalls = function(index) {
    return `<div class="vehicle-item">
                <div class="vehicle-info">
                    <div class="vehicle-icono">🏍️</div>
                    <div class="vehicle-datos">
                        <p class="vehicle-marca">${this.marca}</p>
                        <p class="vehicle-año">(${this.any})</p>
                    </div>
                    <div class="vehicle-extra">    
                        <p class="vehicle-modelo">${this.model}</p>    
                        <p class="vehicle-tipo">${this.tipus} tipo</p>
                    </div>
                <button class="boton-eliminar" onclick="eliminarVehicleDelDOM(${index})">❌</button>
                </div>
            </div>`;
};

function Camio(marca, model, any, pes) {
    Vehicle.call(this, marca, model, any);
    this.pes = pes;
}
Camio.prototype = Object.create(Vehicle.prototype);
Camio.prototype.constructor = Camio;
Camio.prototype.mostrarDetalls = function(index) {
    return `<div class="vehicle-item">
    <div class="vehicle-info">
        <div class="vehicle-icono">🚛</div>
        <div class="vehicle-datos">
            <p class="vehicle-marca">${this.marca}</p>
            <p class="vehicle-año">(${this.any})</p>
        </div>
        <div class="vehicle-extra">    
            <p class="vehicle-modelo">${this.model}</p>    
            <p class="vehicle-peso">${this.pes} peso</p>
        </div>
    <button class="boton-eliminar" onclick="eliminarVehicleDelDOM(${index})">❌</button>
    </div>
</div>`;
};

const vehicles = [
    new Cotxe("Toyota", "Corolla", 2020, 4),
    new Moto("Yamaha", "R1", 2022, "Esportiva"),
    new Camio("Volvo", "FH16", 2018, 20)
];

function obtenirVehicles() {
    return new Promise(resolve => {
        setTimeout(() => resolve(vehicles), 2000);
    });
}

function afegirVehicle(tipus, marca, model, any, extra) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!marca || !model || !any || !extra) {
                reject("⚠️ Tots els camps són obligatoris!");
                return;
            }

            // Normalizar los valores para comparación
            const marcaNorm = marca.trim().toLowerCase();
            const modelNorm = model.trim().toLowerCase();
            const anyNorm = parseInt(any);
            const extraNorm = String(extra).trim();

            // Verificar si ya existe un vehículo con las mismas características
            let existe = false;
            for (let i = 0; i < vehicles.length; i++) {
                const v = vehicles[i];
                const vMarca = String(v.marca).trim().toLowerCase();
                const vModel = String(v.model).trim().toLowerCase();
                const vAny = Number(v.any);
                let vExtra = "";
                if (v.portes !== undefined) vExtra = String(v.portes).trim();
                if (v.tipus !== undefined) vExtra = String(v.tipus).trim();
                if (v.pes !== undefined) vExtra = String(v.pes).trim();

                if (vMarca === marcaNorm && vModel === modelNorm && vAny === anyNorm && vExtra === extraNorm) {
                    existe = true;
                    break;
                }
            }

            if (existe) {
                reject("⚠️ Ja existeix un vehicle amb aquestes característiques!");
                return;
            }

            let nouVehicle;
            // Determinar el tipo de vehículo
            const tipusLower = tipus.toLowerCase();
            if (tipusLower.includes("coche") || tipusLower.includes("cotxe")) {
                nouVehicle = new Cotxe(marca, model, any, extra);
            } else if (tipusLower.includes("moto") || tipusLower.includes("mot")) {
                nouVehicle = new Moto(marca, model, any, extra);
            } else if (tipusLower.includes("camión") || tipusLower.includes("camió") || tipusLower.includes("camio")) {
                nouVehicle = new Camio(marca, model, any, extra);
            } else {
                // Por defecto crear como Cotxe
                nouVehicle = new Cotxe(marca, model, any, extra);
            }

            vehicles.push(nouVehicle);
            resolve(nouVehicle);
        }, 1000);
    });
}

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