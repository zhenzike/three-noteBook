<script setup>
import * as THREE from 'three'
import { ref, onMounted, onBeforeMount } from 'vue'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { loadmodel } from '@/modles/gongchang.js'
let scene = null;
let camera = null;
let cameraControl = null;

let light = {
    pingx: null,
    huanj: null,
};
let renderer = null;
let threeCanvas = ref();
let stats = null;
let gui = null;

/**
 * 创建gui
 */
const createrGui = () => {
    gui = new GUI();

}

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
        },
       
    );
    //   renderer.setClearAlpha(0);
    renderer.shadowMap.enabled = true;
    // 设置渲染器的颜色输出编码
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.type = THREE.VSMShadowMap;
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
        30,
        1000
    );

    camera.position.set(300, 300, 300);
    camera.lookAt(0, 0, 0);
    cameraControl = new OrbitControls(camera, renderer.domElement);

}




/**
 * 物体生成
 */
const meshFn = () => {
    loadmodel((mesh) => {
        scene.add(mesh);
    })

}






/**
* 灯光
*/
const lightFn = () => {
    light.huanj = new THREE.AmbientLight(0xFFFFFF, 0.5);  // 设置灯光颜色以及强度
    light.pingx = new THREE.DirectionalLight(0xFFFFFF, 0.5)
    light.pingx.position.set(100, 100, 100)
    light.pingx.castShadow = true;
    let lightPinHelp = new THREE.DirectionalLightHelper(light.pingx, 5);


    let obj = {
        angle: 0,
    }
    gui.add(obj, 'angle', 0, Math.PI * 2).onChange((value) => {
        light.pingx.position.x = 100 * Math.sin(value);
        light.pingx.position.z = 100 * Math.cos(value);
        lightPinHelp.update()
    })

  

     light.pingx.shadow.camera.left = -100;
     light.pingx.shadow.camera.right = 100;
     light.pingx.shadow.camera.top = 100;
     light.pingx.shadow.camera. bottom =-100;
     light.pingx.shadow.camera. near = 0.5;
     light.pingx.shadow.camera.far = 300;
     let cameraCon=new THREE.CameraHelper( light.pingx.shadow.camera)
     scene.add(cameraCon)

    scene.add(light.huanj, light.pingx, lightPinHelp);
}

/**
* 坐标辅助器
*/
const axesHelperFn = () => {
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
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

    requestAnimationFrame(render);   // 告诉浏览器——希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画,由于这个方法只会执行一次，所以需要这个回调函数中调用这个方法
    renderer.render(scene, camera);
}

onBeforeMount(() => {
    createrGui();
    rendererFn();
    sceneFn();
    axesHelperFn();
    cameraFn();
    meshFn();
    lightFn();
    statsFn();
})

onMounted(() => {
    threeCanvas.value.appendChild(renderer.domElement);
    render();
    cameraControl.addEventListener('change', () => {
        renderer.render(scene, camera);
    });
})
</script>

<template>
    <div ref="threeCanvas">

    </div>
</template>

<style scoped></style>