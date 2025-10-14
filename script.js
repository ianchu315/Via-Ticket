// Estado global de la aplicación
let clienteActual = null;
let pedidoActual = [];
let ticketActual = null;

// Lista de productos del festival
const productos = [
    {
        id: 1,
        nombre: "Choripán Clásico",
        descripcion: "Chorizo artesanal en pan francés con chimichurri",
        precio: 850,
        categoria: "Carnes"
    },
    {
        id: 2,
        nombre: "Empanadas Criollas",
        descripcion: "Empanadas de carne, pollo o jamón y queso (x3)",
        precio: 1200,
        categoria: "Tradicional"
    },
    {
        id: 3,
        nombre: "Hamburguesa Gourmet",
        descripcion: "Carne premium con queso, lechuga, tomate y papas",
        precio: 1500,
        categoria: "Carnes"
    },
    {
        id: 4,
        nombre: "Tacos Mexicanos",
        descripcion: "Tacos de carne con guacamole y pico de gallo (x3)",
        precio: 1350,
        categoria: "Internacional"
    },
    {
        id: 5,
        nombre: "Pizza Margherita",
        descripcion: "Pizza individual con mozzarella, tomate y albahaca",
        precio: 1100,
        categoria: "Internacional"
    },
    {
        id: 6,
        nombre: "Locro Tradicional",
        descripcion: "Guiso típico argentino con maíz, zapallo y carne",
        precio: 950,
        categoria: "Tradicional"
    },
    {
        id: 7,
        nombre: "Milanesa Napolitana",
        descripcion: "Milanesa con jamón, queso y salsa de tomate",
        precio: 1400,
        categoria: "Tradicional"
    },
    {
        id: 8,
        nombre: "Sushi Variado",
        descripcion: "Combinado de rolls y piezas surtidas (x8)",
        precio: 1800,
        categoria: "Internacional"
    },
    {
        id: 9,
        nombre: "Parrillada Mini",
        descripcion: "Asado, chorizo, morcilla y ensalada",
        precio: 2200,
        categoria: "Carnes"
    },
    {
        id: 10,
        nombre: "Helado Artesanal",
        descripcion: "Helado premium de dulce de leche o chocolate (2 bochas)",
        precio: 600,
        categoria: "Postres"
    },
    {
        id: 11,
        nombre: "Agua Mineral",
        descripcion: "Botella de 500ml",
        precio: 300,
        categoria: "Bebidas"
    },
    {
        id: 12,
        nombre: "Gaseosa",
        descripcion: "Coca Cola, Sprite o Fanta 500ml",
        precio: 450,
        categoria: "Bebidas"
    }
];

// Funciones de validación
function validarNombre(nombre) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,30}$/;
    return regex.test(nombre.trim());
}

function validarDNI(dni) {
    const regex = /^\d{7,8}$/;
    return regex.test(dni.replace(/\D/g, ''));
}

function validarCelular(celular) {
    // Acepta formatos: +54 9 11 1234-5678, 11 1234 5678, 1112345678, etc.
    const regex = /^(\+54\s?9?\s?)?(\(?\d{2,4}\)?[\s\-]?)?\d{4}[\s\-]?\d{4}$/;
    return regex.test(celular.trim());
}

// Funciones de manejo de errores
function mostrarError(campo, mensaje) {
    const errorElement = document.getElementById(`error-${campo}`);
    errorElement.textContent = mensaje;
    errorElement.style.display = 'block';
}

function limpiarError(campo) {
    const errorElement = document.getElementById(`error-${campo}`);
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

function limpiarTodosLosErrores() {
    const campos = ['nombre', 'apellido', 'dni', 'celular'];
    campos.forEach(campo => limpiarError(campo));
}

// Funciones de navegación entre secciones
function mostrarSeccion(seccionId) {
    const secciones = document.querySelectorAll('.section');
    secciones.forEach(seccion => {
        seccion.classList.add('hidden');
    });
    
    const seccionActiva = document.getElementById(seccionId);
    if (seccionActiva) {
        seccionActiva.classList.remove('hidden');
    }
}

// Función para generar ID único de ticket
function generarTicketId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `TKT-${timestamp}-${random}`;
}

