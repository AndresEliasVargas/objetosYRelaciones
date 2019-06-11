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
    eliminarCliente(pemail) {
        //sweetalert2 - Botones de cancelar y eliminar, estilos
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success ml-3',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false,
        });

        //Alert de confirmación
        swalWithBootstrapButtons.fire({
            title: '¿Está seguro de eliminar la Persona?',
            text: "Usted no podrá revertir este paso!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                // Métodos que permiten los cambios en la persona y la interfaz
                for (let i = 0; i < this.clientes.length; i++) {
                    if (pemail === this.clientes[i].email) {
                        const nombre = this.clientes[i].nombre;
                        const apellido = this.clientes[i].apellido;

                        this.clientes.splice(i, 1);
                        actualizarTabla();

                        swalWithBootstrapButtons.fire(
                            'Eliminado!',
                            nombre + ' ' + apellido + ' ha sido eliminado(a).',
                            'success'
                        )
                    }
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'La persona no fue eliminada :)',
                    'error'
                )
            }
        });
    };

    //Cobrar a cliente
    cobrarACliente(pemail) {
        let validarPago = false;
        for (let i = 0; i < this.clientes.length; i++) {
            if (pemail === this.clientes[i].email) {
                validarPago = this.clientes[i].pagar();

                //Debe estar aquí porque si se pone en el controlador genera una erronea funcionalidad
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,

                });
                Toast.fire({
                    type: 'success',
                    title: 'Cobro realizado correctamente'
                });
            }
        }
        return validarPago;
    };
};