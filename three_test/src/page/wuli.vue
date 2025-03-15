
<script setup>
import {world,mesh,meshdi,mesh3} from '@/modles/wuli.js'
import { ref, onMounted,onBeforeMount } from 'vue'

import * as THREE from 'three'
let threeCanvas = ref();
let scene = null;
let camera = null;
let renderer = null;


const getMesh = () => {
    scene.add(mesh,meshdi,mesh3)
}



const rendererFn = () => {
    renderer = new THREE.WebGLRenderer(
        {
            antialias: true
        }
    )
  
    // 设置渲染器的颜色输出编码
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // 设置渲染的尺寸大小

    renderer.setSize(window.innerWidth, window.innerHeight);
}

const render = () => {
    world.step(1 / 60)
    mesh.position.copy(world.bodies[0].position)
    mesh3.position.copy(world.bodies[2].position)
    mesh3.quaternion.copy(world.bodies[2].quaternion)
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}


const domSize = () => {
    window.onresize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
}


onBeforeMount(() => {
    rendererFn();
    sceneFn();
})

onMounted(() => {
    threeCanvas.value.appendChild(renderer.domElement);
    getMesh()
    render()

})


const sceneFn = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('black');
    lightFn();
    cameraFn();
    domSize()
}


const lightFn = () => {
    const light = new THREE.AmbientLight(0xffffff, 0.5);
    const light2 = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light, light2);
}
const cameraFn = () => {
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(-300, 300, 300);  // 摄像机的位置
    camera.lookAt(0, 0, 0);
    
}



</script>

<template>
    <div ref="threeCanvas">

    </div>
</template>

<style scoped></style>