// Función para formatear fecha
function formatearFecha(fecha) {
    return fecha.toLocaleString('es-AR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// Función para calcular fecha de expiración (3 horas)
function calcularExpiracion() {
    const ahora = new Date();
    return new Date(ahora.getTime() + (3 * 60 * 60 * 1000)); // 3 horas en milisegundos
}

// Función para verificar si un ticket está expirado
function ticketExpirado(fechaExpiracion) {
    return new Date() > new Date(fechaExpiracion);
}

// Función para cargar productos en el DOM
function cargarProductos() {
    const productosLista = document.getElementById('productos-lista');
    productosLista.innerHTML = '';
    
    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto-item';
        productoDiv.innerHTML = `
            <div class="producto-header">
                <div class="producto-nombre">${producto.nombre}</div>
                <div class="producto-precio">$${producto.precio}</div>
            </div>
            <div class="producto-descripcion">${producto.descripcion}</div>
            <div class="cantidad-control">
                <button type="button" class="cantidad-btn" onclick="cambiarCantidad(${producto.id}, -1)">−</button>
                <label for="cantidad-${producto.id}">Cantidad:</label>
                <input type="number" id="cantidad-${producto.id}" min="0" max="10" value="0" 
                       onchange="actualizarTotal()" readonly>
                <button type="button" class="cantidad-btn" onclick="cambiarCantidad(${producto.id}, 1)">+</button>
            </div>
        `;
        productosLista.appendChild(productoDiv);
    });
}

// Función para cambiar cantidad de productos
function cambiarCantidad(productoId, cambio) {
    const input = document.getElementById(`cantidad-${productoId}`);
    let cantidadActual = parseInt(input.value) || 0;
    let nuevaCantidad = cantidadActual + cambio;
    
    if (nuevaCantidad < 0) nuevaCantidad = 0;
    if (nuevaCantidad > 10) nuevaCantidad = 10;
    
    input.value = nuevaCantidad;
    actualizarTotal();
}

// Función para actualizar el total del pedido
function actualizarTotal() {
    let total = 0;
    let hayProductos = false;
    
    productos.forEach(producto => {
        const cantidad = parseInt(document.getElementById(`cantidad-${producto.id}`).value) || 0;
        if (cantidad > 0) {
            total += producto.precio * cantidad;
            hayProductos = true;
        }
    });
    
    document.getElementById('total-precio').textContent = total;
    document.getElementById('generar-ticket-btn').disabled = !hayProductos;
}

// Función para obtener productos del pedido actual
function obtenerProductosPedido() {
    const pedido = [];
    productos.forEach(producto => {
        const cantidad = parseInt(document.getElementById(`cantidad-${producto.id}`).value) || 0;
        if (cantidad > 0) {
            pedido.push({
                ...producto,
                cantidad: cantidad,
                subtotal: producto.precio * cantidad
            });
        }
    });
    return pedido;
}

// Función para generar el ticket
function generarTicket(cliente, pedido) {
    const ticketId = generarTicketId();
    const fechaCreacion = new Date();
    const fechaExpiracion = calcularExpiracion();
    const total = pedido.reduce((sum, item) => sum + item.subtotal, 0);
    
    const ticket = {
        id: ticketId,
        cliente: cliente,
        pedido: pedido,
        total: total,
        fechaCreacion: fechaCreacion.toISOString(),
        fechaExpiracion: fechaExpiracion.toISOString(),
        estado: 'activo'
    };
    
    return ticket;
}

// Función para mostrar el ticket en el DOM
function mostrarTicket(ticket) {
    const ticketContainer = document.getElementById('ticket-container');
    const fechaCreacion = new Date(ticket.fechaCreacion);
    const fechaExpiracion = new Date(ticket.fechaExpiracion);
    
    let productosHTML = '';
    ticket.pedido.forEach(item => {
        productosHTML += `
            <div class="ticket-item">
                <span>${item.cantidad}x ${item.nombre}</span>
                <span>$${item.subtotal}</span>
            </div>
        `;
    });
    
    ticketContainer.innerHTML = `
        <div class="ticket">
            <div class="ticket-header">
                <h3>🎪 Festival de Comida</h3>
                <div class="ticket-numero">Ticket #${ticket.id}</div>
            </div>
            
            <div class="ticket-cliente">
                <h4>Datos del Cliente:</h4>
                <p><strong>Nombre:</strong> ${ticket.cliente.nombre} ${ticket.cliente.apellido}</p>
                <p><strong>DNI:</strong> ${ticket.cliente.dni}</p>
                <p><strong>Celular:</strong> ${ticket.cliente.celular}</p>
            </div>
            
            <div class="ticket-productos">
                <h4>Pedido:</h4>
                ${productosHTML}
            </div>
            
            <div class="ticket-total">
                <h3>Total: $${ticket.total}</h3>
            </div>
            
            <div class="ticket-expira">
                <strong>⏰ Válido hasta:</strong><br>
                ${formatearFecha(fechaExpiracion)}
            </div>
            
            <div class="ticket-footer">
                <p>Generado el: ${formatearFecha(fechaCreacion)}</p>
                <p>¡Gracias por tu pedido!</p>
                <p>Presenta este ticket en el carrito correspondiente</p>
            </div>
        </div>
    `;
}

