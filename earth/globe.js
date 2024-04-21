// Initialize variables
let camera, scene, renderer, controls, globe, waypoints;
let backgroundScene, backgroundCamera;

const waypointData = [
    { 
        lat: 25.0340, 
        lon: -77.3963, 
        info: "Les déchets plastiques sont une source majeure de pollution dans les océans. Ils sont souvent ingérés par les animaux marins, ce qui peut entraîner des blessures, des maladies et même la mort.",
        title: "Pollution Plastique dans l'océan Atlantique",
        solution: "Encourager l'utilisation de produits biodégradables et réduire l'utilisation du plastique à usage unique. Organiser des campagnes de nettoyage des plages et des océans.",
        image: "https://c8.alamy.com/comp/2RFEC9W/pollution-plastique-des-ocans-sculpture-contenant-des-dchets-plastiques-rejets-par-locan-atlantique-sur-la-plage-de-lacanau-ocan-gironde-nou-2RFEC9W.jpg" 
    },
    { 
        lat: -33.9249, 
        lon: 18.4241, 
        info: "La pollution chimique provenant des activités industrielles et agricoles peut contaminer les océans, affectant la santé des animaux marins et perturbant les écosystèmes.",
        title: "Pollution Chimique dans l'océan Indien", 
        solution: "Mettre en œuvre des réglementations plus strictes sur les déversements industriels et agricoles. Encourager l'utilisation de technologies propres et de pratiques agricoles durables.",
        image: "https://ingenious-probiotics.com/wp-content/uploads/2022/01/Chemical-pollution-min.jpg" 
    },
    { 
        lat: -23.5505, 
        lon: -46.6333, 
        info: "Les marées noires résultent souvent de déversements accidentels ou de fuites de pétrole. Elles ont un impact dévastateur sur les espèces marines et les habitats côtiers.",
        title: "Marée Noire dans l'océan Atlantique Sud", 
        solution: "Améliorer les technologies de prévention des déversements et les protocoles de réponse d'urgence. Responsabiliser les compagnies pétrolières pour la sécurité et la maintenance des infrastructures.",
        image: "https://cdn.britannica.com/69/74369-050-96A891A3/Oil-spill-cleanup-Freshwater-West-Bay-Dyfed-Wales-1995.jpg" 
    },
    {
        lat: 37.7749,
        lon: -122.4194,
        info: "La pollution par les nutriments due aux eaux usées et à l'agriculture intensive peut entraîner des proliférations d'algues nocives, privant les animaux marins d'oxygène et endommageant les habitats côtiers.",
        title: "Pollution par les Nutriments dans l'océan Pacifique Nord",
        solution: "Mettre en place des systèmes de traitement des eaux usées efficaces. Promouvoir une utilisation responsable des engrais et des pesticides dans l'agriculture.",
        image: "https://exemple.com/nutrient_pollution.jpg"
    },
    {
        lat: -34.6037,
        lon: -58.3816,
        info: "Les déchets électroniques, tels que les téléphones portables et les ordinateurs obsolètes, contiennent des métaux lourds toxiques qui peuvent polluer les océans et nuire à la santé des poissons et d'autres organismes marins.",
        title: "Pollution par les Déchets Électroniques dans l'océan Atlantique Sud",
        solution: "Mettre en place des programmes de recyclage des déchets électroniques. Encourager la conception de produits électroniques durables et facilement réparables.",
        image: "https://exemple.com/electronic_waste_pollution.jpg"
    },
    {
        lat: -16.4897,
        lon: -151.7505,
        solution: "",
        info: "Les déchets agricoles et les pesticides peuvent être entraînés par les rivières jusqu'à l'océan, provoquant la pollution de l'eau et nuisant aux écosystèmes marins, y compris les récifs coralliens.",
        title: "Pollution Agricole dans l'océan Pacifique Sud",
        image: "https://exemple.com/agricultural_pollution.jpg"
    },
    {
        lat: 35.6895,
        lon: 139.6917,
        solution: "",
        info: "Les rejets d'eaux usées non traitées peuvent contaminer les zones côtières et nuire à la vie marine, affectant également la santé des humains qui dépendent des fruits de mer pour leur alimentation.",
        title: "Pollution par les Eaux Usées dans l'océan Pacifique Ouest",
        image: "https://exemple.com/wastewater_pollution.jpg"
    },
    {
        lat: -33.8688,
        lon: 151.2093,
        solution: "",
        info: "La surpêche menace la biodiversité marine en épuisant les populations de poissons et en perturbant les écosystèmes océaniques. Des pratiques de pêche durables sont nécessaires pour protéger les océans.",
        title: "Surpêche dans l'océan Pacifique Sud",
        image: "https://exemple.com/overfishing.jpg"
    },
    {
        lat: 40.7128,
        lon: -74.0060,
        solution: "",
        info: "Les activités de transport maritime, y compris les déversements d'hydrocarbures et les collisions de navires, peuvent causer des dommages importants aux écosystèmes marins et aux populations animales.",
        title: "Pollution par les Navires dans l'océan Atlantique Nord",
        image: "https://exemple.com/ship_pollution.jpg"
    },
    {
        lat: -9.6457,
        lon: -35.7350,
        solution: "",
        info: "Les activités minières côtières peuvent entraîner des déversements de déchets toxiques et des sédiments polluants dans les zones marines, menaçant la vie marine et les écosystèmes côtiers.",
        title: "Pollution Minière dans l'océan Atlantique Sud",
        image: "https://exemple.com/mining_pollution.jpg"
    },
    {
        lat: 21.3069,
        lon: -157.8583,
        solution: "",
        info: "La déforestation et la pollution des cours d'eau peuvent entraîner un ruissellement de sédiments et de produits chimiques nocifs dans les récifs coralliens, causant leur dégradation et leur disparition.",
        title: "Pollution Terrestre des Récifs Coralliens dans l'océan Pacifique Central",
        image: "https://exemple.com/coral_reef_pollution.jpg"
    },
    {
        lat: 51.5074,
        lon: -0.1278,
        solution: "",
        info: "Les plastiques microscopiques, tels que les microbilles utilisées dans les produits de soins personnels, peuvent contaminer les océans et être ingérés par les organismes marins, entraînant des dommages écologiques et sanitaires.",
        title: "Pollution par les Plastiques Microscopiques dans l'océan Atlantique Nord",
        image: "https://exemple.com/microplastic_pollution.jpg"
    },
    {
        lat: -12.0464,
        lon: -77.0428,
        solution: "",
        info: "La surpêche et la pêche non réglementée peuvent épuiser les populations de poissons, perturber les écosystèmes marins et menacer la sécurité alimentaire des communautés dépendantes de la pêche.",
        title: "Surpêche dans l'océan Pacifique Sud",
        image: "https://exemple.com/overfishing.jpg"
    },
    {
        lat: 40.7128,
        lon: -74.0060,
        solution: "",
        info: "Les navires de croisière et les bateaux de plaisance peuvent déverser des eaux usées non traitées et des déchets en mer, contribuant ainsi à la pollution des océans et à la dégradation des écosystèmes marins.",
        title: "Pollution par les Navires de Croisière dans l'océan Atlantique Nord",
        image: "https://exemple.com/cruise_ship_pollution.jpg"
    },
    {
        lat: -16.4897,
        lon: -151.7505,
        solution: "",
        info: "Les pratiques agricoles intensives et l'utilisation de pesticides peuvent entraîner un ruissellement de produits chimiques dans les rivières et les océans, contaminant ainsi les écosystèmes marins et menaçant la biodiversité.",
        title: "Pollution Agricole dans l'océan Pacifique Sud",
        image: "https://exemple.com/agricultural_pollution.jpg"
    },
    {
        lat: 9.0820,
        lon: 8.6753,
        solution: "",
        info: "La pollution par le pétrole est courante dans les régions où l'extraction et le transport de pétrole ont lieu. Les déversements accidentels et les fuites peuvent causer des dommages importants à la vie marine et aux écosystèmes côtiers.",
        title: "Pollution Pétrolière dans le golfe de Guinée",
        image: "https://exemple.com/oil_pollution.jpg"
    },
    {
        lat: -33.8688,
        lon: 151.2093,
        solution: "",
        info: "Les déchets alimentaires jetés dans les océans peuvent contribuer à la pollution marine, menaçant la santé des animaux marins et perturbant les écosystèmes marins.",
        title: "Pollution par les Déchets Alimentaires dans l'océan Pacifique Sud",
        image: "https://exemple.com/food_waste_pollution.jpg"
    }
];



