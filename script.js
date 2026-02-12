// ============================================
// CONFIGURACIÓN DEL VISOR 360°
// ============================================

let viewer360 = null;

// Inicializar cuando la página cargue
document.addEventListener('DOMContentLoaded', function () {
    initViewer360();

    // Configurar listeners para el AR Viewer (opcional, para debugging)
    const arViewer = document.getElementById('ar-viewer');
    if (arViewer) {
        arViewer.addEventListener('ar-status', (event) => {
            console.log('Estado AR:', event.detail.status);
        });
    }
});

function initViewer360() {
    try {
        viewer360 = pannellum.viewer('viewer360', {
            "type": "equirectangular",
            "panorama": "panorama.jpg",
            "autoLoad": true,
            "autoRotate": -2,
            "autoRotateInactivityDelay": 3000,
            "showControls": true,
            "showFullscreenCtrl": false,
            "showZoomCtrl": true,
            "mouseZoom": true,
            "draggable": true,
            "friction": 0.15,
            "hfov": 100,
            "minHfov": 50,
            "maxHfov": 120,
            "pitch": 0,
            "yaw": 0,
            "compass": false,
            "orientationOnByDefault": false,
            "strings": {
                "loadButtonLabel": "Haz clic para cargar el recorrido",
                "loadingLabel": "Cargando...",
                "bylineLabel": "Museo Digital"
            },
            // ============================================
            // HOTSPOTS INTERACTIVOS PARA AR
            // ============================================
            "hotSpots": [
                {
                    "pitch": -2.5579,   // Coordenadas finales
                    "yaw": -128.8150,   // Coordenadas finales
                    "type": "custom",
                    "cssClass": "ar-hotspot",
                    "createTooltipFunc": createARHotspot,
                    "clickHandlerFunc": showInfoMessage,
                    "createTooltipArgs": "BAREQUERA DE ANTIOQUIA"
                },
                {
                    "pitch": -5.8489,   // Coordenadas finales
                    "yaw": -4.7685,     // Coordenadas finales
                    "type": "custom",
                    "cssClass": "ar-hotspot",
                    "createTooltipFunc": createARHotspot,
                    "clickHandlerFunc": showInfoMessage,
                    "createTooltipArgs": "Caminos trenzados"
                },
                {
                    "pitch": 9.3039,
                    "yaw": -11.8930,
                    "type": "custom",
                    "cssClass": "ar-hotspot",
                    "createTooltipFunc": createARHotspot,
                    "clickHandlerFunc": showInfoMessage,
                    "createTooltipArgs": "EXPO NEGRO-CRISTIAN BAENA"
                },
                {
                    "pitch": -37.2117,
                    "yaw": -40.4131,
                    "type": "custom",
                    "cssClass": "ar-hotspot",
                    "createTooltipFunc": createARHotspot,
                    "clickHandlerFunc": showInfoMessage,
                    "createTooltipArgs": "CALIPSO"
                },
                {
                    "pitch": -13.2060,
                    "yaw": -28.5296,
                    "type": "custom",
                    "cssClass": "ar-hotspot",
                    "createTooltipFunc": createARHotspot,
                    "clickHandlerFunc": showInfoMessage,
                    "createTooltipArgs": "MARIMBA"
                },
                {
                    // Audio Hotspot (Ubicado al lado de la Marimba)
                    "pitch": -13.2060,
                    "yaw": -22.0000,
                    "type": "custom",
                    "cssClass": "audio-hotspot",
                    "createTooltipFunc": createARHotspot,
                    "clickHandlerFunc": toggleAudio,
                    "createTooltipArgs": "AUDIO_MARIMBA"
                }
            ]
        });

        console.log('Visor 360° inicializado correctamente con hotspots AR');
    } catch (error) {
        // ... (rest of catch block)
    }
}

// ============================================
// GESTIÓN DE AUDIO GLOBAL
// ============================================
let currentAudio = null;
let isPlaying = false;

