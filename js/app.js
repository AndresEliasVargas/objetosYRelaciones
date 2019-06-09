'use strict';

//Campos de inputs
const inputNombre = document.querySelector('#nombreTxt');
const inputApellido = document.querySelector('#apellidoTxt');
const inputEmail = document.querySelector('#emailTxt');
const inputFondos = document.querySelector('#fondosTxt');
const inputMensualidad = document.querySelector('#mensualidadTxt');
const outputTabla = document.querySelector('#tblClientes');

//botones
const btnAgregar = document.querySelector('#btnAgregar');

//Regular Expressions
const regexSimbolos = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/\\]/;
const regexEmail = /^(([^<>()[\]\.,;:\s@\"ñ#¿¡@´]+(\.[^<>()[\]\.,;:\s@\"ñ#¿¡@´]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"ñ#¿¡@´]+\.)+[^<>()[\]\.,;:\s@\"ñ#¿¡@´]{2,})$/i;
const regexLetras = /^[A-Za-zäÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙ]+$/;
const regexNumeros = /^([0-9])/;

//Datos Quemados
const nombreEmpresa = new Empresa('Los Patitos');
const andres = new Cliente('Andrés', 'Vargas', 'andresvargas@lospatitos.com', 300, 45);
const manuel = new Cliente('Manuel', 'Flores', 'manuelFlores@lospatitos.com', 150, 35);
const john = new Cliente('John', 'Doe', 'johndoe@lospatitos.com', 200, 10);

nombreEmpresa.agregarCliente(andres);
nombreEmpresa.agregarCliente(manuel);
nombreEmpresa.agregarCliente(john);

//Función que valida los campos
const validarCampos = () => {
    let sNombre = inputNombre.value;
    let sApellido = inputApellido.value;
    let sEmail = inputEmail.value;
    let nFondos = Number(inputFondos.value);
    let nMensualidad = Number(inputMensualidad.value);
    var nuevoCliente = new Cliente(sNombre, sApellido, sEmail, nFondos, nMensualidad);

    let validarEstado = true;
    let bError = validar(sNombre, sApellido, sEmail, nFondos, nMensualidad);

    //Validadores
    if (bError) {
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
        } else if (nFondos < nMensualidad) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Fondos insuficientes',
            })
            validarEstado = false;
        };
    } else {

        //AgregarDatos
        let estadoDatos = nombreEmpresa.agregarCliente(nuevoCliente);

        if (estadoDatos) {
            limpiarCampos();
            actualizarTabla();
        }
    }
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
    if (regexNumeros.test(pnFondos) == false || pnFondos == '' || pnFondos == null || pnFondos == undefined || pnFondos < pnMensualidad) {
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

//Actualizar Tabla
const actualizarTabla = () => {
    const tbody = document.querySelector('#tblClientes tbody');

    //Limpia la tabla
    for (let i = (outputTabla.rows.length - 1); i > 0; i--) {
        outputTabla.deleteRow(i);
    }

    //Crea el row, las columnas y los botones de la tabla
    for (let i = 0; i < nombreEmpresa.clientes.length; i++) {
        //crea el row
        let fila = tbody.insertRow();

        //crea las celdas
        let celdaNombre = fila.insertCell();
        let celdaApellido = fila.insertCell();
        let celdaEmail = fila.insertCell();
        let celdaFondos = fila.insertCell();
        let celdaMensualidad = fila.insertCell();
        let celdaCobrar = fila.insertCell();
        let celdaEliminarCliente = fila.insertCell();

        //crea los botones
        var btnCobrar = document.createElement('button');
        var btnEliminar = document.createElement('button');

        //Inserta los datos en la celda
        celdaNombre.innerHTML = nombreEmpresa.clientes[i].nombre;
        celdaApellido.innerHTML = nombreEmpresa.clientes[i].apellido;
        celdaEmail.innerHTML = nombreEmpresa.clientes[i].email;
        celdaFondos.innerHTML = nombreEmpresa.clientes[i].fondos;
        celdaMensualidad.innerHTML = nombreEmpresa.clientes[i].mensualidad;

        //Inserta el boton Cobrar
        btnCobrar.setAttribute('id', 'btnCobrar');
        btnCobrar.className = 'btn btn-warning btn-block';
        btnCobrar.innerHTML = 'Cobrar';
        btnCobrar.cliente = nombreEmpresa.clientes[i];
        //Se inicializa el email en un dataset (https://developer.mozilla.org/es/docs/Web/API/HTMLElement/dataset)
        btnCobrar.dataset.email = nombreEmpresa.clientes[i].email;
        celdaCobrar.appendChild(btnCobrar);

        //Inserta el boton Eliminar
        btnEliminar.setAttribute('id', 'btnEliminar');
        btnEliminar.className = 'btn btn-danger btn-block';
        btnEliminar.innerHTML = 'Eliminar';
        btnEliminar.cliente = nombreEmpresa.clientes[i];
        //Se inicializa el email en un dataset (https://developer.mozilla.org/es/docs/Web/API/HTMLElement/dataset)
        btnEliminar.dataset.email = nombreEmpresa.clientes[i].email;
        celdaEliminarCliente.appendChild(btnEliminar);

        if (!nombreEmpresa.clientes[i].validarFondos) {
            fila.classList.add('monto-rojo');
            btnCobrar.disabled = true;
            btnCobrar.classList.add('text-secondary');
        }
    }
};

const limpiarCampos = () => {
    inputNombre.value = '';
    inputApellido.value = '';
    inputEmail.value = '';
    inputFondos.value = '';
    inputMensualidad.value = '';
};

actualizarTabla();

//Eventos de Botones
btnAgregar.addEventListener('click', validarCampos);