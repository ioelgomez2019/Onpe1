// ========================================
// CONFIGURACIÓN GLOBAL - GOOGLE SHEETS
// ========================================
// REEMPLAZA ESTA URL CON LA URL DE TU GOOGLE APPS SCRIPT
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyDP0Z77rLgHFgs1T7gqzfuFf6CGAIPHpa2gDxlpoeiPyZyqsawAxSTCLDPRwGSEFy4/exec';
// Ejemplo: 'https://script.google.com/macros/s/AKfycby.../exec'

// ========================================
// FUNCIONES COMPARTIDAS - API GOOGLE SHEETS
// ========================================

// Consultar DNI en Google Sheets
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

// Registrar nuevo usuario en Google Sheets
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
// FUNCIONES COMPARTIDAS - ANIMACIONES
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

// ========================================
// FUNCIONES COMPARTIDAS - UTILIDADES
// ========================================

function handleDNIInput(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
}

function handleMesaInput(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
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

// Guardar datos en sessionStorage para pasar entre páginas
function saveUserDataToSession(userData) {
    sessionStorage.setItem('onpeUserData', JSON.stringify(userData));
}

// Obtener datos de sessionStorage
function getUserDataFromSession() {
    const data = sessionStorage.getItem('onpeUserData');
    return data ? JSON.parse(data) : null;
}

// Limpiar datos de sesión
function clearUserDataFromSession() {
    sessionStorage.removeItem('onpeUserData');
}

console.log('🔧 Config.js cargado');
if (GOOGLE_SCRIPT_URL === 'TU_URL_DE_GOOGLE_SCRIPT_AQUI') {
    console.warn('⚠️ ADVERTENCIA: Debe configurar GOOGLE_SCRIPT_URL en config.js');
    console.warn('📖 Lea las instrucciones en INSTRUCCIONES_GOOGLE_SHEETS.md');
} else {
    console.log('✅ Google Script URL configurada');
}