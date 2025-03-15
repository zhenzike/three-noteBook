import * as THREE from 'three'

// Shape表示一个平面多边形轮廓
const shape = new THREE.Shape();
shape.lineTo(100,0);
shape.lineTo(100,100);
shape.lineTo(0,100);



export default mesh;
