var buttonGenerales = document.getElementById('btnCalcularGenerales');
var buttonUsuario = document.getElementById('btnCalcularUsuario');
var selectFiltro = document.getElementById('selectTipoBusqueda');
var mensaje = document.getElementById('mensaje');
var resultTable = document.getElementById('resultTable');
var statusTableBody = document.getElementById('statusTableBody'); // Cambiado a statusTableBody

buttonGenerales.addEventListener('click', function() {
    procesarFormulario('generales');
});

buttonUsuario.addEventListener('click', function() {
    console.log('FILTRO', selectFiltro.value);
    procesarFormulario(selectFiltro.value);
});

function procesarFormulario(filtroTipo) {
    console.log("botón funcional");

    var Fecha = document.getElementById("Fecha").value;
    const Valor = document.getElementById("valor").value;
    recibirDatos(Valor, filtroTipo, Fecha);
}

function recibirDatos(Valor, filtroTipo) {
    console.log("Recibiendo datos");
    console.log("no me mates mirka", filtroTipo);
    axios.get('http://localhost:3000/Historial', {
        params: {
            valor: Valor,
            filtroTipo: filtroTipo // Enviar filtroTipo al servidor
        },
    })
    .then(function(res) {
        console.log("Respuesta", res);
        if (res.status === 200) {
            // Procesar datos y actualizar la tabla
            actualizarTabla(res.data);
        }
    })
    .catch(function(err) {
        console.error(err);
        alert('No se encontraron datos');
    });
}

function actualizarTabla(data) {
    // Mostrar la tabla
    resultTable.style.display = 'table';

    // Limpiar el cuerpo de la tabla
    statusTableBody.innerHTML = '';

    if (data.length > 0) {
        // Iterar sobre los datos y agregar filas a la tabla
        data.forEach(item => {
            const row = document.createElement('tr');

            const fields = [
                'usuario', 'cliente', 'direccion', 'fecha_instalacion',
                'telefono', 'movil', 'email', 'notas'
            ];

            fields.forEach(field => {
                const cell = document.createElement('td');
                cell.textContent = item[field] || ''; // Manejo de valores nulos
                row.appendChild(cell);
            });

            statusTableBody.appendChild(row);
        });
        mensaje.textContent = ''; // Limpiar el mensaje si hay datos
    } else {
        mensaje.textContent = 'No se encontraron datos.';
    }
}
