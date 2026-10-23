// ÚNICO archivo que habla con localStorage.
// Si algún día cambias de localStorage a otra cosa, solo tocas este archivo.

const AlmacenamientoLocal = {
    CLAVE_VEHICULOS: 'vehicles',

    obtener() {
        try {
            return JSON.parse(localStorage.getItem(AlmacenamientoLocal.CLAVE_VEHICULOS)) || [];
        } catch (error) {
            return [];
        }
    },

    // Devuelve true si se guardó bien, false si falló (por ejemplo, almacenamiento lleno).
    guardar(vehiculos) {
        try {
            localStorage.setItem(AlmacenamientoLocal.CLAVE_VEHICULOS, JSON.stringify(vehiculos));
            return true;
        } catch (error) {
            return false;
        }
    }
};