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
const regexSimbolosNumeros = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/\\0-9]/;
const regexEmail = /^(([^<>()[\]\.,;:\s@\"ñ#¿¡@´]+(\.[^<>()[\]\.,;:\s@\"ñ#¿¡@´]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"ñ#¿¡@´]+\.)+[^<>()[\]\.,;:\s@\"ñ#¿¡@´]{2,})$/i;

//Objeto Cliente
const aCliente = [];


//Función que valida los campos
const validarCampos = () => {
    // let sNombre = inputNombre.value;
    // let sApellido = inputApellido.value;
    // let sEmail = inputEmail.value;
    // let nFondos = Number(inputFondos.value);
    // let nMensualidad = Number(inputMensualidad.value);
    let validarEstado = true;

    let sNombre = 'Andrés';
    let sApellido = 'Vargas';
    let sEmail = 'andreselias.vargas@gmail.com';
    let nFondos = 10;
    let nMensualidad = 10;

    //Validadores
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
    } else if (regexSimbolosNumeros.test(sNombre) === true || regexSimbolosNumeros.test(sApellido) === true) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'El campo no puede contener símbolos o números',
        })
        validarEstado = false;
    } else if (regexSimbolos.test(nFondos) === true || regexSimbolos.test(nMensualidad) === true) {
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


    //AgregarDatos
    if (validarEstado) { agregarCliente(aCliente) };
};

btnAgregar.addEventListener('click', validarCampos);