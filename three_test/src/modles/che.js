import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//正常显示模型
export const loadModel = (callback1, callback2) => {


    const textureCube = new THREE.CubeTextureLoader()
        .setPath('../../assets/img/')
        .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);



    const loader = new GLTFLoader();
    const Hmodel = new THREE.Group();

    loader.load("../../assets/轿车.glb", (gltf) => {
        // 将加载的模型添加到 group 中
        gltf.scene.traverse(obj => {
            if (obj.isMesh) {

                obj.material.metalness = 1
                obj.material.roughness = 0.5
                obj.material.envMap = textureCube


                //下方代码为汽车轮廓显示
                // obj.material.color = 0x004444
                // obj.material.transparent = true
                // obj.material.opacity = 0.5


                // const edges = new THREE.EdgesGeometry(obj.geometry);
                // const edgesMaterial = new THREE.LineBasicMaterial({
                //     color: 0x00ffff,
                // })
                // const line = new THREE.LineSegments(edges, edgesMaterial);
                // obj.add(line)
            }
        })
        Hmodel.add(gltf.scene);
        callback1(Hmodel);
    }, xhr => {
        const percent = xhr.loaded / xhr.total;
        callback2(percent);
    }, (error) => {
        // 处理加载错误
        console.error('模型加载失败:', error);
    });
}