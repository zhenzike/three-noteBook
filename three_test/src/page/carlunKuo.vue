<script setup>
import * as THREE from 'three'
import { ref, onMounted, onBeforeMount } from 'vue'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { loadModel } from '@/modles/che.js'
let scene = null;
let camera = null;
let cameraControl = null;
let mesh = null;
let light = null;
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
    }
  );
  renderer.setClearAlpha(0);

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

  camera.position.set(-300, 300, 300);  // 摄像机的位置
  camera.lookAt(0, 0, 0);
  cameraControl = new OrbitControls(camera, renderer.domElement);
}


/**
 * ui控制车的属性
 */
const meshFn = () => {
  loadModel((Hmodel) => {


    scene.add(Hmodel);
  },(percent)=>{
    // console.log(percent);
  })

}






/**
* 灯光
*/
const lightFn = () => {
  const color = 0xFFFFFF;
  const intensity = 3;
  light = new THREE.DirectionalLight(color, intensity);  // 设置灯光颜色以及强度
  light.position.set(-400, 400, 400);   // 设置光源的灯光方向以及位置
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
  // textrue22.offset.x += 0.01;
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
  PointLightHelperFn();
  statsFn();
})

onMounted(() => {
  threeCanvas.value.appendChild(renderer.domElement);
  render();
  // renderer.render(scene, camera);
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