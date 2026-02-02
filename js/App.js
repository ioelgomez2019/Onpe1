// ========================================
// APP.JS - ÚNICO ARCHIVO JAVASCRIPT
// ========================================

// ========================================
// CONFIGURACIÓN DE GOOGLE SHEETS
// ========================================
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwHOKSsz6_dBZE6vqtaSAieuS43dAYkC3jSc_yTfkh4Zt34og5ZAjh3YtyApHoOYgo/exec';
// Ejemplo: 'https://script.google.com/macros/s/AKfycby.../exec'

// ========================================
// VARIABLES GLOBALES
// ========================================
let sessionTime = 78;
let timerInterval;

// ========================================
// FUNCIONES DE API - GOOGLE SHEETS
// ========================================

async function consultarDNI(dni) {
    try {
        const url = `${GOOGLE_SCRIPT_URL}?action=consultar&dni=${dni}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al consultar DNI:', error);
        return { success: false, message: 'Error de conexión con el servidor' };
    }
}

async function registrarUsuario(userData) {
    try {
        const params = new URLSearchParams({
            action: 'registrar',
            dni: userData.dni,
            nombres: userData.nombres,
            apellidoPaterno: userData.apellidoPaterno,
            apellidoMaterno: userData.apellidoMaterno,
            region: userData.region,
            provincia: userData.provincia,
            distrito: userData.distrito,
            mesaNumero: userData.mesaNumero,
            mensajePersonalizado: userData.mensajePersonalizado
        });
        
        const url = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return { success: false, message: 'Error de conexión con el servidor' };
    }
}

// ========================================
// FUNCIONES DE ANIMACIÓN Y LOADING
// ========================================

function createBurstParticles() {
    const burst = document.getElementById('logoBurst');
    if (!burst) return;
    
    burst.innerHTML = '';
    
    for (let i = 0; i < 16; i++) {
        const particle = document.createElement('div');
        particle.className = 'burst-particle';
        
        const angle = (i * 22.5) * Math.PI / 180;
        const distance = 60;
        const tx = Math.cos(angle) * distance + 'px';
        const ty = Math.sin(angle) * distance + 'px';
        
        particle.style.setProperty('--tx', tx);
        particle.style.setProperty('--ty', ty);
        particle.style.animationDelay = (i * 0.075) + 's';
        
        burst.appendChild(particle);
    }
}

function showLoading() {
    createBurstParticles();
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.classList.remove('hidden');
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.classList.add('hidden');
}

// ========================================
// FUNCIONES DE SESIÓN
// ========================================

function saveUserDataToSession(userData) {
    sessionStorage.setItem('onpeUserData', JSON.stringify(userData));
}

function getUserDataFromSession() {
    const data = sessionStorage.getItem('onpeUserData');
    return data ? JSON.parse(data) : null;
}

function clearUserDataFromSession() {
    sessionStorage.removeItem('onpeUserData');
}

// ========================================
// FUNCIONES DE VALIDACIÓN
// ========================================

function handleDNIInput(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
}

function handleMesaInput(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
}

// ========================================
// FUNCIONES PARA INDEX.HTML (CONSULTA)
// ========================================

function showDniNotFoundModal(dni) {
    document.getElementById('modalDni').textContent = dni;
    document.getElementById('dniNotFoundModal').classList.remove('hidden');
    sessionStorage.setItem('dniToRegister', dni);
}

function closeModal() {
    document.getElementById('dniNotFoundModal').classList.add('hidden');
}

function goToRegistration() {
    closeModal();
    window.location.href = 'registro.html';
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const dni = document.getElementById('dni').value.trim();
    
    if (dni.length !== 8 || !/^\d+$/.test(dni)) {
        alert('Por favor, ingrese un DNI válido de 8 dígitos');
        return;
    }

    if (GOOGLE_SCRIPT_URL === 'TU_URL_DE_GOOGLE_SCRIPT_AQUI') {
        alert('⚠️ ERROR: Debe configurar la URL de Google Apps Script en el archivo app.js\n\nPor favor, lea las instrucciones en INSTRUCCIONES.md');
        return;
    }

    showLoading();
    const result = await consultarDNI(dni);
    hideLoading();

    if (result.success) {
        saveUserDataToSession(result.data);
        window.location.href = 'consulta.html';
    } else {
        showDniNotFoundModal(dni);
    }
}

// ========================================
// FUNCIONES PARA REGISTRO.HTML
// ========================================

function selectPredefinedMessage(message) {
    const mensajeInput = document.getElementById('regMensaje');
    mensajeInput.value = message;
    mensajeInput.readOnly = true;
}

function enableCustomMessage() {
    const mensajeInput = document.getElementById('regMensaje');
    mensajeInput.value = '';
    mensajeInput.readOnly = false;
    mensajeInput.focus();
}

function cancelRegistration() {
    if (confirm('¿Está seguro que desea cancelar el registro?')) {
        window.location.href = 'index.html';
    }
}

async function handleRegistrationSubmit(e) {
    e.preventDefault();
    
    const userData = {
        dni: document.getElementById('regDni').value.trim(),
        nombres: document.getElementById('regNombres').value.trim().toUpperCase(),
        apellidoPaterno: document.getElementById('regApellidoPaterno').value.trim().toUpperCase(),
        apellidoMaterno: document.getElementById('regApellidoMaterno').value.trim().toUpperCase(),
        region: document.getElementById('regRegion').value.trim().toUpperCase(),
        provincia: document.getElementById('regProvincia').value.trim().toUpperCase(),
        distrito: document.getElementById('regDistrito').value.trim().toUpperCase(),
        mesaNumero: document.getElementById('regMesa').value.trim().padStart(6, '0'),
        mensajePersonalizado: document.getElementById('regMensaje').value.trim().toUpperCase()
    };

    if (!userData.mensajePersonalizado) {
        alert('Por favor, seleccione o escriba un mensaje personalizado');
        return;
    }

    showLoading();
    const result = await registrarUsuario(userData);
    hideLoading();

    if (result.success) {
        alert('✅ ' + result.message + '\n\nAhora será redirigido a la página de resultados.');
        
        showLoading();
        const consultaResult = await consultarDNI(userData.dni);
        hideLoading();
        
        if (consultaResult.success) {
            saveUserDataToSession(consultaResult.data);
            window.location.href = 'consulta.html';
        } else {
            alert('Registro exitoso pero hubo un error al cargar los datos. Por favor, intente consultarlos desde la página principal.');
            window.location.href = 'index.html';
        }
    } else {
        alert('❌ Error: ' + result.message);
    }
}

// ========================================
// FUNCIONES PARA CONSULTA.HTML (RESULTADOS)
// ========================================

function startSessionTimer() {
    const timerElement = document.getElementById('sessionTimer');
    timerInterval = setInterval(() => {
        sessionTime--;
        if (sessionTime <= 0) {
            clearInterval(timerInterval);
            alert('Sesión expirada');
            goBack();
        } else {
            timerElement.textContent = sessionTime + ' segundos restantes';
        }
    }, 1000);
}

function stopSessionTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    sessionTime = 78;
}

function goBack() {
    stopSessionTimer();
    clearUserDataFromSession();
    window.location.href = 'index.html';
}

function showResults(userData) {
    if (!userData) {
        alert('No se encontraron datos. Será redirigido a la página principal.');
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('userDNI').textContent = userData.dni;
    document.getElementById('userName').textContent = 
        `${userData.nombres} ${userData.apellidoPaterno} ${userData.apellidoMaterno}`;
    document.getElementById('userLocation').textContent = 
        `${userData.region} / ${userData.provincia} / ${userData.distrito}`;
    document.getElementById('mesaNumber').textContent = `Mesa Nº ${userData.mesaNumero}`;

    const alertBox = document.getElementById('alertBox');
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.textContent = userData.mensajePersonalizado;

    const mensajeLower = userData.mensajePersonalizado.toLowerCase();
    if (mensajeLower.includes('sí') || mensajeLower.includes('si eres')) {
        alertBox.style.background = '#4CAF50';
    } else if (mensajeLower.includes('no eres')) {
        alertBox.style.background = '#ff1744';
    } else {
        alertBox.style.background = '#2196F3';
    }

    startSessionTimer();
}

// ========================================
// INICIALIZACIÓN AUTOMÁTICA
// ========================================

function init() {
    const currentPage = window.location.pathname.split('/').pop();
    
    console.log('🚀 ONPE App iniciada');
    console.log('📄 Página actual:', currentPage);
    
    if (GOOGLE_SCRIPT_URL === 'https://script.google.com/macros/s/AKfycbwHOKSsz6_dBZE6vqtaSAieuS43dAYkC3jSc_yTfkh4Zt34og5ZAjh3YtyApHoOYgo/exec') {
        console.warn('⚠️ ADVERTENCIA: Debe configurar GOOGLE_SCRIPT_URL en app.js');
    } else {
        console.log('✅ Google Script URL configurada');
    }

    // INICIALIZACIÓN SEGÚN LA PÁGINA
    
    // INDEX.HTML - Página de consulta
    if (currentPage === 'index.html' || currentPage === '') {
        const form = document.getElementById('consultaForm');
        const dniInput = document.getElementById('dni');
        
        if (form) form.addEventListener('submit', handleFormSubmit);
        if (dniInput) dniInput.addEventListener('input', handleDNIInput);
        
        clearUserDataFromSession();
        console.log('✅ Index inicializado');
    }
    
    // REGISTRO.HTML - Página de registro
    else if (currentPage === 'registro.html') {
        const registrationForm = document.getElementById('registrationForm');
        const regDniInput = document.getElementById('regDni');
        const regMesaInput = document.getElementById('regMesa');
        
        if (registrationForm) registrationForm.addEventListener('submit', handleRegistrationSubmit);
        if (regDniInput) regDniInput.addEventListener('input', handleDNIInput);
        if (regMesaInput) regMesaInput.addEventListener('input', handleMesaInput);
        
        const dniToRegister = sessionStorage.getItem('dniToRegister');
        if (dniToRegister && regDniInput) {
            regDniInput.value = dniToRegister;
            sessionStorage.removeItem('dniToRegister');
        }
        
        console.log('✅ Registro inicializado');
    }
    
    // CONSULTA.HTML - Página de resultados
    else if (currentPage === 'consulta.html') {
        const userData = getUserDataFromSession();
        
        if (!userData) {
            alert('No se encontraron datos de consulta. Será redirigido a la página principal.');
            window.location.href = 'index.html';
            return;
        }
        
        showResults(userData);
        
        window.addEventListener('beforeunload', () => {
            stopSessionTimer();
        });
        
        console.log('✅ Consulta inicializada');
    }
}

// Ejecutar al cargar la página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}