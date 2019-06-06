'use strict';

//Permite agregar los clientes al Objeto Cliente
const agregarCliente = (paCliente) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        
    });

    Toast.fire({
        type: 'success',
        title: 'Cliente almacenado correctamente'
    })

    //Colocar el comando para agregar a la Class Cliente los datos
    
    console.log(paCliente);
    //return paCliente;
};