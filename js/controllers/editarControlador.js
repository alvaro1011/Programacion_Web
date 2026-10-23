// Coordina editar.html: carga el vehículo de la URL en el formulario
// y al guardar ACTUALIZA ese vehículo.

const EditarControlador = {
    iniciar() {
        const id = Navegacion.obtenerIdDeLaUrl();
        const vehiculo = VehiculoModelo.buscarPorId(id);
        if (!vehiculo) {
            Navegacion.irAlCatalogo();
            return;
        }

        FormularioControlador.iniciar((datos, imagen) => VehiculoModelo.actualizar(id, datos, imagen), vehiculo);
    }
};

document.addEventListener('DOMContentLoaded', EditarControlador.iniciar);