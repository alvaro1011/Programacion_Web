// Lo que tienen en común publicar y editar: vista previa de la foto,
// validar, guardar y volver al catálogo.
// Lo que cambia (crear o actualizar) llega en la función "guardar".

const FormularioControlador = {
    imagenActual: '',                 // foto que ya tenía el vehículo (al editar)
    imagenNueva: null,                // foto recién elegida, ya reducida
    imagenPendiente: Promise.resolve(), // para esperar si la foto aún se está procesando

    iniciar(guardar, vehiculo = null) {
        FormularioVista.llenarListas();

        if (vehiculo) {
            FormularioVista.llenar(vehiculo);
            FormularioControlador.imagenActual = vehiculo.img;
        }
        FormularioVista.mostrarVistaPrevia(FormularioControlador.imagenActual);

        FormularioVista.alElegirImagen(FormularioControlador.manejarCambioImagen);
        FormularioVista.alEnviar(evento => FormularioControlador.manejarEnvio(evento, guardar));
    },

    manejarCambioImagen(archivo) {
        FormularioControlador.imagenPendiente = FormularioControlador.procesarImagen(archivo);
    },

    async procesarImagen(archivo) {
        FormularioVista.mostrarErrorImagen('');

        if (!archivo) { // el usuario quitó la selección: se vuelve a la foto anterior
            FormularioControlador.imagenNueva = null;
            FormularioVista.mostrarVistaPrevia(FormularioControlador.imagenActual);
            return;
        }

        try {
            FormularioControlador.imagenNueva = await Imagenes.comprimir(archivo);
            FormularioVista.mostrarVistaPrevia(FormularioControlador.imagenNueva);
        } catch (error) {
            FormularioControlador.imagenNueva = null;
            FormularioVista.mostrarVistaPrevia(FormularioControlador.imagenActual);
            FormularioVista.mostrarErrorImagen('El archivo no es una imagen válida.');
        }
    },

    async manejarEnvio(evento, guardar) {
        evento.preventDefault();

        const datos = FormularioVista.leer();
        const errores = Validacion.obtenerErrores(datos);
        FormularioVista.mostrarErrores(errores);
        if (errores.length > 0) return;

        await FormularioControlador.imagenPendiente;

        if (guardar(datos, FormularioControlador.imagenNueva)) {
            Navegacion.irAlCatalogo();
        } else {
            alert('No se pudo guardar. Es posible que el almacenamiento esté lleno; prueba con una foto más pequeña.');
        }
    }
};