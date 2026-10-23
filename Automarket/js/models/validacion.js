// Las reglas que debe cumplir un vehículo para poder guardarse.
// Una sola lista de reglas sirve para publicar y para editar (DRY).
// Solo devuelve los errores; mostrarlos en pantalla es trabajo de la vista.

const Validacion = {
    REGLAS: [
        { campo: 'title',    mensaje: 'Escribe el título del vehículo.', esValido: datos => datos.title.trim() !== '' },
        { campo: 'category', mensaje: 'Selecciona una categoría.',       esValido: datos => datos.category !== '' },
        { campo: 'price',    mensaje: 'Ingresa un precio mayor que 0.',  esValido: datos => Number(datos.price) > 0 },
        { campo: 'status',   mensaje: 'Selecciona el estado.',           esValido: datos => datos.status !== '' },
        { campo: 'contact',  mensaje: 'El celular debe tener 10 dígitos y solo números.',  esValido: datos => /^\d{10}$/.test(datos.contact.trim())}
    ],

    obtenerErrores(datos) {
        return Validacion.REGLAS
            .filter(regla => !regla.esValido(datos))
            .map(regla => ({ campo: regla.campo, mensaje: regla.mensaje }));
    }
};