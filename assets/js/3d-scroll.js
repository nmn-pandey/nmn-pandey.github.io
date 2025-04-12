class Scene3D {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true 
        });
        
        this.sections = [];
        this.currentSection = 0;
        this.scrollProgress = 0;
        
        this.init();
        this.createSections();
        this.setupScrollTrigger();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);
        
        this.camera.position.z = 5;
        
        // Add ambient and directional lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(0, 1, 1);
        this.scene.add(ambientLight, directionalLight);
        
        // Create rooms for each section
        this.rooms = [
            this.createRoom('hero', 0x000033),
            this.createRoom('about', 0x003300),
            this.createRoom('skills', 0x330033),
            this.createRoom('resume', 0x333300),
            this.createRoom('contact', 0x003333)
        ];
        
        this.rooms.forEach((room, i) => {
            room.position.z = -i * 20;
            this.scene.add(room);
        });
    }

    createRoom(name, color) {
        const room = new THREE.Group();
        
        // Create walls
        const geometry = new THREE.BoxGeometry(20, 10, 20);
        const material = new THREE.MeshPhongMaterial({
            color: color,
            side: THREE.BackSide,
            transparent: true,
            opacity: 0.5
        });
        
        const walls = new THREE.Mesh(geometry, material);
        room.add(walls);
        
        // Add floating particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 200;
        const positions = new Float32Array(particleCount * 3);
        
        for(let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = (Math.random() - 0.5) * 10;
            positions[i + 2] = (Math.random() - 0.5) * 20;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.05,
            transparent: true,
            opacity: 0.8
        });
        
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        room.add(particles);
        
        return room;
    }

    setupScrollTrigger() {
        gsap.registerPlugin(ScrollTrigger);
        
        const sections = document.querySelectorAll('section');
        sections.forEach((section, i) => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: 'bottom top',
                onUpdate: (self) => {
                    this.scrollProgress = self.progress;
                    this.currentSection = i;
                    
                    // Move camera
                    gsap.to(this.camera.position, {
                        z: 5 - (i * 20) - (self.progress * 20),
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                    
                    // Rotate rooms slightly based on mouse position
                    this.rooms.forEach((room) => {
                        room.rotation.y = this.mouseX * 0.1;
                        room.rotation.x = this.mouseY * 0.1;
                    });
                }
            });
        });
    }

    onMouseMove(event) {
        this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        // Animate particles
        this.rooms.forEach((room) => {
            room.children[1].rotation.y += 0.001;
            room.children[1].rotation.x += 0.001;
        });
        
        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Initialize the 3D scene
const scene3D = new Scene3D();
scene3D.animate();

// Event listeners
window.addEventListener('mousemove', (e) => scene3D.onMouseMove(e));
window.addEventListener('resize', () => scene3D.onResize()); 