// Initialize globe and animation
init();
animate();

// Function to initialize the globe
function init() {
    document.getElementById('globe-container').classList.add('visible');
    // Main scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    // Background scene
    backgroundScene = new THREE.Scene();
    backgroundCamera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, -1000, 1000);
    backgroundCamera.position.z = 1;

    // Background gradient
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext('2d');
    const gradient = context.createLinearGradient(0, 0, 0, window.innerHeight);
    gradient.addColorStop(0, '#b3d9ff');
    gradient.addColorStop(1, '#99ccff');
    context.fillStyle = gradient;
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
    const background = new THREE.Mesh(geometry, material);
    backgroundScene.add(background);

    renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable alpha for transparency
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Set clear color to transparent

    document.getElementById('globe').appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Create globe
    const globeGeometry = new THREE.SphereGeometry(5, 32, 32);
    const globeTexture = new THREE.TextureLoader().load('earth_texture.jpg');
    const globeMaterial = new THREE.MeshBasicMaterial({ map: globeTexture });
    globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Add waypoints
    waypoints = [];
    waypointData.forEach(data => {
        const waypoint = createWaypoint(data.lat, data.lon, data.title);
        waypoints.push(waypoint);
        scene.add(waypoint);
    });
}

// Function to animate globe
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.autoClear = false;
    renderer.clear(); 
    renderer.render(scene, camera);
}

