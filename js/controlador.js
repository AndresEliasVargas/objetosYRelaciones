'use strict';

//Campos de inputs
const inputNombre = document.querySelector('#nombreTxt');
const inputApellido = document.querySelector('#apellidoTxt');
const inputEmail = document.querySelector('#emailTxt');
const inputFondos = document.querySelector('#fondosTxt');
const inputMensualidad = document.querySelector('#mensualidadTxt');

//botones
const btnAgregar = document.querySelector('#btnAgregar');

//Regular Expressions
const regexSimbolos = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/\\]/;
const regexEmail = /^(([^<>()[\]\.,;:\s@\"ñ#¿¡@´]+(\.[^<>()[\]\.,;:\s@\"ñ#¿¡@´]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"ñ#¿¡@´]+\.)+[^<>()[\]\.,;:\s@\"ñ#¿¡@´]{2,})$/i;
const regexLetras = /^[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+$/;
const regexNumeros = /^([0-9])/;

//Objeto Cliente
const aCliente = [];


//Función que valida los campos
const validarCampos = () => {
    // let sNombre = inputNombre.value;
    // let sApellido = inputApellido.value;
    // let sEmail = inputEmail.value;
    // let nFondos = Number(inputFondos.value);
    // let nMensualidad = Number(inputMensualidad.value);

    let sNombre = 'Andrés';
    let sApellido = 'Vargas';
    let sEmail = 'andreselias.vargas@gmail.com';
    let nFondos = 10;
    let nMensualidad = 10;

    let validarEstado = true;
    let bError = validar(sNombre, sApellido, sEmail, nFondos, nMensualidad);

    //Validadores
    if (bError == true) {
        if (nFondos === 0 || nMensualidad === 0) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'El campo no puede estar vacio o ser igual a 0',
            })
            validarEstado = false;
        } else if (sNombre === '' || sApellido === '' || sEmail === '' || nFondos === '' || nMensualidad === '') {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Los campos no pueden estar vacios',
            })
            validarEstado = false;
        } else if (regexLetras.test(sNombre) === false || regexLetras.test(sApellido) === false) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'El campo no puede contener símbolos o números',
            })
            validarEstado = false;
        } else if (regexNumeros.test(nFondos) === false || regexNumeros.test(nMensualidad) === false) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'El campo no puede contener símbolos',
            })
            validarEstado = false;
        } else if (regexEmail.test(sEmail) === false) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'El email no es valido',
            })
            validarEstado = false;
        };
    };


    //AgregarDatos
    if (validarEstado) { agregarCliente(aCliente) };
};

//Valida los campos que se colocan en rojo
const validar = (psNombre, psApellido, psEmail, pnFondos, pnMensualidad) => {
    let bError = false;

    //Valida Nombre
    if (regexLetras.test(psNombre) == false || psNombre == '' || psNombre == null || psNombre == undefined) {
        bError = true;
        inputNombre.classList.add('border-danger');
    } else {
        inputNombre.classList.remove('border-danger');
    };

    //Valida Apellido
    if (regexLetras.test(psApellido) == false || psApellido == '' || psApellido == null || psApellido == undefined) {
        bError = true;
        inputApellido.classList.add('border-danger');
    } else {
        inputApellido.classList.remove('border-danger');
    };

    //Valida Email
    if (regexEmail.test(psEmail) == false || psEmail == '' || psEmail == null || psEmail == undefined) {
        bError = true;
        inputEmail.classList.add('border-danger');
    } else {
        inputEmail.classList.remove('border-danger');
    };

    //Valida Fondos
    if (regexNumeros.test(pnFondos) == false || pnFondos == '' || pnFondos == null || pnFondos == undefined) {
        bError = true;
        inputFondos.classList.add('border-danger');
    } else {
        inputFondos.classList.remove('border-danger');
    };

    //Valida Mensualidad
    if (regexNumeros.test(pnMensualidad) == false || pnMensualidad == '' || pnMensualidad == null || pnMensualidad == undefined) {
        bError = true;
        inputMensualidad.classList.add('border-danger');
    } else {
        inputMensualidad.classList.remove('border-danger');
    };

    return bError;
}

btnAgregar.addEventListener('click', validarCampos);