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
const regexNumeros = /[0-9]/;
const regexSimbolosNumeros = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/\\0-9]/;
const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

//Objeto Cliente
const aCliente = [];


//Función que valida los campos
const validarCampos = () => {
    let sNombre = inputNombre.value;
    let sApellido = inputApellido.value;
    let sEmail = inputEmail.value;
    let nFondos = Number(inputFondos.value);
    let nMensualidad = Number(inputMensualidad.value);
    let validarEstado = true;

    //Validadores
    if (nFondos === 0 || nMensualidad === 0) {
        alert('El campo no puede estar vacios o ser igual a 0');
        validarEstado = false;
    } else if (sNombre === '' || sApellido === '' || sEmail === '' || nFondos === '' || nMensualidad === '') {
        alert('Los campos no pueden estar vacios');
        validarEstado = false;
    } else if (regexSimbolosNumeros.test(sNombre) === false || regexSimbolosNumeros.test(sApellido) === false) {
        alert('El campo no puede contener símbolos o números');
        validarEstado = false;
    } else if (regexNumeros.test(nFondos) === true || regexNumeros.test(nMensualidad) === true) {
        alert('El campo solo debe contener números');
        validarEstado = false;
    } else if (regexSimbolos.test(nFondos) === false || regexSimbolos.test(nMensualidad) === false) {
        alert('El campo no puede contener símbolos');
        validarEstado = false;
    } else if (regexEmail.test(sEmail) === false) {
        alert('El email no es valido');
        validarEstado = false;
    };


    //AgregarDatos
    validarEstado ? agregarCliente(aCliente) : alert('los datos no fueron agregados, revise los campos marcados');
};


btnAgregar.addEventListener('click', validarCampos);