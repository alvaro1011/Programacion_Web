// Coordina detalles.html: busca el vehículo de la URL y se lo pasa a la vista.

const DetalleControlador = {
    iniciar() {
        const vehiculo = VehiculoModelo.buscarPorId(Navegacion.obtenerIdDeLaUrl());
        if (vehiculo) {
            DetalleVista.mostrar(vehiculo);
        } else {
            DetalleVista.mostrarNoEncontrado();
        }
    }
};

document.addEventListener('DOMContentLoaded', DetalleControlador.iniciar);