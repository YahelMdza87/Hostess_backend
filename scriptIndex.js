
//DOMContentLoaded es para que se reciban lo que vamos a obtener cuando ya están cargados completamente
document.addEventListener('DOMContentLoaded', function () {
    fetchMenuPlatillos();
    const tdCategorias = document.querySelectorAll('#categorias_slider td');
    tdCategorias.forEach(function(cell) {
        cell.addEventListener('click', function() {
            resetEstiloCategorias(); 
            cell.classList.add('selected'); 
            const idCategoria = this.id; 
            console.log(idCategoria); 
            if(idCategoria==1){
                fetchMenuPlatillos();
            }
            else if(idCategoria==2){
                mostrarFormulario(1);
            }
        });
    });
});
function resetEstiloCategorias() {
    const tdCategorias = document.querySelectorAll('#categorias_slider td');
    tdCategorias.forEach(function(cell) {
        cell.classList.remove('selected');
    });
}
function fetchMenuPlatillos() {
    const section_menu = document.getElementById('menu');
    section_menu.innerHTML = '';
    fetch(`http://localhost:3000/platillos`) 
        .then(response => response.json()) 
        .then(data => { 
            const section_menu = document.getElementById('menu');
            section_menu.innerHTML = '';
            console.log(data);
             data.forEach(plat => {
                const platillo = document.createElement('div');
                platillo.classList.add('platillo_menu');

                const nombre_Platillo = document.createElement('h3');
                nombre_Platillo.textContent = plat.Nombre;
                nombre_Platillo.classList.add('nombre_platillo');

                const descripcion_Platillo = document.createElement('p');
                descripcion_Platillo.textContent = plat.Descripcion;
                descripcion_Platillo.classList.add('descripcion');

                const precio_Platillo = document.createElement('p');
                precio_Platillo.textContent = `$${plat.Precio_producto}`;
                precio_Platillo.classList.add('precio');

                const boton_editar = document.createElement('img');
                boton_editar.src = "/imagenes/editar.png"
                boton_editar.classList.add('editar');
                boton_editar.addEventListener('click', function(){
                    mostrarFormulario(plat._id);
                })

                const boton_eliminar = document.createElement('img');
                boton_eliminar.src="/imagenes/eliminar.png";
                boton_eliminar.classList.add('imagen');
                boton_eliminar.addEventListener('click', function(){
                    console.log(plat._id)
                    eliminarPlatillos(plat._id);
                })

                // Agrega los elementos al contenedor del menú
                platillo.appendChild(nombre_Platillo);
                platillo.appendChild(descripcion_Platillo);
                platillo.appendChild(precio_Platillo);
                platillo.appendChild(boton_editar);
                platillo.appendChild(boton_eliminar);
                section_menu.appendChild(platillo);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function agregarPlatillos(nuevoPlatillo){
    console.log(nuevoPlatillo);
    fetch('http://localhost:3000/platillos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoPlatillo)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Platillo agregado:', data);
        // Después de agregar el platillo, actualiza la lista de platillos
        document.getElementById('formulario').reset();
        fetchMenuPlatillos();
        resetEstiloCategorias(); 
        // Limpiar el formulario después de agregar
    })
    .catch(error => {
        console.error('Error al agregar platillo:', error);
    });
}

function editarPlatillos(platillo){
    const platillo_oficial = {
            Nombre: platillo.Nombre,
            Descripcion: platillo.Descripcion,
            Precio_producto: platillo.Precio_producto
        }
    console.log(platillo._id);
    const section_menu = document.getElementById('menu');
    fetch(`http://localhost:3000/platillos/${platillo._id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(platillo_oficial)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Platillo eliminado:', data);
        // Después de eliminar el platillo, actualiza la lista de platillos
        fetchMenuPlatillos();
        resetEstiloCategorias(); 
    })
    .catch(error => {
        console.error('Error al eliminar platillo:', error);
    });
}

function eliminarPlatillos(id){
    const section_menu = document.getElementById('menu');
    section_menu.innerHTML = '';
    // Enviar solicitud al servidor para eliminar el platillo
    fetch(`http://localhost:3000/platillos/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Platillo eliminado:', data);
        // Después de eliminar el platillo, actualiza la lista de platillos
        fetchMenuPlatillos();
        resetEstiloCategorias(); 
    })
    .catch(error => {
        console.error('Error al eliminar platillo:', error);
    });
}


function mostrarFormulario(operacion){
    const section_menu = document.getElementById('menu');
    section_menu.innerHTML = '';
    const div_formulario = document.createElement('div');
    const formulario = document.createElement('form');

    formulario.setAttribute("id", "formulario");
    formulario.classList.add('platillo_menu')

    const inputNombre = document.createElement('input');
    inputNombre.setAttribute("type", "text");
    inputNombre.setAttribute("id", "nombre");
    inputNombre.setAttribute("required", "");
    inputNombre.classList.add('nombre_platillo');
    inputNombre.setAttribute("placeholder", "Platillo...")

    const inputDescripcion = document.createElement('textarea');
    inputDescripcion.setAttribute("type", "text");
    inputDescripcion.setAttribute("id", "descripcion");
    inputDescripcion.setAttribute("required", "");
    inputDescripcion.classList.add('descripcion')
    inputDescripcion.setAttribute("placeholder", "Descripcion...")

    const inputPrecio = document.createElement('input');
    inputPrecio.setAttribute("type", "number");
    inputPrecio.setAttribute("id", "precio");
    inputPrecio.setAttribute("required", "");
    inputPrecio.setAttribute("placeholder", "$Precio")
    inputPrecio.classList.add('precio');

    const botonAgregar = document.createElement('button');
    botonAgregar.classList.add('boton_formulario')
    if (operacion==1){
        botonAgregar.setAttribute("type", "button");
        botonAgregar.innerHTML="Agregar";
        botonAgregar.addEventListener('click', function() {

        if (!inputNombre.value || !inputDescripcion.value || !inputPrecio.value) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        const nuevoPlatillo = {
            Nombre: inputNombre.value,
            Descripcion: inputDescripcion.value,
            Precio_producto: inputPrecio.value
        };

            agregarPlatillos(nuevoPlatillo);
        });
    }
    else{
        resetEstiloCategorias();
        section_menu.innerHTML = '';
        var id;
        fetch(`http://localhost:3000/platillos//${operacion}`) 
        .then(response => response.json()) 
        .then(platillo => {
                console.log('_______', platillo);
                id=platillo._id;
                inputNombre.value=platillo.Nombre;
                inputDescripcion.value=platillo.Descripcion;
                inputPrecio.value=platillo.Precio_producto;
        });
       
        botonAgregar.setAttribute("type", "button");
        botonAgregar.innerHTML="Actualizar";
        botonAgregar.addEventListener('click', function() {
        if (!inputNombre.value || !inputDescripcion.value || !inputPrecio.value) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        const nuevoPlatillo = {
            _id: id,
            Nombre: inputNombre.value,
            Descripcion: inputDescripcion.value,
            Precio_producto: inputPrecio.value
        };

            editarPlatillos(nuevoPlatillo);
        });
    }
    formulario.appendChild(inputNombre);
    formulario.appendChild(inputDescripcion);
    formulario.appendChild(inputPrecio);
    div_formulario.appendChild(formulario);
    div_formulario.appendChild(botonAgregar);
    section_menu.appendChild(div_formulario);
}
