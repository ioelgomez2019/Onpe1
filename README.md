# 📁 PROYECTO ONPE - ESTRUCTURA DE ARCHIVOS

## 🎯 PÁGINAS HTML (3 archivos separados)

### 1. **index.html** - Página de Login/Consulta
- Primera página que ve el usuario
- Formulario para ingresar DNI
- Modal cuando DNI no existe
- Botón para ir a registro

### 2. **registro.html** - Página de Registro
- Formulario completo de registro
- Campos: DNI, nombres, apellidos, región, provincia, distrito, mesa
- Opción de mensaje personalizado (3 opciones)
- Guarda datos en Google Sheets

### 3. **consulta.html** - Página de Resultados
- Muestra información del usuario consultado
- Mensaje personalizado con colores:
  - 🟢 Verde = "SÍ ERES MIEMBRO"
  - 🔴 Rojo = "NO ERES MIEMBRO"
  - 🔵 Azul = Mensajes personalizados
- Temporizador de sesión (78 segundos)
- Botón "Salir" para volver al inicio

---

## 📜 ARCHIVOS JAVASCRIPT (4 archivos)

### 1. **js/config.js** - Configuración Global
- URL de Google Apps Script
- Funciones de API (consultar, registrar)
- Funciones compartidas (animaciones, validaciones)
- Se carga en TODAS las páginas

### 2. **js/index.js** - Lógica de Login
- Manejo del formulario de consulta
- Modal de DNI no encontrado
- Redirección a registro o consulta

### 3. **js/registro.js** - Lógica de Registro
- Manejo del formulario de registro
- Mensajes predefinidos y personalizados
- Guardado en Google Sheets
- Redirección a página de resultados

### 4. **js/consulta.js** - Lógica de Resultados
- Mostrar datos del usuario
- Temporizador de sesión
- Colores según mensaje
- Botón de salida

---

## 🎨 ARCHIVOS DE ESTILO

### **css/style.css**
- Estilos para todas las páginas
- Diseño responsive
- Animaciones de loading
- Modal y formularios

---

## 📋 ARCHIVOS DE CONFIGURACIÓN

### **INSTRUCCIONES.md**
- Guía paso a paso para configurar Google Sheets
- Código de Google Apps Script
- Estructura de columnas
- Pruebas de la API

---

## 📂 ESTRUCTURA DE CARPETAS RECOMENDADA

```
tu-proyecto/
│
├── index.html                    (Página de login)
├── registro.html                 (Página de registro)
├── consulta.html                 (Página de resultados)
├── INSTRUCCIONES.md              (Guía de configuración)
│
├── css/
│   └── style.css                 (Estilos)
│
├── js/
│   ├── config.js                 (Configuración global)
│   ├── index.js                  (Lógica de login)
│   ├── registro.js               (Lógica de registro)
│   └── consulta.js               (Lógica de resultados)
│
└── img/
    ├── logo-eleccion.svg         (Logo ONPE)
    ├── Fondo.svg                 (Fondo ilustración)
    └── onpe.jfif                 (Logo navegador)
```

---

## 🔄 FLUJO DE NAVEGACIÓN

```
1. Usuario entra a index.html
   ↓
2. Ingresa DNI y presiona CONSULTAR
   ↓
3a. DNI EXISTE → consulta.html (muestra resultados)
   ↓
3b. DNI NO EXISTE → Modal → registro.html
   ↓
4. Usuario completa registro
   ↓
5. Datos se guardan en Google Sheets
   ↓
6. Redirige a consulta.html (muestra resultados)
   ↓
7. Usuario presiona SALIR → vuelve a index.html
```

---

## ⚙️ CONFIGURACIÓN INICIAL

### PASO 1: Configura Google Sheets
1. Abre tu Google Sheet
2. Agrega las columnas según INSTRUCCIONES.md
3. Crea el Apps Script
4. Implementa y copia la URL

### PASO 2: Actualiza config.js
1. Abre `js/config.js`
2. Encuentra la línea 6:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'TU_URL_DE_GOOGLE_SCRIPT_AQUI';
   ```
3. Reemplaza con tu URL real

### PASO 3: Sube los archivos
- Sube todos los archivos a tu hosting
- O ábrelos localmente (archivo → abrir)

---

## ✅ VENTAJAS DE ESTA ESTRUCTURA

✅ **Separación de responsabilidades** - Cada página hace una cosa  
✅ **Fácil mantenimiento** - Editar una página no afecta las demás  
✅ **Código limpio** - Cada JS controla solo su página  
✅ **Reutilización** - config.js se usa en todas las páginas  
✅ **Escalable** - Fácil agregar nuevas páginas  

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Error: "TU_URL_DE_GOOGLE_SCRIPT_AQUI"
- Debes configurar la URL en `js/config.js`
- Lee INSTRUCCIONES.md

### No se guardan los datos
- Verifica que Google Apps Script esté bien configurado
- Revisa que la URL esté correcta en config.js
- Prueba la URL directamente en el navegador

### Página en blanco en consulta.html
- Verifica que llegaste desde index.html o registro.html
- No puedes acceder directamente a consulta.html
- Los datos viajan por sessionStorage

---

## 📞 SOPORTE

Si tienes problemas:
1. Revisa INSTRUCCIONES.md
2. Verifica la consola del navegador (F12)
3. Comprueba que config.js tenga la URL correcta# Onpe1
