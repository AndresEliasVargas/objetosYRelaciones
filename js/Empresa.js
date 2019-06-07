'use strict';

class Empresa {
    constructor(psNombre) {
        this.nombre = psNombre;
        this.clientes = [];
    }

    //Agregar
    agregarCliente(pnuevoCliente) {
        for (let i = 0; i < this.clientes.length; i++) {
            if (pnuevoCliente.email === this.clientes[i].email) {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Ya se encuentra registrado el correo: ' +
                        pnuevoCliente.email + ' con el cliente ' +
                        this.clientes[i].nombre + ' ' + this.clientes[i].apellido,
                });
                //Retorna a la variable el estado de los datos
                return false;
            };
        };
        this.clientes.push(pnuevoCliente);

        //Debe estar aquí porque si se pone en el controlador genera una erronea funcionalidad
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,

        });
        Toast.fire({
            type: 'success',
            title: 'Cliente almacenado correctamente'
        });

        //Retorna a la variable el estado de los datos
        return true;
    };

    //Eliminar
    eliminarCliente() { };

    //Cobrar
    cobrarACliente() { };
};