// Function to create a waypoint
function createWaypoint(lat, lon, title) {
    const radius = 5;
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    const waypointGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const waypointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const waypoint = new THREE.Mesh(waypointGeometry, waypointMaterial);
    waypoint.position.set(x, y, z);

    // Store waypoint position for raycasting
    waypoint.position.normalized = new THREE.Vector3(x, y, z).normalize();
    const label = document.createElement('div');
    label.className = 'waypoint-label';
    label.textContent = title;
    document.body.appendChild(label);

    waypoint.label = label;

    return waypoint;
}

// Event listener for mouse click
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mousemove', onDocumentMouseMove, false);

function onDocumentMouseDown(event) {
    event.preventDefault();

    console.log(event.target); // Log the event target to see what element is being clicked

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
    mouse.y += 0.17;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(waypoints);
    if (intersects.length > 0) {
        const waypoint = intersects[0].object;
        const waypointIndex = waypoints.indexOf(waypoint);
        displayInfo(waypointIndex);
    }
}

function onDocumentMouseMove(event) {
    event.preventDefault();

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(waypoints);
    if (intersects.length > 0) {
        const waypoint = intersects[0].object;
        const label = waypoint.label;
        label.style.display = 'block';

        // Position label on top of the waypoint
        const pos = waypoint.position.clone().project(camera);
        const widthHalf = window.innerWidth / 2;
        const heightHalf = window.innerHeight / 2;

        pos.x = pos.x * widthHalf + widthHalf;
        pos.y = -(pos.y * heightHalf) + heightHalf;

        label.style.top = pos.y + 'px';
        label.style.left = pos.x + 'px';
    } else {
        waypoints.forEach(waypoint => {
            if (waypoint.label) {
                waypoint.label.style.display = 'none';
            }
        });
    }
}

function displayInfo(waypointIndex) {
    console.log("test")
    const infoPanel = document.getElementById('info-panel');
    const data = waypointData[waypointIndex];
    
    // Generate HTML for the modal
    const modalHTML = `
        <div class="modal-header">
            <h2>${data.title}</h2>
            <span class="close" onclick="closeModal()">&times;</span>
        </div>
        <div class="modal-content">
            <img src="${data.image}" alt="${data.title}" class="modal-image">
            <p>${data.info}</p>
            <p class="green-text">Solution</p>
            <p>${data.solution}</p>
        </div>
    `;

    // Set the modal HTML to the info panel
    infoPanel.innerHTML = modalHTML;
    infoPanel.classList.add('active'); // Add 'active' class to trigger sliding animation
    infoPanel.classList.remove('hidden');
}

function closeModal() {
    const infoPanel = document.getElementById('info-panel');
    infoPanel.innerHTML = ''; // Clear modal content
    infoPanel.classList.remove('active'); // Remove 'active' class to slide out the panel
    infoPanel.classList.add('hidden');
}
