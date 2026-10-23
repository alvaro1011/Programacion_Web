// ============================================================
// utils/dom.js — Ayudas para crear elementos HTML desde JavaScript.
// Usa textContent (no innerHTML) para que lo que escriba el usuario
// nunca se interprete como código HTML.

const Dom = {
    crearElemento(etiqueta, clase, texto = '') {
        const elemento = document.createElement(etiqueta);
        if (clase) elemento.className = clase;
        elemento.textContent = texto;
        return elemento;
    },

    // Agrega una <option> por cada valor de la lista.
    agregarOpciones(select, valores) {
        valores.forEach(valor => {
            const opcion = document.createElement('option');
            opcion.value = valor;
            opcion.textContent = valor;
            select.appendChild(opcion);
        });
    }
};