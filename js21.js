// --- 1. CONFIGURACIÓN BÁSICA DE ESCENA ---
const container = document.getElementById('canvas-container');

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x010103, 0.0009);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 20, 450);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// --- 2. ILUMINACIÓN DINÁMICA ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const sunLight = new THREE.PointLight(0xffaa00, 4, 1200);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

// --- 3. CAMPO DE ESTRELLAS PROFUNDO ---
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 6000;
const starPositions = new Float32Array(starsCount * 3);
const starColors = new Float32Array(starsCount * 3);

for (let i = 0; i < starsCount * 3; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 2500;
    starPositions[i + 1] = (Math.random() - 0.5) * 2500;
    starPositions[i + 2] = (Math.random() - 0.5) * 2500;

    const shade = 0.6 + Math.random() * 0.4;
    starColors[i] = shade;
    starColors[i + 1] = shade * 0.95;
    starColors[i + 2] = shade * 1.1;
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
starsGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

const starsMaterial = new THREE.PointsMaterial({
    size: 1.6,
    vertexColors: true,
    transparent: true,
    opacity: 0.9
});
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

// --- 4. SOL ULTRA-REALISTA (NÚCLEO + CORONA MÚLTIPLE) ---
const coreGroup = new THREE.Group();
scene.add(coreGroup);

// Núcleo central del sol (esfera de alta definición con emisión fuerte)
const sunGeo = new THREE.SphereGeometry(45, 64, 64);
const sunMat = new THREE.MeshStandardMaterial({
    color: 0xff5500,
    emissive: 0xff8800,
    emissiveIntensity: 1.2,
    roughness: 0.3,
    metalness: 0.1
});
const sunMesh = new THREE.Mesh(sunGeo, sunMat);
coreGroup.add(sunMesh);

// Corona solar interna (brillo cálido)
const coronaInnerGeo = new THREE.SphereGeometry(52, 32, 32);
const coronaInnerMat = new THREE.MeshBasicMaterial({
    color: 0xffaa00,
    transparent: true,
    opacity: 0.4,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending
});
const coronaInner = new THREE.Mesh(coronaInnerGeo, coronaInnerMat);
coreGroup.add(coronaInner);

// Corona solar externa (aura difusa grande)
const coronaOuterGeo = new THREE.SphereGeometry(65, 32, 32);
const coronaOuterMat = new THREE.MeshBasicMaterial({
    color: 0xffea00,
    transparent: true,
    opacity: 0.18,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending
});
const coronaOuter = new THREE.Mesh(coronaOuterGeo, coronaOuterMat);
coreGroup.add(coronaOuter);

// Anillo cósmico brillante e inclinado
const ringGeo = new THREE.RingGeometry(70, 130, 96);
const ringMat = new THREE.MeshStandardMaterial({
    color: 0xffcc00,
    emissive: 0xff9800,
    emissiveIntensity: 0.6,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
    roughness: 0.2
});
const ringMesh = new THREE.Mesh(ringGeo, ringMat);
ringMesh.rotation.x = Math.PI / 2.2;
coreGroup.add(ringMesh);

// --- 5. MENSAJES EN MINÚSCULA Y ALARGADOS ---
const mensajes = [
    "🌻 eeeeeres mi lolita hermosaaa",
    "💖 el amooor de mi vida enteeera",
    "⚖️ miii abogatita preciosaaa",
    "🥰 te amooo, mi mojigataaa",
    "😤 miii gruñona favoritaaa",
    "✨ mi lugar favorito es a tuuu lado",
    "💛 gracias por iluuuminar mis días",
    "🌟 eres miii soooool en todo momento",
    "🌻 te amoo con toda el almmaaa",
    "💫 mi casuaaaliidad más bonitaaa",
    "🌹 eres perfecta para mí, gruñonaa",
    "💛 eres mi paz y mi alegría, loolita",
    "✨ daríaaa todo por verte sonreíir",
    "🌻 qrrue te amooo demasiadooo",
    "💖 mi niñaaa hermosaaa"
];

function createTextSprite(message) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '32px "Times New Roman", serif';
    
    const textWidth = context.measureText(message).width;
    canvas.width = textWidth + 40;
    canvas.height = 70;

    // Sombra para contraste nítido en el espacio
    context.shadowColor = '#000000';
    context.shadowBlur = 10;
    context.lineWidth = 4;
    context.strokeStyle = 'rgba(0,0,0,0.9)';
    context.strokeText(message, 20, 45);

    context.font = '32px "Times New Roman", serif';
    context.fillStyle = '#fffde7';
    context.shadowColor = '#ffea00';
    context.shadowBlur = 15;
    context.fillText(message, 20, 45);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMat);
    
    sprite.scale.set(textWidth * 0.4, 23, 1);
    return sprite;
}

const messagesGroup = new THREE.Group();
scene.add(messagesGroup);

for (let i = 0; i < 65; i++) {
    const text = mensajes[Math.floor(Math.random() * mensajes.length)];
    const sprite = createTextSprite(text);

    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = 170 + Math.random() * 250;

    sprite.position.x = r * Math.sin(phi) * Math.cos(theta);
    sprite.position.y = r * Math.sin(phi) * Math.sin(theta);
    sprite.position.z = r * Math.cos(phi);

    messagesGroup.add(sprite);
}

// --- 6. CONTROLES DE INTERACCIÓN (CLIC/ARRASTRE Y ZOOM) ---
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let targetRotationX = 0;
let targetRotationY = 0;

container.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    targetRotationY += deltaX * 0.005;
    targetRotationX += deltaY * 0.005;

    previousMousePosition = { x: e.clientX, y: e.clientY };
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

// Zoom con la rueda del ratón
window.addEventListener('wheel', (e) => {
    camera.position.z += e.deltaY * 0.35;
    camera.position.z = Math.max(160, Math.min(1000, camera.position.z));
});

// Soporte táctil para celulares
container.addEventListener('touchstart', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
});

container.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.y;

    targetRotationY += deltaX * 0.005;
    targetRotationX += deltaY * 0.005;

    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
});

window.addEventListener('touchend', () => {
    isDragging = false;
});

// --- 7. BUCLE DE ANIMACIÓN ---
function animate() {
    requestAnimationFrame(animate);

    messagesGroup.rotation.y += (targetRotationY - messagesGroup.rotation.y) * 0.06;
    messagesGroup.rotation.x += (targetRotationX - messagesGroup.rotation.x) * 0.06;

    // Rotación suave del sol y sus coronas
    coreGroup.rotation.y += 0.002;
    coronaOuter.rotation.y -= 0.001;

    renderer.render(scene, camera);
}

animate();

// --- 8. AJUSTE DE VENTANA ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});