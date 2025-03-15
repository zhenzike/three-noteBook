import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


function createSprite() {
    const Group=new THREE.Group()
    const spriteTex = new THREE.TextureLoader().load('../../assets/img/雨滴.png')
    const spriteMaterial = new THREE.SpriteMaterial({
        map: spriteTex,
        transparent: true,
    })
    

    for(let i=0;i<1000;i++){
        const sprite=new THREE.Sprite(spriteMaterial)
        //雨滴的分布范围
        const x=Math.random()*1000-500
        const y=Math.random()*1000-500
        const z=Math.random()*1000-500
        const scale=Math.random()*10
        sprite.position.set(x,y,z)
        sprite.scale.set(scale,scale*1.2,1)
        Group.add(sprite)
    }
    
    loop(Group)
    return Group
}


let clock=new THREE.Clock()
function loop(Group){
    const elapsedTime=clock.getDelta() //loop(两次执行时间间隔
    Group.children.forEach((sprite)=>{
        sprite.position.y-=200*elapsedTime
        if(sprite.position.y<-500){
            sprite.position.y=500
        }
    }) 

    requestAnimationFrame(()=>{
        loop(Group)
    })
}



const gltfLoader = new GLTFLoader()
const model = new THREE.Group
const textureCube = new THREE.CubeTextureLoader()
    .setPath('../../assets/img/')
    .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
export const loadmodel = (callback1) => {
    gltfLoader.load('../../assets/工厂.glb', (gltf) => {
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.material.envMap = textureCube;
                child.material.envMapIntensity = 1.0;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        })

        model.add(gltf.scene,createSprite())
        callback1(model)
    })
}