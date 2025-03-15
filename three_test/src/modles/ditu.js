import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import ditu from '../../assets/posData/data.js'


console.log(ditu);
const posData = [];
ditu.forEach((item) => {
    posData.push(new THREE.Vector2(item[0], item[1]));
})

console.log(posData);
const shape = new THREE.Shape(posData);
const geometry = new THREE.ShapeGeometry(shape);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const Hmodel = new THREE.Mesh(geometry, material);



export default Hmodel;