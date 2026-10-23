// Muestra en detalles.html los datos de un vehículo.

const DetalleVista = {
    mostrar(vehiculo) {
        const imagen = document.getElementById('detailImg');
        imagen.classList.toggle('hidden', !vehiculo.img);
        if (vehiculo.img) imagen.src = vehiculo.img;
        imagen.alt = vehiculo.title;

        document.getElementById('detailTitle').textContent = vehiculo.title;
        document.getElementById('detailCategory').textContent = vehiculo.category;
        document.getElementById('detailStatus').textContent = vehiculo.status;
        document.getElementById('detailPrice').textContent = Formato.precio(vehiculo.price);
        document.getElementById('detailContact').textContent = vehiculo.contact;
        document.getElementById('btnEditDetail').href = `editar.html?id=${vehiculo.id}`;
    },

    mostrarNoEncontrado() {
        document.getElementById('detailImg').classList.add('hidden');
        document.getElementById('detailTitle').textContent = 'Vehículo no encontrado';
    }
};