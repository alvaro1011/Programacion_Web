// Coordina index.html: cuando el usuario escribe, filtra o elimina,
// le pide los datos al MODELO y le dice a la VISTA qué dibujar.

const CatalogoControlador = {
    idAEliminar: null,

    iniciar() {
        CatalogoVista.llenarFiltros();
        CatalogoControlador.refrescar();

        CatalogoVista.alCambiarFiltros(CatalogoControlador.refrescar);
        CatalogoVista.alClickEliminar(CatalogoControlador.pedirConfirmacion);
        CatalogoVista.alCancelarEliminacion(CatalogoControlador.cancelarEliminacion);
        CatalogoVista.alConfirmarEliminacion(CatalogoControlador.confirmarEliminacion);
    },

    refrescar() {
        const filtros = CatalogoVista.leerFiltros();
        const hayFiltros = Object.values(filtros).some(valor => valor.trim() !== '');
        CatalogoVista.renderizar(VehiculoModelo.filtrar(filtros), hayFiltros);
    },

    pedirConfirmacion(id) {
        const vehiculo = VehiculoModelo.buscarPorId(id);
        if (!vehiculo) return;

        CatalogoControlador.idAEliminar = vehiculo.id;
        CatalogoVista.abrirModal(vehiculo.title);
    },

    cancelarEliminacion() {
        CatalogoControlador.idAEliminar = null;
        CatalogoVista.cerrarModal();
    },

    confirmarEliminacion() {
        if (CatalogoControlador.idAEliminar === null) return;

        VehiculoModelo.eliminar(CatalogoControlador.idAEliminar);
        CatalogoControlador.cancelarEliminacion();
        CatalogoControlador.refrescar();
    }
};

document.addEventListener('DOMContentLoaded', CatalogoControlador.iniciar);