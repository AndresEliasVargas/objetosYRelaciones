'use strict';

const cobrar = (pnombreEmpresa, pnuevoCliente) => {
    pnombreEmpresa.cobrarACliente(pnuevoCliente);
    actualizarTabla();
};

const eliminar = (pnombreEmpresa, pnuevoCliente) => {
    pnombreEmpresa.eliminarCliente(pnuevoCliente);
    actualizarTabla();
};