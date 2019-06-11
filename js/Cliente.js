'use strict';

class Cliente {
    constructor(psNombre, psApellido, psEmail, pnFondos, pnMensualidad) {
        this.nombre = psNombre;
        this.apellido = psApellido;
        this.email = psEmail;
        this.fondos = pnFondos;
        this.mensualidad = pnMensualidad;
    }

    //Metodo del cliente
    comprobarFondos() {
        if (this.fondos !== 0 && this.fondos >= this.mensualidad) {
            return true;
        } else {
            return false;
        }
    }

    pagar() {
        if (this.fondos >= this.mensualidad) {
            this.fondos -= this.mensualidad;
            return true;
        }
        return false;
    }
};