// Todo lo que lee o dibuja en index.html: buscador, filtros, tarjetas y modal.
// No guarda ni calcula datos: muestra lo que recibe y avisa al controlador
// cuando el usuario hace algo (escribe, filtra, hace clic en Eliminar...).

const CatalogoVista = {
    // Filtros

    llenarFiltros() {
        Dom.agregarOpciones(document.getElementById('categoryFilter'), VehiculoModelo.CATEGORIAS);
        Dom.agregarOpciones(document.getElementById('statusFilter'), VehiculoModelo.ESTADOS);
    },

    leerFiltros() {
        return {
            texto: document.getElementById('searchInput').value,
            categoria: document.getElementById('categoryFilter').value,
            estado: document.getElementById('statusFilter').value
        };
    },

    alCambiarFiltros(manejador) {
        document.getElementById('searchInput').addEventListener('input', manejador);
        document.getElementById('categoryFilter').addEventListener('change', manejador);
        document.getElementById('statusFilter').addEventListener('change', manejador);
    },

    // Tarjetas

    crearLineaInfo(etiqueta, valor) {
        const linea = Dom.crearElemento('p', 'card-info');
        linea.appendChild(Dom.crearElemento('strong', '', etiqueta + ': '));
        linea.appendChild(document.createTextNode(valor));
        return linea;
    },

    crearImagen(vehiculo) {
        const contenedor = Dom.crearElemento('div', 'card-img-container');
        if (!vehiculo.img) {
            contenedor.appendChild(Dom.crearElemento('div', 'sin-imagen', 'Sin foto'));
            return contenedor;
        }
        const imagen = Dom.crearElemento('img', 'card-img');
        imagen.src = vehiculo.img;
        imagen.alt = vehiculo.title;
        contenedor.appendChild(imagen);
        return contenedor;
    },

    crearEnlace(texto, clase, destino) {
        const enlace = Dom.crearElemento('a', clase, texto);
        enlace.href = destino;
        return enlace;
    },

    crearAcciones(vehiculo) {
        const acciones = Dom.crearElemento('div', 'card-actions');
        const botonEliminar = Dom.crearElemento('button', 'btn btn-danger btn-delete', 'Eliminar');
        botonEliminar.dataset.id = vehiculo.id;

        acciones.appendChild(CatalogoVista.crearEnlace('Ver Detalles', 'btn btn-secondary', `detalles.html?id=${vehiculo.id}`));
        acciones.appendChild(CatalogoVista.crearEnlace('Editar', 'btn btn-warning', `editar.html?id=${vehiculo.id}`));
        acciones.appendChild(botonEliminar);
        return acciones;
    },

    crearTarjeta(vehiculo) {
        const tarjeta = Dom.crearElemento('article', 'card');
        const cuerpo = Dom.crearElemento('div', 'card-body');

        cuerpo.appendChild(Dom.crearElemento('h3', 'card-title', vehiculo.title));
        cuerpo.appendChild(CatalogoVista.crearLineaInfo('Categoría', vehiculo.category));
        cuerpo.appendChild(CatalogoVista.crearLineaInfo('Estado', vehiculo.status));
        cuerpo.appendChild(Dom.crearElemento('p', 'card-price', Formato.precio(vehiculo.price)));
        cuerpo.appendChild(CatalogoVista.crearAcciones(vehiculo));

        tarjeta.appendChild(CatalogoVista.crearImagen(vehiculo));
        tarjeta.appendChild(cuerpo);
        return tarjeta;
    },

    mostrarMensajeVacio(catalogo, hayFiltros) {
        const mensaje = hayFiltros
            ? 'No se encontraron vehículos con esos filtros.'
            : 'No hay vehículos publicados. Agrega uno nuevo desde el botón Publicar.';
        catalogo.appendChild(Dom.crearElemento('p', 'mensaje-vacio', mensaje));
    },

    renderizar(vehiculos, hayFiltros) {
        const catalogo = document.getElementById('vehicleCatalog');
        catalogo.replaceChildren();

        if (vehiculos.length === 0) {
            CatalogoVista.mostrarMensajeVacio(catalogo, hayFiltros);
            return;
        }
        vehiculos.forEach(vehiculo => catalogo.appendChild(CatalogoVista.crearTarjeta(vehiculo)));
    },

    // Avisa con el id del vehículo cuando se hace clic en un botón "Eliminar".
    alClickEliminar(manejador) {
        document.getElementById('vehicleCatalog').addEventListener('click', evento => {
            const boton = evento.target.closest('.btn-delete');
            if (boton) manejador(boton.dataset.id);
        });
    },

    // Modal de eliminación

    abrirModal(nombreVehiculo) {
        document.getElementById('deleteTargetText').textContent = nombreVehiculo;
        document.getElementById('deleteModal').classList.remove('hidden');
    },

    cerrarModal() {
        document.getElementById('deleteModal').classList.add('hidden');
    },

    alCancelarEliminacion(manejador) {
        document.getElementById('btnCancelDelete').addEventListener('click', manejador);
    },

    alConfirmarEliminacion(manejador) {
        document.getElementById('btnConfirmDelete').addEventListener('click', manejador);
    }
};