import * as THREE from 'three'




const texload=new THREE.TextureLoader()
const texture=texload.load('assets/img/px.jpg')


//绘制圆形
const shape = new THREE.Shape();

//圆弧.arc参数的圆心0,0坐标是相对当前.currentPoint而言,而不是坐标原点
shape.arc(0, 0, 50, 0, Math.PI * 2);
const path1 = new THREE.Path();//圆孔1 
path1.absarc(0,0,40);
shape.holes.push(path1);

//绘制轨迹线
const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-10, -50, -50),
    new THREE.Vector3(-10, 100, -50),
    new THREE.Vector3(20, 200, 0),
    new THREE.Vector3(30, 300, 50),
    new THREE.Vector3(60, 300, 100)
]);

//扫描造型:扫描默认没有倒角
const geometry = new THREE.ExtrudeGeometry(
    shape,//扫描轮廓
    {
        extrudePath: curve,//扫描轨迹
        steps:10000//沿着路径细分精度,越大越光滑
    },

);


const material = new THREE.MeshLambertMaterial({
    color: 'skyblue',
    map:texture,
    side:THREE.DoubleSide,
})

const pathArr=curve.getPoints(100);
const mesh = new THREE.Mesh(geometry, material)
export {mesh,pathArr};
