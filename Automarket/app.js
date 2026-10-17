document.addEventListener('DOMContentLoaded', () => {

    const btnOpenRegister = document.getElementById('btnOpenRegister');
    const btnCloseFormModal = document.getElementById('btnCloseFormModal');
    const btnCancelForm = document.getElementById('btnCancelForm');

    const formModal = document.getElementById('formModal');
    const deleteModal = document.getElementById('deleteModal');
    const modalTitle = document.getElementById('modalTitle');

    const vehicleForm = document.getElementById('vehicleForm');
    const vehicleTitle = document.getElementById('vehicleTitle');
    const vehicleCategory = document.getElementById('vehicleCategory');
    const vehiclePrice = document.getElementById('vehiclePrice');
    const vehicleStatus = document.getElementById('vehicleStatus');
    const btnSubmitForm = document.getElementById('btnSubmitForm');

    const titleError = document.getElementById('titleError');
    const categoryError = document.getElementById('categoryError');
    const priceError = document.getElementById('priceError');
    const statusError = document.getElementById('statusError');

    const btnCancelDelete = document.getElementById('btnCancelDelete');
    const btnConfirmDelete = document.getElementById('btnConfirmDelete');
    const deleteTargetText = document.getElementById('deleteTargetText');

    const vehicleCatalog = document.getElementById('vehicleCatalog');
    const searchInput = document.getElementById('searchInput');

    let currentEditingCard = null;
    let cardToDelete = null;

    const openRegisterModal = () => {
        resetForm();
        modalTitle.textContent = "Registro Vehículo";
        btnSubmitForm.textContent = "Publicar vehículo";
        currentEditingCard = null;
        formModal.classList.remove('hidden');
    };

    const closeFormModal = () => {
        formModal.classList.add('hidden');
        resetForm();
    };

    const openDeleteModal = (card, title) => {
        cardToDelete = card;
        deleteTargetText.textContent = title;
        deleteModal.classList.remove('hidden');
    };

    const closeDeleteModal = () => {
        deleteModal.classList.add('hidden');
        cardToDelete = null;
    };

    const resetForm = () => {
        vehicleForm.reset();

        titleError.textContent = '';
        categoryError.textContent = '';
        priceError.textContent = '';
        statusError.textContent = '';

        vehicleTitle.classList.remove('input-error');
        vehicleCategory.classList.remove('input-error');
        vehiclePrice.classList.remove('input-error');
        vehicleStatus.classList.remove('input-error');
    };

    const validateForm = () => {
        let isValid = true;

        if (vehicleTitle.value.trim() === '') {
            titleError.textContent = 'El título del vehículo es obligatorio.';
            vehicleTitle.classList.add('input-error');
            isValid = false;
        } else {
            titleError.textContent = '';
            vehicleTitle.classList.remove('input-error');
        }

        if (vehicleCategory.value === '') {
            categoryError.textContent = 'Debe seleccionar una categoría.';
            vehicleCategory.classList.add('input-error');
            isValid = false;
        } else {
            categoryError.textContent = '';
            vehicleCategory.classList.remove('input-error');
        }

        const priceValue = parseFloat(vehiclePrice.value);
        if (isNaN(priceValue) || priceValue <= 0) {
            priceError.textContent = 'El precio es obligatorio y debe ser mayor a 0.';
            vehiclePrice.classList.add('input-error');
            isValid = false;
        } else {
            priceError.textContent = '';
            vehiclePrice.classList.remove('input-error');
        }

        if (vehicleStatus.value === '') {
            statusError.textContent = 'Debe seleccionar el estado del vehículo.';
            vehicleStatus.classList.add('input-error');
            isValid = false;
        } else {
            statusError.textContent = '';
            vehicleStatus.classList.remove('input-error');
        }

        return isValid;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formattedPrice = '$' + parseInt(vehiclePrice.value).toLocaleString('es-CO');

        if (currentEditingCard) {
            currentEditingCard.querySelector('.card-title').textContent = vehicleTitle.value;
            currentEditingCard.querySelector('.card-info:nth-of-type(1)').innerHTML = `<strong>Categoría:</strong> ${vehicleCategory.value}`;
            currentEditingCard.querySelector('.card-info:nth-of-type(2)').innerHTML = `<strong>Estado:</strong> ${vehicleStatus.value}`;
            currentEditingCard.querySelector('.card-price').textContent = formattedPrice;
        } else {
            const newCard = document.createElement('article');
            newCard.className = 'card';
            newCard.innerHTML = `
                <div class="card-img-container">
                    <img src="https://via.placeholder.com/300x200?text=${encodeURIComponent(vehicleTitle.value)}" alt="${vehicleTitle.value}" class="card-img">
                </div>
                <div class="card-body">
                    <h3 class="card-title">${vehicleTitle.value}</h3>
                    <p class="card-info"><strong>Categoría:</strong> ${vehicleCategory.value}</p>
                    <p class="card-info"><strong>Estado:</strong> ${vehicleStatus.value}</p>
                    <p class="card-price">${formattedPrice}</p>
                    <div class="card-actions">
                        <button class="btn btn-warning btn-edit">Editar</button>
                        <button class="btn btn-danger btn-delete">Eliminar</button>
                    </div>
                </div>
            `;
            vehicleCatalog.appendChild(newCard);
        }

        closeFormModal();
    };

    const setupEditCard = (card) => {
        currentEditingCard = card;

        const title = card.querySelector('.card-title').textContent;
        const categoryText = card.querySelector('.card-info:nth-of-type(1)').textContent.replace('Categoría:', '').trim();
        const statusText = card.querySelector('.card-info:nth-of-type(2)').textContent.replace('Estado:', '').trim();
        const priceText = card.querySelector('.card-price').textContent.replace(/[^0-9]/g, '');

        vehicleTitle.value = title;
        vehicleCategory.value = categoryText;
        vehicleStatus.value = statusText;
        vehiclePrice.value = priceText;

        modalTitle.textContent = "Editar publicación";
        btnSubmitForm.textContent = "Guardar cambios";

        formModal.classList.remove('hidden');
    };

    btnOpenRegister.addEventListener('click', openRegisterModal);
    btnCloseFormModal.addEventListener('click', closeFormModal);
    btnCancelForm.addEventListener('click', closeFormModal);
    btnCancelDelete.addEventListener('click', closeDeleteModal);

    vehicleForm.addEventListener('submit', handleFormSubmit);

    btnConfirmDelete.addEventListener('click', () => {
        if (cardToDelete) {
            cardToDelete.remove();
            closeDeleteModal();
        }
    });

    vehicleCatalog.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        if (!card) return;

        if (e.target.classList.contains('btn-edit')) {
            setupEditCard(card);
        } else if (e.target.classList.contains('btn-delete')) {
            const title = card.querySelector('.card-title').textContent;
            openDeleteModal(card, title);
        }
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const cards = vehicleCatalog.querySelectorAll('.card');

        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const category = card.querySelector('.card-info').textContent.toLowerCase();

            if (title.includes(query) || category.includes(query)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });

});