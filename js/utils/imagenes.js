// Lee la foto elegida y la reduce de tamaño.
// Las fotos se guardan como texto (base64) en localStorage, que tiene
// un límite de ~5 MB. Reducirlas evita que se llene con pocas fotos.

const Imagenes = {
    ANCHO_MAXIMO: 800,
    CALIDAD_JPEG: 0.7,

    leerArchivoComoTexto(archivo) {
        return new Promise((resolve, reject) => {
            const lector = new FileReader();
            lector.onload = () => resolve(lector.result);
            lector.onerror = () => reject(lector.error);
            lector.readAsDataURL(archivo);
        });
    },

    cargar(origen) {
        return new Promise((resolve, reject) => {
            const imagen = new Image();
            imagen.onload = () => resolve(imagen);
            imagen.onerror = reject;
            imagen.src = origen;
        });
    },

    // Recibe un archivo y devuelve la imagen reducida como texto (data URL).
    async comprimir(archivo) {
        const origen = await Imagenes.leerArchivoComoTexto(archivo);
        const imagen = await Imagenes.cargar(origen);

        const escala = Math.min(1, Imagenes.ANCHO_MAXIMO / imagen.width);
        const lienzo = document.createElement('canvas');
        lienzo.width = Math.round(imagen.width * escala);
        lienzo.height = Math.round(imagen.height * escala);

        const contexto = lienzo.getContext('2d');
        contexto.fillStyle = '#ffffff'; // fondo blanco para PNG/WEBP con transparencia
        contexto.fillRect(0, 0, lienzo.width, lienzo.height);
        contexto.drawImage(imagen, 0, 0, lienzo.width, lienzo.height);

        return lienzo.toDataURL('image/jpeg', Imagenes.CALIDAD_JPEG);
    }
};