<script setup>
import * as THREE from 'three'
import { ref, onMounted, onBeforeMount } from 'vue'
import Stats from 'three/examples/jsm/libs/stats.module'
import { mesh, pathArr } from '@/modles/manyou.js'
let scene = null;
let camera = null;


let light = null;
let renderer = null;
let threeCanvas = ref();
let stats = null;

let pathIndex = 0;


/**
* 场景
*/
const sceneFn = () => {
    scene = new THREE.Scene()

}

// 渲染器
const rendererFn = () => {
    renderer = new THREE.WebGLRenderer(
        {
            antialias: true
        }
    );
    //   renderer.setClearAlpha(0);

    // 设置渲染器的颜色输出编码
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // 设置渲染的尺寸大小

    renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
* 摄像头
*/
const cameraFn = () => {
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

     
      camera.position.set(pathArr[pathIndex].x,pathArr[pathIndex].y,pathArr[pathIndex].z);  // 摄像机的位置
    camera.lookAt(pathArr[pathIndex+1].x,pathArr[pathIndex+1].y,pathArr[pathIndex+1].z);
}


/**
 * 物体生成
 */
const meshFn = () => {
    scene.add(mesh);

}






/**
* 灯光
*/
const lightFn = () => {
    const color = 0xFFFFFF;
    const intensity = 3;
    light = new THREE.DirectionalLight(color, intensity);  // 设置灯光颜色以及强度
    light.position.set(-400, 400, 400);   // 设置光源的灯光方向以及位置


    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);
    scene.add(light);
}

/**
* 坐标辅助器
*/
const axesHelperFn = () => {
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
}

/**
* 点光源辅助器
*/
const PointLightHelperFn = () => {
    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
    scene.add(pointLightHelper);
}

/**
 * 
 */
const statsFn = () => {
    // 创建stats对象
    stats = new Stats();
    // stats. domElement:web页面上输出计算结果,一个div元素
    document.body.appendChild(stats.domElement);
}

function render() {
    stats.update();
    if(pathIndex>=pathArr.length-1){
        pathIndex=0
    }
    const path=pathArr[pathIndex]
    camera.position.set(path.x,path.y,path.z);  // 摄像机的位置
    pathIndex++
    camera.lookAt(pathArr[pathIndex].x,pathArr[pathIndex].y,pathArr[pathIndex].z);
    requestAnimationFrame(render);   // 告诉浏览器——希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画,由于这个方法只会执行一次，所以需要这个回调函数中调用这个方法
    renderer.render(scene, camera);
}

onBeforeMount(() => {
    rendererFn();
    sceneFn();
    axesHelperFn();
    cameraFn();
    meshFn();
    lightFn();
    PointLightHelperFn();
    statsFn();
})

onMounted(() => {
    threeCanvas.value.appendChild(renderer.domElement);
   
    render();

})
</script>

<template>
    <div ref="threeCanvas">

    </div>
</template>

<style scoped></style>