import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';



// 声明一个对象keyStates用来记录键盘事件状态
export const keyStates = {
    // 使用W、A、S、D按键来控制前、后、左、右运动
    // false表示没有按下，true表示按下状态
    W: false,
    A: false,
    S: false,
    D: false,
    leftButtonBool: false,
};

export const Animationtates = {
    idle: null,  //空闲
    run: null,  //跑步
    tPose: null, //
    walk: null,  //走路
};

export const getModel = (callback1, callback2) => {

    const gltftLoader = new GLTFLoader();
    const Hmodel = new THREE.Group();

    gltftLoader.load("../../assets/士兵.glb", (gltf) => {
        Hmodel.add(gltf.scene);
  
        Hmodel.scale.set(10, 10, 10);
        const mixer=new THREE.AnimationMixer(gltf.scene);
        Animationtates.idle = mixer.clipAction(gltf.animations[0]);
        Animationtates.run =mixer.clipAction( gltf.animations[1]);
        Animationtates.tPose =mixer.clipAction( gltf.animations[2]);
        Animationtates.walk = mixer.clipAction(gltf.animations[3]);

        callback1(Hmodel,mixer);
    })

}



export const getkey = (mesh, cameraGroup) => {

    // 当某个键盘按下设置对应属性设置为true
    document.addEventListener('keydown', (event) => {

        if (event.code === 'KeyW') keyStates.W = true;
        if (event.code === 'KeyA') keyStates.A = true;
        if (event.code === 'KeyS') keyStates.S = true;
        if (event.code === 'KeyD') keyStates.D = true;
    });
    // 当某个键盘抬起设置对应属性设置为false
    document.addEventListener('keyup', (event) => {
        if (event.code === 'KeyW') keyStates.W = false;
        if (event.code === 'KeyA') keyStates.A = false;
        if (event.code === 'KeyS') keyStates.S = false;
        if (event.code === 'KeyD') keyStates.D = false;
    });


    if (mesh) {
        document.addEventListener('mousemove', (event) => {
            // 注意rotation.y += 与 -= 区别，左右旋转时候方向相反
            //event.movementX缩小一定倍数改变旋转控制的灵敏度
            // 上下俯仰角度范围
            const angleMin = THREE.MathUtils.degToRad(-15);//角度转弧度
            const angleMax = THREE.MathUtils.degToRad(15);
            if (keyStates.leftButtonBool) {
                mesh.rotation.y -= event.movementX / 600;
                cameraGroup.rotation.x -= event.movementY / 600;
                // 一旦判断.rotation.x小于-15，就设置为-15，大于15，就设置为15
                if (cameraGroup.rotation.x < angleMin) {
                    cameraGroup.rotation.x = angleMin;
                }
                if (cameraGroup.rotation.x > angleMax) {
                    cameraGroup.rotation.x = angleMax
                };
            }
        });




        document.addEventListener('mousedown', () => {
            keyStates.leftButtonBool = true;
        });
        document.addEventListener('mouseup', () => {
            keyStates.leftButtonBool = false;
        });
    }
}