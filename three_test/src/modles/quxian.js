import * as THREE from 'three'

// Shape表示一个平面多边形轮廓
const shape = new THREE.Shape([
    //按照特定顺序，依次书写多边形顶点坐标
    new THREE.Vector2(-50, -50),
    //多边形起点
    new THREE.Vector2(-50, 50),
    new THREE.Vector2(50, 50),
    new THREE.Vector2(50, -50),
]);

const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 10, // 拉伸高度
    bevelEnabled: true, // 开启倒角
    bevelThickness:20, // 倒角高度
    bevelSize: 30,//倒角尺寸:垂直拉伸方向
    bevelSegments:300, // 倒角段数 1就是直角
    bevelEnabled: false,//禁止倒角，默认true

})
const material = new THREE.MeshPhysicalMaterial({
    color: 'skyblue',
   
})

const mesh = new THREE.Mesh(geometry, material)
export default mesh;