function toggleAudio(event, args) {
    console.log('Toggle audio llamado');

    // Si no hay audio cargado, lo creamos
    if (!currentAudio) {
        currentAudio = new Audio('audio_marimba.mp3?v=' + new Date().getTime());
        currentAudio.loop = true; // Que se repita
    }

    if (isPlaying) {
        currentAudio.pause();
        isPlaying = false;
        showToast('Audio Pausado ⏸️');
    } else {
        currentAudio.play()
            .then(() => {
                isPlaying = true;
                showToast('Reproduciendo Audio 🎵');
            })
            .catch(e => {
                console.error("Error al reproducir:", e);
                showToast('Error al reproducir audio ❌');
            });
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 30px;
        z-index: 10001;
        font-family: sans-serif;
        animation: fadeIn 0.3s;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
}

// ============================================
// FUNCIONES PARA HOTSPOTS AR
// ============================================

/**
 * Crea el elemento visual del hotspot AR
 */
function createARHotspot(hotSpotDiv, args) {
    hotSpotDiv.classList.add('ar-hotspot-container');

    // Crear el botón del hotspot
    const button = document.createElement('div');
    button.className = 'hotspot-button';

    // Icono
    const icon = document.createElement('span');
    icon.className = 'hotspot-icon';

    // Icono diferenciado para Audio
    if (args === 'AUDIO_MARIMBA') {
        icon.innerHTML = '🔊';
        button.style.background = 'linear-gradient(135deg, #FF9800 0%, #F44336 100%)'; // Color naranja/rojo para audio
    } else {
        icon.innerHTML = '📱';
    }

    // Texto del botón
    const text = document.createElement('span');
    text.className = 'hotspot-text';

    if (args === 'AUDIO_MARIMBA') {
        text.textContent = 'Escuchar';
    } else {
        text.textContent = args || 'Ver en AR';
    }

    button.appendChild(icon);
    button.appendChild(text);
    hotSpotDiv.appendChild(button);

    // Guardar el título en el elemento para usarlo después
    hotSpotDiv.dataset.title = args;

    // Agregar efecto hover
    button.addEventListener('mouseenter', function () {
        button.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseleave', function () {
        button.style.transform = 'scale(1)';
    });
}

/**
 * Muestra un mensaje informativo cuando se hace clic en el hotspot
 */
function showInfoMessage(event, args) {
    console.log('Hotspot informativo clickeado - Mostrando información');

    // Obtener el título del hotspot (args contiene el título)
    const objectTitle = args || 'Objeto del museo';

    // Definir información según el objeto
    let objectInfo = {
        title: objectTitle,
        description: 'Información sobre este objeto del museo.'
    };

    // Personalizar información según el objeto
    if (objectTitle === 'BAREQUERA DE ANTIOQUIA') {
        objectInfo.description = 'Traje tradicional de la cultura laboral de Antioquia, Colombia.';
    } else if (objectTitle === 'Caminos trenzados') {
        objectInfo.description = 'Obra artística que representa los caminos entrelazados de nuestra cultura.';
    } else if (objectTitle === 'MARIMBA') {
        objectInfo.description = 'Instrumento de percusión idiófono, de forma parecida al xilófono. Presiona el botón de audio 🔊 que está al lado para escuchar.';
    } else if (objectTitle === 'EXPO NEGRO-CRISTIAN BAENA') {
        objectInfo.description = 'Exposición destacada de Cristian Baena.';
    } else if (objectTitle === 'CALIPSO') {
        objectInfo.description = 'Obra inspirada en la ninfa Calipso.';
    }

    // Crear overlay oscuro
    const overlay = document.createElement('div');
    overlay.id = 'info-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    // Crear caja de mensaje
    const messageBox = document.createElement('div');
    messageBox.style.cssText = `
        background: white;
        padding: 2.5rem;
        border-radius: 20px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        text-align: center;
        animation: slideUp 0.4s ease;
    `;

    // Título
    const title = document.createElement('h2');
    title.textContent = objectInfo.title;
    title.style.cssText = `
        color: #2c3e50;
        font-size: 2rem;
        margin-bottom: 1rem;
        font-weight: 700;
    `;

    // Descripción
    const description = document.createElement('p');
    description.textContent = objectInfo.description;
    description.style.cssText = `
        color: #555;
        font-size: 1.1rem;
        margin-bottom: 2rem;
        line-height: 1.6;
    `;

    // Botón Cerrar
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Cerrar';
    closeButton.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 1rem 2.5rem;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    `;
    closeButton.onmouseover = () => {
        closeButton.style.transform = 'translateY(-2px)';
        closeButton.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
    };
    closeButton.onmouseout = () => {
        closeButton.style.transform = 'translateY(0)';
        closeButton.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
    };
    closeButton.onclick = () => {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => document.body.removeChild(overlay), 300);
    };

    // Ensamblar elementos
    messageBox.appendChild(title);
    messageBox.appendChild(description);

    // Si hay audio, agregar el reproductor
    if (objectInfo.audio) {
        console.log('Intentando crear reproductor de audio...');
        const audioPlayer = document.createElement('audio');
        audioPlayer.controls = true;
        audioPlayer.style.cssText = `
            width: 100%;
            margin-bottom: 2rem;
            border-radius: 10px;
        `;
        const source = document.createElement('source');
        source.src = objectInfo.audio;
        source.type = 'audio/mpeg';

        audioPlayer.appendChild(source);
        messageBox.appendChild(audioPlayer);

        // Mensaje si no hay archivo
        audioPlayer.onerror = () => {
            console.warn('Audio no encontrado:', objectInfo.audio);
        };
    }

    messageBox.appendChild(closeButton);
    overlay.appendChild(messageBox);

    // Agregar al DOM
    document.body.appendChild(overlay);

    // Cerrar al hacer clic fuera del mensaje
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => document.body.removeChild(overlay), 300);
        }
    };
}

// ============================================
// OPTIMIZACIONES PARA MÓVILES
// ============================================

// Prevenir zoom en doble tap en iOS
document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Detectar orientación del dispositivo
window.addEventListener('orientationchange', function () {
    console.log('Orientación cambiada');
    // Reajustar el visor si es necesario
    if (viewer360) {
        setTimeout(() => {
            viewer360.resize();
        }, 200);
    }
});

// Manejar cambios de tamaño de ventana
let resizeTimer;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        if (viewer360) {
            viewer360.resize();
        }
    }, 250);
});

// ============================================
// HERRAMIENTAS DE DESARROLLADOR (MODO EDICIÓN)
// ============================================

let isEditMode = false;
let tempHotspot = null;

document.addEventListener('DOMContentLoaded', function () {
    const devToggle = document.getElementById('dev-toggle');
    const devPanel = document.getElementById('dev-panel');
    const viewerContainer = document.getElementById('viewer360');

    if (devToggle) {
        devToggle.addEventListener('click', function () {
            isEditMode = !isEditMode;
            devToggle.classList.toggle('active');
            devPanel.style.display = isEditMode ? 'block' : 'none';

            if (isEditMode) {
                // Habilitar cursor de cruz
                document.body.style.cursor = 'crosshair';
                // Intentar deshabilitar arrastre si es posible
                // viewer360.setDraggable(false); 
            } else {
                // viewer360.setDraggable(true);
                document.body.style.cursor = 'default';
                removeTempHotspot();
            }
        });
    }

    // Escuchar clics en el visor para obtener coordenadas
    if (viewerContainer) {
        viewerContainer.addEventListener('mousedown', function (event) {
            // Solo actuar si estamos en modo edición
            if (!isEditMode || !viewer360) return;

            // Calcular coordenadas
            const coords = viewer360.mouseEventToCoords(event);
            const pitch = coords[0];
            const yaw = coords[1];

            // Actualizar UI
            document.getElementById('dev-pitch').textContent = pitch.toFixed(4);
            document.getElementById('dev-yaw').textContent = yaw.toFixed(4);

            // Crear/Mover marcador temporal
            updateTempHotspot(pitch, yaw);
        });
    }
});

function updateTempHotspot(pitch, yaw) {
    // Si ya existe, lo eliminamos primero
    removeTempHotspot();

    // Agregar nuevo hotspot temporal
    viewer360.addHotSpot({
        "pitch": pitch,
        "yaw": yaw,
        "type": "custom",
        "cssClass": "temp-marker",
        "createTooltipFunc": (hotSpotDiv) => {
            hotSpotDiv.classList.add('temp-marker');
            tempHotspot = hotSpotDiv;
        }
    });

    console.log(`Coordenadas capturadas: Pitch ${pitch}, Yaw ${yaw}`);
}

function removeTempHotspot() {
    // Eliminar visualmente los marcadores temporales
    const markers = document.getElementsByClassName('temp-marker');
    while (markers.length > 0) {
        if (markers[0].parentNode) {
            markers[0].parentNode.removeChild(markers[0]);
        } else {
            break;
        }
    }
}

function copyCoordinates() {
    const pitch = document.getElementById('dev-pitch').textContent;
    const yaw = document.getElementById('dev-yaw').textContent;

    const jsonSnippet = `
                {
                    "pitch": ${pitch},
                    "yaw": ${yaw},
                    "type": "custom",
                    "cssClass": "ar-hotspot",
                    "createTooltipFunc": createARHotspot,
                    "clickHandlerFunc": showInfoMessage,
                    "createTooltipArgs": "Nuevo Objeto"
                }`;

    navigator.clipboard.writeText(jsonSnippet).then(() => {
        alert('¡JSON copiado al portapapeles!');
    }).catch(err => {
        console.error('Error al copiar:', err);
        // Fallback manual si falla el clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = jsonSnippet;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
        alert('¡JSON copiado (fallback)!');
    });
}
