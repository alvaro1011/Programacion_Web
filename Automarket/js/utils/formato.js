// Funciones pequeñas para dar formato a textos y números.
// No dependen de la pantalla ni de los datos guardados.

const Formato = {
    // Convierte "$95.000.000" (formato viejo) o 95000000 en el número 95000000.
    precioANumero(precio) {
        return Number(String(precio).replace(/[^0-9]/g, ''));
    },

    // 95000000 -> "$95.000.000"
    precio(precio) {
        return '$' + Formato.precioANumero(precio).toLocaleString('es-CO');
    },

    // Quita tildes y mayúsculas para que "sedan" encuentre "Sedán".
    normalizarTexto(texto) {
        return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
};