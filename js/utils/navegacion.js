// Moverse entre páginas y leer la URL.

const Navegacion = {
    // detalles.html?id=car_123  ->  "car_123"
    obtenerIdDeLaUrl() {
        return new URLSearchParams(window.location.search).get('id');
    },

    irAlCatalogo() {
        window.location.href = 'index.html';
    }
};