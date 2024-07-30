var buttonGenerales = document.getElementById('btnCalcularGenerales');
var buttonUsuario = document.getElementById('btnCalcularUsuario');
var selectFiltro = document.getElementById('selectTipoBusqueda');
var mensaje = document.getElementById('mensaje');

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

function recibirDatos(Valor, filtroTipo, Fecha) {
    console.log("Recibiendo datos");
    console.log("no me mates mirka", filtroTipo);
    
    axios.get('http://localhost:3000/Historial', {
        params: {
            valor: Valor,
            filtroTipo: filtroTipo, // Enviar filtroTipo al servidor
            fecha: Fecha // Enviar Fecha al servidor
        },
    })
    .then(function(res) {
        console.log("Respuesta", res);
        if (res.status === 200) {
            // Asignar los datos a localStorage si es necesario
            localStorage.setItem("auth", Valor);

            // Mostrar mensaje con los datos recibidos
            mensaje.innerText = 'Datos recibidos: ' + JSON.stringify(res.data);

            // Limpiar la tabla antes de insertar nuevos datos
            const resultTableBody = document.getElementById('resultTable').querySelector('tbody');
            resultTableBody.innerHTML = ''; 

            // Guardar los datos en un array para su manipulación
            const dataArray = res.data; // Suponiendo que `res.data` es el array de datos

            dataArray.forEach(venta => {
                // Crear una fila para la tabla
                const row = document.createElement('tr');

                // Crear y agregar celdas a la fila
                const cells = [
                    venta.usuario,
                    venta.cliente,
                    venta.direccion,
                    venta.fecha_instalacion,
                    venta.telefono,
                    venta.movil,
                    venta.correo,
                    venta.hora_instalacion,
                    venta.notas
                ];

                cells.forEach(cellData => {
                    const cell = document.createElement('td');
                    cell.innerText = cellData || ''; // Manejar valores nulos o indefinidos
                    row.appendChild(cell);
                });

                // Añadir la fila a la tabla
                resultTableBody.appendChild(row);
            });

            // Verificar el contenido del array en la consola
            console.log('Data array:', dataArray);

        } else {
            mensaje.innerText = 'No se recibieron datos.';
        }
    })
    .catch(function(err) {
        console.error('Error al recibir los datos:', err);
        mensaje.innerText = 'No se encontraron datos';
    });
}
