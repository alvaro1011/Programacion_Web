// ============================================================
// CONTROLADOR — publicarControlador.js
// Coordina publicar.html: el formulario guarda un vehículo NUEVO.
// ============================================================

const PublicarControlador = {
    iniciar() {
        FormularioControlador.iniciar((datos, imagen) => VehiculoModelo.agregar(datos, imagen || ''));
    }
};

document.addEventListener('DOMContentLoaded', PublicarControlador.iniciar);
