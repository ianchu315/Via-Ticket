# 🎪 Festival de Comida - Sistema de Pedidos

Sistema web completo para gestionar pedidos en un festival de comida, con validaciones, generación de tickets únicos y sistema de expiración automática.

## ✨ Características

### 🔐 Validaciones Implementadas
- **Nombre y Apellido**: 2-30 caracteres, solo letras y espacios
- **DNI**: 7-8 dígitos numéricos
- **Celular**: Formatos argentinos (+54 9 11 1234-5678, 11 1234 5678, etc.)

### 🍔 Sistema de Productos
- 12 productos típicos de festival categorizados
- Control de cantidades con botones + y -
- Cálculo automático del total
- Precios actualizados en tiempo real

### 🎫 Sistema de Tickets
- **ID único** para cada ticket (formato: TKT-timestamp-random)
- **Validez de 3 horas** desde la generación
- **Datos del cliente** y detalle completo del pedido
- **Formato imprimible** para presentar en los carritos

### 💾 Persistencia de Datos
- Almacenamiento local (localStorage) del navegador
- Recuperación automática de tickets válidos al recargar
- Limpieza automática de tickets expirados

### ⏰ Sistema de Expiración
- Verificación automática cada minuto
- Notificación clara cuando el ticket expira
- Redirección automática para generar nuevo pedido

## 🚀 Cómo Usar

1. **Abrir la aplicación**: Abre `index.html` en tu navegador web
2. **Registrar datos**: Completa nombre, apellido, DNI y celular
3. **Seleccionar productos**: Usa los botones + y - para elegir cantidades
4. **Generar ticket**: El sistema creará un ticket único válido por 3 horas
5. **Presentar ticket**: Imprime o muestra el ticket en el carrito correspondiente

## 📁 Estructura del Proyecto

```
festival-comida/
├── index.html          # Página principal
├── styles.css          # Estilos y diseño responsivo
├── script.js           # Lógica de la aplicación
└── README.md           # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Diseño moderno con gradientes y animaciones
- **JavaScript**: Lógica de validación, tickets y expiración
- **localStorage**: Persistencia de datos local

## 📱 Características Responsivas

La aplicación está optimizada para:
- 💻 Computadoras de escritorio
- 📱 Tablets y móviles
- 🖨️ Impresión de tickets

## 🔧 Funcionalidades Técnicas

### Validaciones en Tiempo Real
- Mensajes de error específicos para cada campo
- Validación con expresiones regulares
- Feedback visual inmediato

### Gestión de Estado
- Estado global de la aplicación
- Transiciones suaves entre secciones
- Manejo de errores y casos edge

### Seguridad
- Validación tanto en frontend como en el formato de datos
- Sanitización de inputs
- Manejo seguro del localStorage

## 🎨 Diseño

- **Tema**: Festival colorido y festivo
- **Colores**: Gradientes modernos con colores vibrantes
- **Tipografía**: Fuentes legibles y amigables
- **UX**: Interfaz intuitiva con feedback visual claro

## 📊 Productos Disponibles

El sistema incluye 12 productos organizados en categorías:

### 🥩 Carnes
- Choripán Clásico ($850)
- Hamburguesa Gourmet ($1,500)
- Parrillada Mini ($2,200)

### 🥟 Tradicional
- Empanadas Criollas ($1,200)
- Locro Tradicional ($950)
- Milanesa Napolitana ($1,400)

### 🌍 Internacional
- Tacos Mexicanos ($1,350)
- Pizza Margherita ($1,100)
- Sushi Variado ($1,800)

### 🍨 Postres y Bebidas
- Helado Artesanal ($600)
- Agua Mineral ($300)
- Gaseosa ($450)

## ⚡ Instalación y Configuración

No requiere instalación especial:

1. Descarga todos los archivos en una carpeta
2. Abre `index.html` con cualquier navegador moderno
3. ¡Listo para usar!

## 🔄 Flujo de Usuario

1. **Inicio** → Formulario de registro con validaciones
2. **Validación exitosa** → Selección de productos del menú
3. **Productos seleccionados** → Generación automática del ticket
4. **Ticket generado** → Válido por 3 horas, imprimible
5. **Expiración** → Notificación y opción de nuevo pedido

## 💡 Características Especiales

- **Auto-guardado**: Los datos se guardan automáticamente
- **Recuperación inteligente**: Retoma donde lo dejaste
- **Expiración precisa**: Control exacto de tiempo
- **Diseño profesional**: Listo para uso comercial
- **Código limpio**: Fácil de mantener y extender

---

**¡Tu sistema de pedidos para festival de comida está listo para usar!** 🎉