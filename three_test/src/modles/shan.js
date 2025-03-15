import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const Hmodel = new THREE.Group();
loader.load("../../assets/地形.glb", (gltf) => {

    Hmodel.add(gltf.scene);
    const mesh = gltf.scene.children[0];
    const pos = mesh.geometry.attributes.position; const count = pos.count;
    //1.计算模型y坐标高度差
    const yArr = []//顶点所有y坐标，也就是地形高度
    for (let i = 0; i < count; i++) {
        yArr.push(pos.getY(i));//获取顶点y坐标，也就是地形高度
    }
    yArr.sort();//数组元素排序，从小到大
    const miny = yArr[0];//y最小值
    const maxy = yArr[yArr.length - 1];//y最大值
    const height = maxy - miny;//山脉整体高度


    //2.计算每个顶点的颜色值
    const colorsArr = [];
    const c1 = new THREE.Color(0x0000ff);//山谷颜色
    const c2 = new THREE.Color(0xff0000);//山顶颜色
    for (let i = 0; i < count; i++) {
        //当前高度和整体高度比值
        const percent = (pos.getY(i) - miny) / height;
        const c = c1.clone().lerp(c2, percent);//颜色插值计算
        colorsArr.push(c.r, c.g, c.b);
    }
    const colors = new Float32Array(colorsArr);
    //设置几何体attributes属性的颜色color属性
    mesh.geometry.attributes.color = new THREE.BufferAttribute(colors, 3)

    mesh.material = new THREE.MeshPhysicalMaterial({
        vertexColors: true,
    });


    Hmodel.add(mesh);
}, undefined, (error) => {
    // 处理加载错误
    console.error('模型加载失败:', error);
});

export default Hmodel;