// Función para guardar en localStorage
function guardarEnStorage(clave, datos) {
    try {
        localStorage.setItem(clave, JSON.stringify(datos));
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
    }
}

// Función para cargar de localStorage
function cargarDeStorage(clave) {
    try {
        const datos = localStorage.getItem(clave);
        return datos ? JSON.parse(datos) : null;
    } catch (error) {
        console.error('Error al cargar de localStorage:', error);
        return null;
    }
}

// Función para verificar ticket existente al cargar la página
function verificarTicketExistente() {
    const ticketGuardado = cargarDeStorage('ticketActual');
    
    if (ticketGuardado) {
        if (ticketExpirado(ticketGuardado.fechaExpiracion)) {
            // Ticket expirado
            localStorage.removeItem('ticketActual');
            localStorage.removeItem('clienteActual');
            mostrarSeccion('expired-section');
            return;
        } else {
            // Ticket válido
            ticketActual = ticketGuardado;
            clienteActual = ticketGuardado.cliente;
            mostrarTicket(ticketActual);
            mostrarSeccion('ticket-section');
            return;
        }
    }
    
    // No hay ticket, mostrar registro
    mostrarSeccion('registro-section');
}

// Función para limpiar todo el almacenamiento
function limpiarAlmacenamiento() {
    localStorage.removeItem('ticketActual');
    localStorage.removeItem('clienteActual');
    clienteActual = null;
    ticketActual = null;
    pedidoActual = [];
}

// Función para resetear formularios
function resetearFormularios() {
    document.getElementById('registro-form').reset();
    productos.forEach(producto => {
        document.getElementById(`cantidad-${producto.id}`).value = '0';
    });
    actualizarTotal();
    limpiarTodosLosErrores();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Verificar ticket existente al cargar
    verificarTicketExistente();
    
    // Cargar productos
    cargarProductos();
    
    // Formulario de registro
    document.getElementById('registro-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        limpiarTodosLosErrores();
        let formularioValido = true;
        
        // Obtener valores
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const dni = document.getElementById('dni').value.trim();
        const celular = document.getElementById('celular').value.trim();
        
        // Validaciones
        if (!validarNombre(nombre)) {
            mostrarError('nombre', 'El nombre debe tener entre 2 y 30 caracteres y solo contener letras');
            formularioValido = false;
        }
        
        if (!validarNombre(apellido)) {
            mostrarError('apellido', 'El apellido debe tener entre 2 y 30 caracteres y solo contener letras');
            formularioValido = false;
        }
        
        if (!validarDNI(dni)) {
            mostrarError('dni', 'El DNI debe tener 7 u 8 dígitos');
            formularioValido = false;
        }
        
        if (!validarCelular(celular)) {
            mostrarError('celular', 'Ingresa un número de celular válido (ej: 11 1234 5678)');
            formularioValido = false;
        }
        
        if (formularioValido) {
            clienteActual = { nombre, apellido, dni, celular };
            guardarEnStorage('clienteActual', clienteActual);
            mostrarSeccion('productos-section');
        }
    });
    
    // Formulario de productos
    document.getElementById('productos-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        pedidoActual = obtenerProductosPedido();
        if (pedidoActual.length > 0) {
            ticketActual = generarTicket(clienteActual, pedidoActual);
            guardarEnStorage('ticketActual', ticketActual);
            mostrarTicket(ticketActual);
            mostrarSeccion('ticket-section');
        }
    });
    
    // Botón volver al registro
    document.getElementById('volver-registro').addEventListener('click', function() {
        mostrarSeccion('registro-section');
    });
    
    // Botón nuevo pedido
    document.getElementById('nuevo-pedido').addEventListener('click', function() {
        limpiarAlmacenamiento();
        resetearFormularios();
        mostrarSeccion('registro-section');
    });
    
    // Botón restart pedido (desde expired)
    document.getElementById('restart-pedido').addEventListener('click', function() {
        limpiarAlmacenamiento();
        resetearFormularios();
        mostrarSeccion('registro-section');
    });
    
    // Verificar expiración cada minuto
    setInterval(function() {
        if (ticketActual && ticketExpirado(ticketActual.fechaExpiracion)) {
            limpiarAlmacenamiento();
            mostrarSeccion('expired-section');
        }
    }, 60000); // Verificar cada minuto
});