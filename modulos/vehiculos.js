export class vehiculos{
    constructor(tipo){
        if(!tipo){
            throw new Error ("!El campo 'tipo' es obligatorio¡");
        }

        this.tipo = tipo;
    }

    mostrarDetalles(){
        return `Tipo: ${this.tipo}`;
    }

    getJson(){
        return JSON.stringify(this);
    }
}