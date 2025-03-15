<script setup>
import * as THREE from 'three'
import { ref, onMounted, onBeforeMount } from 'vue'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { getModel, keyStates, getkey, Animationtates } from '@/modles/diSanManyou.js'
let scene = null;
let camera = null;
let cameraControl = null;

let light = null;
let renderer = null;
let threeCanvas = ref();
let stats = null;
let gui = null;
let mesh = null
let mixer = null; // 新增 mixer 变量
let v = new THREE.Vector3(0, 0, 0);
let a = -3

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
    //添加一个辅助网格地面
    const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
    scene.add(gridHelper);

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


    // camera.position.set(20, 20, 20);
    // camera.lookAt(0, 0, 0);

}


/**
 * 
 *
 */
const OrbitControlsFn = () => {
    cameraControl = new OrbitControls(camera, renderer.domElement);
    cameraControl.target.set(0, 0, 0);
    cameraControl.update();
}

/**
 * 包围盒获取
 */

const getBox = (obj) => {
    const box = new THREE.Box3();
    box.expandByObject(obj);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3()
    box.getCenter(center)
    box.getSize(size);
    return {
        size: size,
        center: center,
    }
}


/**
 * 物体生成
 */
const meshFn = () => {
    getModel((model, mixer2) => {
        mesh = model
        mixer = mixer2
        scene.add(mesh)
        const group = new THREE.Group();
        group.add(camera)

        mesh.children[0].add(group)
        camera.position.set(0, 3.6, 2.5);
        camera.lookAt(0, 3.6, -20);//对着人身上某个点
        getkey(mesh.children[0], group);


        for(let k in Animationtates){
            Animationtates[k].play(); 
            if(k == 'idle'){
               Animationtates[k].weight=1.0
            }else{
                Animationtates[k].weight=0.0
            }
        }
       

    })
}






/**
* 灯光
*/
const lightFn = () => {
    const color = 0xFFFFFF;
    const intensity = 3;
    light = new THREE.DirectionalLight(color, intensity);  // 设置灯光颜色以及强度
    light.position.set(100, 100, 100);   // 设置光源的灯光方向以及位置


    const Hlight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(light, Hlight);
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
const clock = new THREE.Clock();
function render() {
    const frameT = clock.getDelta();//更新播放器时间
    if (mesh) {
        mixer.update(frameT);
        if (v.length() < 1000) {   //限速
            if (keyStates.W) {
                //先假设W键对应运动方向为z
                // const front = new THREE.Vector3(0, 0, 5);
                const front = new THREE.Vector3();

                //获取玩家角色(相机)正前方
                mesh.children[0].getWorldDirection(front);
                v.add(front.clone().multiplyScalar(frameT * a));  //加速度
            }
            if (keyStates.S) {
                // mesh.children[0].rotation.y = Math.PI;

                const front = new THREE.Vector3();
                mesh.children[0].getWorldDirection(front);
                v.add(front.clone().multiplyScalar(-frameT * a));  //加速度

            }
            if (keyStates.A) {//向左运动

                const front = new THREE.Vector3();
                mesh.children[0].getWorldDirection(front);
                const up = new THREE.Vector3(0, 1, 0);//y方向

                const left = up.clone().cross(front);
                v.add(left.multiplyScalar(a * frameT));
            }
            if (keyStates.D) {//向左运动

                const front = new THREE.Vector3();
                mesh.children[0].getWorldDirection(front);
                const up = new THREE.Vector3(0, 1, 0);//y方向

                const right = front.clone().cross(up);
                v.add(right.multiplyScalar(a * frameT));
            }


        }
        // //设置阻尼系数
        // v.addScaledVector(v, -0.008)
        // if (v.length() < 0.01) {
        //     v.set(0, 0, 0)
        // }
        let vNum = v.length()
        for (let k in Animationtates) {
            if (vNum == 0) {
                if (k == 'idle') {
                    Animationtates[k].weight = 1.0;
                } else {
                    Animationtates[k].weight = 0.0;
                }

            } else if (vNum > 0 && vNum < 10) {
                if (k == 'walk') {
                    Animationtates[k].weight = 1.0;
                } else {
                    Animationtates[k].weight = 0.0;
                }
            } else if (vNum > 10) {
                if (k == 'run') {
                    Animationtates[k].weight = 1.0;
                } else {
                    Animationtates[k].weight = 0.0;
                }
            }
        }
        mesh.position.add(v.clone().multiplyScalar(frameT));
    }
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
    // OrbitControlsFn();
    meshFn();

    lightFn();
    PointLightHelperFn();
    statsFn();
})

onMounted(() => {
    threeCanvas.value.appendChild(renderer.domElement);
    render();
    // cameraControl.addEventListener('change', () => {
    //     renderer.render(scene, camera);
    // });
})
</script>

<template>
    <div ref="threeCanvas">

    </div>
</template>

<style scoped></style>