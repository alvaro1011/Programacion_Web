// Lo que se lee y se dibuja en los formularios de publicar.html y editar.html:
// campos, mensajes de error y vista previa de la foto.

const FormularioVista = {
    CAMPOS: ['title', 'category', 'price', 'status', 'contact'],

    // 'title' -> 'vehicleTitle' (el id del input en el HTML)
    idDeCampo(campo) {
        return 'vehicle' + campo.charAt(0).toUpperCase() + campo.slice(1);
    },

    // Llena los desplegables con las listas del modelo.
    llenarListas() {
        Dom.agregarOpciones(document.getElementById('vehicleCategory'), VehiculoModelo.CATEGORIAS);
        Dom.agregarOpciones(document.getElementById('vehicleStatus'), VehiculoModelo.ESTADOS);
    },

    leer() {
        const datos = {};
        FormularioVista.CAMPOS.forEach(campo => {
            datos[campo] = document.getElementById(FormularioVista.idDeCampo(campo)).value;
        });
        return datos;
    },

    llenar(vehiculo) {
        FormularioVista.CAMPOS.forEach(campo => {
            const valor = campo === 'price' ? Formato.precioANumero(vehiculo.price) : vehiculo[campo];
            document.getElementById(FormularioVista.idDeCampo(campo)).value = valor;
        });
    },

    // Errores

    marcarCampo(campo, mensaje) {
        const entrada = document.getElementById(FormularioVista.idDeCampo(campo));
        const textoError = entrada.parentElement.querySelector('.error-message');
        entrada.classList.toggle('input-error', mensaje !== '');
        if (textoError) textoError.textContent = mensaje;
    },

    mostrarErrores(errores) {
        FormularioVista.CAMPOS.forEach(campo => FormularioVista.marcarCampo(campo, ''));
        errores.forEach(error => FormularioVista.marcarCampo(error.campo, error.mensaje));
    },

    mostrarErrorImagen(mensaje) {
        document.getElementById('imageError').textContent = mensaje;
    },

    // Foto

    // Muestra la foto elegida debajo del campo. Sin foto, oculta la vista previa.
    mostrarVistaPrevia(origen) {
        const vistaPrevia = document.getElementById('imagePreview');
        vistaPrevia.classList.toggle('hidden', !origen);
        if (origen) {
            vistaPrevia.src = origen;
        } else {
            vistaPrevia.removeAttribute('src');
        }
    },

    // Avisa con el archivo elegido (o null si el usuario lo quitó).
    alElegirImagen(manejador) {
        document.getElementById('vehicleImage').addEventListener('change', evento => {
            manejador(evento.target.files[0] || null);
        });
    },

    alEnviar(manejador) {
        document.querySelector('form').addEventListener('submit', manejador);
    }
};