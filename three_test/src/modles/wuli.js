import * as CANNON from "cannon-es";
import * as THREE from "three";


const world = new CANNON.World();
// 设置物理世界重力加速度
world.gravity.set(0, -9.8, 0); //单位：m/s²

//获取小球的物理模型以及物理特性
let { body, mesh, sphereMaterial } = getApr();

world.addBody(body);

let { meshdi, groundBody,groundMaterial } = getdi()
// 把关联的材质添加到物理世界中
world.addBody(groundBody);


const contactMaterial = new CANNON.ContactMaterial(groundMaterial, sphereMaterial, {
    restitution: 0.7, //反弹恢复系数
})
world.addContactMaterial(contactMaterial)




const gemo3 = new THREE.BoxGeometry(50, 25, 25);
const material3 = new THREE.MeshStandardMaterial({
    color: 'yellow',
})

const mesh3 = new THREE.Mesh(gemo3, material3);
mesh3.position.set(100, 200, 0);
mesh3.rotation.set(Math.PI / 3, Math.PI / 3, Math.PI / 3);

const boxMaterial = new CANNON.Material()
const zhuan = new CANNON.Box(new CANNON.Vec3(50, 25, 25));
const body3 = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(100, 200, 0),
    shape: zhuan,
    material: boxMaterial,
})
const contactMaterial2=new CANNON.ContactMaterial(groundMaterial, boxMaterial, {
    restitution: 0.2,
})
body3.quaternion.setFromEuler(Math.PI / 3, Math.PI / 3, Math.PI / 3);
world.addBody(body3);
world.addContactMaterial(contactMaterial2)



export { world, mesh, meshdi, mesh3 };


function getApr() {
    // 1m半径球体
    const bodyShape = new CANNON.Sphere(20);
    //小球材质
    const sphereMaterial = new CANNON.Material()

    // 可以把Body称为碰撞体,用来模拟生活中的物体
    const body = new CANNON.Body({
        mass: 0.3,
        position: new CANNON.Vec3(0, 200, 0),
        shape: bodyShape,//碰撞体的几何体形状
        material: sphereMaterial, // 材质
    });


    const gemo = new THREE.SphereGeometry(20, 20, 20);
    const material = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
    });
    const mesh = new THREE.Mesh(gemo, material);
    mesh.position.set(0, 200, 0);


    return { body, mesh, sphereMaterial };
}


function getdi() {
    const gemodi = new THREE.PlaneGeometry(500, 500);
    const materialdi = new THREE.MeshStandardMaterial({
        color: 'skyblue',
    })
    const meshdi = new THREE.Mesh(gemodi, materialdi);

    meshdi.rotation.x = -Math.PI / 2;


    //地面材质
    const groundMaterial = new CANNON.Material()
    // 物理地面
    const groundBody = new CANNON.Body({
        mass: 0, // 质量为0，始终保持静止，不会受到力碰撞或加速度影响
        shape: new CANNON.Plane(),
        material: groundMaterial,
    });
    // 改变平面默认的方向，法线默认沿着z轴，旋转到平面向上朝着y方向
    //旋转规律类似threejs 平面
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);



    return { meshdi, groundBody,groundMaterial };
}