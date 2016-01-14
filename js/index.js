var container;
var camera, scene, renderer;
var uniforms;

init();
animate();

var w, h;

function init(){
    container = document.getElementById('bknd');

    w = window.innerWidth;
    h = window.innerHeight;

    camera = new THREE.Camera();
    camera.position.z = 1;

    scene = new THREE.Scene();

    var geometry = new THREE.PlaneBufferGeometry(2,2);
    //var geometry = new THREE.BoxGeometry(1,1,1);

    uniforms = {
        u_time: { type:'f', value:1.0 },
        u_resolution: { type:'v2', value: new THREE.Vector2() }
    };

    var material = new THREE.ShaderMaterial({
        uniforms:uniforms,
        vertexShader:document.getElementById('vertexShader').textContent,
        fragmentShader:document.getElementById('fragmentShader').textContent
    });

    var mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    onWindowResize();
    window.addEventListener('resize',onWindowResize,false);
}

function onWindowResize(event){
	w = window.innerWidth;
	h = window.innerHeight;

    renderer.setSize(w,h);
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate(){
    requestAnimationFrame(animate);
    render();
}

function render(){
    uniforms.u_time.value += 0.05;
    renderer.render(scene,camera);
}