import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';






const textureCube = new THREE.CubeTextureLoader()
.setPath('../../assets/img/')
.load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

const loader = new GLTFLoader();
const Hmodel = new THREE.Group();
loader.load("../../assets/金属.glb", (gltf) => {
    // 将加载的模型添加到 group 中
    gltf.scene.traverse(obj=>{
        if(obj.isMesh){
          
             obj.material.metalness=1
             obj.material.roughness=0.5
             obj.material.envMap=textureCube
             obj.material.clearcoat=1
        }
    })
    Hmodel.add(gltf.scene);
}, undefined, (error) => {
    // 处理加载错误
    console.error('模型加载失败:', error);
});

export default Hmodel;