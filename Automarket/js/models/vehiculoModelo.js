// Los datos de los vehículos y todo el CRUD.
// No toca el DOM (la pantalla): para guardar y leer usa AlmacenamientoLocal.

const VehiculoModelo = {
    // Listas válidas. Las usan el formulario y los filtros del catálogo.
    CATEGORIAS: ['Camioneta', 'Sedán', 'Hatchback'],
    ESTADOS: ['Nuevo', 'Usado'],

    generarId() {
        return 'car_' + Date.now();
    },

    construir(datos, imagen) {
        return {
            title: datos.title.trim(),
            category: datos.category,
            status: datos.status,
            price: Number(datos.price),
            contact: datos.contact.trim(),
            img: imagen
        };
    },

    // CREATE
    agregar(datos, imagen) {
        const vehiculos = AlmacenamientoLocal.obtener();
        vehiculos.push({ id: VehiculoModelo.generarId(), ...VehiculoModelo.construir(datos, imagen) });
        return AlmacenamientoLocal.guardar(vehiculos);
    },

    // READ
    buscarPorId(id) {
        return AlmacenamientoLocal.obtener().find(vehiculo => vehiculo.id === id);
    },

    // Filtra por texto (nombre o tipo), por tipo y por estado.
    // Un filtro vacío ('') significa "todos".
    filtrar({ texto = '', categoria = '', estado = '' }) {
        const busqueda = Formato.normalizarTexto(texto.trim());
        return AlmacenamientoLocal.obtener().filter(vehiculo =>
            VehiculoModelo.coincideConTexto(vehiculo, busqueda) &&
            (categoria === '' || vehiculo.category === categoria) &&
            (estado === '' || vehiculo.status === estado)
        );
    },

    coincideConTexto(vehiculo, busqueda) {
        return Formato.normalizarTexto(vehiculo.title).includes(busqueda) ||
               Formato.normalizarTexto(vehiculo.category).includes(busqueda);
    },

    // UPDATE
    // Si no se sube una imagen nueva (imagen = null), se conserva la anterior.
    actualizar(id, datos, imagen) {
        const vehiculos = AlmacenamientoLocal.obtener();
        const indice = vehiculos.findIndex(vehiculo => vehiculo.id === id);
        if (indice === -1) return false;

        const actual = vehiculos[indice];
        vehiculos[indice] = { ...actual, ...VehiculoModelo.construir(datos, imagen || actual.img) };
        return AlmacenamientoLocal.guardar(vehiculos);
    },

    // DELETE
    eliminar(id) {
        const vehiculos = AlmacenamientoLocal.obtener().filter(vehiculo => vehiculo.id !== id);
        return AlmacenamientoLocal.guardar(vehiculos);
    }
};