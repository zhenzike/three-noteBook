# 基础

## 场景(scene)

场景能够让你在什么地方、摆放什么东西来交给three.js来渲染，这是放置物体、灯光和摄像机的地方。【==也就是用于绘制的地方==】

```js
const scene = new THREE.Scene();  //通过构造器生成一个场景
//-------------添加物体、灯光等--------------------
const camera = new THREE.PerspectiveCamera(....);
scene.add(camera);   //在场景中添加相机

const cube = new THREE.Mesh('立方体对象','材质');
scene.add(cube); // 将几何体添加到场景中

const light = new THREE.DirectionalLight('颜色', '灯光强度');
light.position.set(-1, 2, 4);  //灯光位置 v3
scene.add(light);  //添加灯光到场景
```



## 摄像机(Camera)

### 透视摄像机(PerspectiveCamera)

模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式

第一个参数是**视野角度（FOV）**。视野角度就是无论在什么时候，能在显示器上看到的场景的范围，它的单位是角度(与弧度区分开)。

第二个参数是**长宽比（aspect ratio）**。 也就是一个物体的宽除以它的高的值。

剩余两个参数是**近截面**（near）和**远截面**（far）。 当物体某些部分比摄像机的**远截面**远或者比**近截面**近的时候，该这些部分将不会被渲染到场景中。

```js
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// 设置相机位置
camera.position.set(0, 0, 10);
```

### lookAt()

lookAt( vector : [Vector3]) 或 lookAt ( x : Float, y : Float, z : Float ) 

- 参数可以是 一个表示世界空间中位置的向量，也可以使用世界空间中[x](http://127.0.0.1:5500/docs/index.html#api/zh/core/Object3D.x)、[y](http://127.0.0.1:5500/docs/index.html#api/zh/core/Object3D.y)和[z](http://127.0.0.1:5500/docs/index.html#api/zh/core/Object3D.z)的位置分量。

- 旋转物体使其在世界空间中面朝一个点。
- 属于基类（Object3D）

结合摄像机可让摄像机照向某一个点或者方向

```js
camera.lookAt(0,0,0) //让摄像机照向原点 【默认值】
```



## 绘制物体

### 几何体

要创建一个几何体，我们需要一个 几何体对象. 这个对象包含了一个几何体中所有的顶点（**vertices**）和面（**faces**）

```js
//这里创建了一个立方体对象
 const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
```

### 材质

对于一个几何体对象，需要提供一种**材质**来为其提供表面的素材以及颜色

```js
//这里使用的材质（MeshPhongMaterial）是一种用于具有镜面高光的光泽表面的材质，并设置了材质的颜色
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
```



### 物体

#### 网格(Mesh)

在拥有了几何体对象以及用于几何体的材质以后，最终需要将其生成一个物体实例

```js
//生成网格对象后，就可以将其放入场景中用于观察以及操作了
const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
const mesh = new THREE.Mesh( cubeGeometry, cubeMaterial );
scene.add( mesh );
```



## 灯光

### Light

光源的基类 - 所有其他的光类型都继承了该类描述的属性和方法。

```js
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);  //设置灯光颜色以及强度
light.position.set(-1, 2, 4);   //设置光源的灯光方向以及位置
scene.add(light);           
```



## 渲染器(renderer)

渲染器是thee.js的主要对象，传入一个场景(scene)和一个摄像机(Camera)到渲染器对象中，然后它==会将摄像机视椎体中的三维场景渲染成一个二维图片显示在画布==上。在使用构造器创建这个对象时，可以传入一些参数。具体见（<a href='https://threejs.org/docs/#api/zh/renderers/WebGLRenderer'>渲染器构造器 参数列表及方法等。。</a>）：

```js
//在场景中准备好所需的一切后，就可以将其渲染至画布上，并添加到DOM树中
// <div ref="cavas1" class="cavas1"></div>
// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
this.$refs.cavas1.appendChild(renderer.domElement);

// 使用渲染器，通过相机将场景渲染进来
renderer.render(scene, camera);
```



## 结合webAPI形成动画

```js
function render() {
    requestAnimationFrame(render);   //告诉浏览器——希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画,由于这个方法只会执行一次，所以需要这个回调函数中调用这个方法
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
render()
```



