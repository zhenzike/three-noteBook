# cesium基础

## 安装

```js
npm install cesium@1.93.0
//最新版是2.5.0
```

## 基础设置

**引入css**:

```js
import "cesium/Build/Cesium/Widgets/widgets.css";

// 设置 Cesium 资源路径
//token令牌需要前往https://ion.cesium.com/ 注册并获取
Cesium.Ion.defaultAccessToken = 'YOUR_ACCESS_TOKEN';


//设置cesium静态资源路径
window.CESIUM_BASE_URL = '/node_modules/cesium/Build/Cesium/';
```

**挂载画布**：

```js
//挂载以及基本设置
let viewer = new Cesium.Viewer(cesiumCon.value, {
    //是否显示信息窗口，点击显示模型信息
    infoBox: false,
    //是否显示默认的地点搜索窗口
    geocoder: false,
    //是否显示回到相机默认看向位置
    homeButton: false,
    //是否显示2D/3D切换按钮
    sceneModePicker: false,
    //是否显示切换瓦片地图按钮
    baseLayerPicker: false,
    //是否显示Help按钮
    navigationHelpButton: false,
    //是否显示动画控制按钮
    animation: false,
    //是否显示时间轴
    timeline: false,
    //是否显示全屏按钮
    fullscreenButton: false,
    //是否开启框选动画【点击实体时会出现选择框选动画】
     selectionIndicator: false
})
//隐藏LOGO以及版权信息
viewer.cesiumWidget.creditContainer.style.display = 'none' 
```

**设置默认视角**：

```js
//如果不设置，默认对向美国
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
    //西边的经度
    89.5,
    //南边维度
    20.4,
    //东边经度
    110.4,
    //北边维度
    61.2
)
```

## 天空盒设置【宇宙背景】

```js
const skyboxImages = import.meta.glob('@/assets/imgs/sky/*.jpg', { eager: true });
let viewer = new Cesium.Viewer(cesiumCon.value, {
 //设置天空盒[宇宙背景：默认为星空]
    skyBox: new Cesium.SkyBox({
        sources: {
            positiveX: getURL('px'),
            negativeX: getURL('nx'),
            positiveY: getURL('ny'),
            negativeY: getURL('py'),
            positiveZ: getURL('pz'),
            negativeZ: getURL('nz')
        }
    })
})
const getURL = (url) => {
    const key = `/src/assets/imgs/sky/${url}.jpg`;
    return skyboxImages[key]?.default || '';
}
```

## 自定义地图

**使用国内天地图瓦片**：

```js
let viewer = new Cesium.Viewer(cesiumCon.value, {
    imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
        url: "http://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=tk",
        layer: "tdtBasicLayer",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible",
    }),
})
```

### 图层叠加

```js
var imageryLayers = viewer.imageryLayers;
var layer = imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider(//.....);
layer.alpha = 8.5;
```

### 添加地形

可以前往地理空间数据云下载 自定义的地形数据

```js
//挂载以及基本设置
let viewer = new Cesium.Viewer(cesiumCon.value, {
    //添加地形【这里使用自带的地形数据】
    terrainProvider: new Cesium.createWorldTerrain({
        //模拟出水面的反射、折射等效果
        requestWaterMask: true,
        //添加法线，用于对光的反射、投影
        requestVertexNormals: true,
    }),
     //如果想使用自定义的地形文件，可以使用下方代码
    terrainProvider: new Cesium.cesiumTerrainProvider({
          url:'自定义文件路径'
    })
})



```



### 配置模板

#### 1. `WebMapTileServiceImageryProvider`

用于加载 WMTS（Web Map Tile Service）服务的影像数据。

```javascript
const viewer = new Cesium.Viewer('cesiumContainer');
const wmtsImageryProvider = new Cesium.WebMapTileServiceImageryProvider({
    url: 'https://your-wmts-service-url',
    layer: 'your-layer-name',
    style: 'default',
    format: 'image/jpeg',
    tileMatrixSetID: 'your-tile-matrix-set-id',
    tileMatrixLabels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
    maximumLevel: 19
});
viewer.imageryLayers.addImageryProvider(wmtsImageryProvider);
```

#### 2. `ArcGisMapServerImageryProvider`

用于加载 ArcGIS Map Server 服务的影像数据。

```javascript
const viewer = new Cesium.Viewer('cesiumContainer');
const arcgisImageryProvider = new Cesium.ArcGisMapServerImageryProvider({
    url: 'https://your-arcgis-service-url'
});
viewer.imageryLayers.addImageryProvider(arcgisImageryProvider);
```

#### 3. `BingMapsImageryProvider`

用于加载 Bing Maps 的影像数据。

```javascript
const viewer = new Cesium.Viewer('cesiumContainer');
const bingImageryProvider = new Cesium.BingMapsImageryProvider({
    url: 'https://dev.virtualearth.net',
    key: 'your-bing-maps-api-key',
    mapStyle: Cesium.BingMapsStyle.AERIAL
});
viewer.imageryLayers.addImageryProvider(bingImageryProvider);
```

#### 4. `OpenStreetMapImageryProvider`

用于加载 OpenStreetMap 的影像数据。

```javascript
const viewer = new Cesium.Viewer('cesiumContainer');
const osmImageryProvider = new Cesium.OpenStreetMapImageryProvider({
    url: 'https://a.tile.openstreetmap.org/'
});
viewer.imageryLayers.addImageryProvider(osmImageryProvider);
```

#### 5. `SingleTileImageryProvider`

用于加载单张图片作为影像数据。

```javascript
const viewer = new Cesium.Viewer('cesiumContainer');
const singleTileImageryProvider = new Cesium.SingleTileImageryProvider({
    url: 'path/to/your/image.jpg',
    rectangle: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90)
});
viewer.imageryLayers.addImageryProvider(singleTileImageryProvider);
```

## 坐标系转换

```js
// 1/屏幕坐标系统，二维的笛卡尔坐标系，Cartesian2类型
// 2/地理坐标系统，WGS-84坐标系，Cartographic类型,经度，纬度，高度
// 3/笛卡尔空间直角坐标系，Cartesian3类型

// 角度转换弧度
var radians = Cesium.Math.toRadians(90);
console.log(radians);
// 弧度转角度
var degrees = Cesium.Math.toDegrees(2 * Math.PI);
console.log(degrees);

// 将经纬度转为笛卡尔坐标
var cartesian3 = Cesium.Cartesian3.fromDegrees(
    // 经度
    89.5,
    // 纬度
    20.4,
    // 高度
    100
);
console.log(cartesian3);

// 将笛卡尔坐标转为经纬度
var cartographic = Cesium.Cartographic.fromCartesian(cartesian3);
```

# 相机

## 相机位置瞬间到达

```js
// setview瞬间到达指定位置，视角
// 生成position是天安门的位置
var position = Cesium.Cartesian3.fromDegrees(116.393428, 39.90923, 100);
viewer.camera.setView({
    // 指定相机位置
    destination: position,
    // 指定相机视角,在XYZ坐标系中，相机是处于z轴的正方向
    orientation: {
        // 指定相机的朝向,偏航角 ，相机沿着y轴的旋转角度，控制相机左右旋转
        heading: Cesium.Math.toRadians(0),
        // 指定相机的俯仰角,0度是竖直向上,-90度是向下
        //相机沿着x轴的旋转角度，控制相机上下旋转
        pitch: Cesium.Math.toRadians(-20),
        // 指定相机的滚转角,翻滚角
        // //相机沿着Z轴的旋转角度，控制相机自身的旋转视角
        roll: 0,
    },
});
```

## 过渡到达

```js
// flyto,让相机飞往某个地方
viewer.camera.flyTo({
    destination: position,
     duration:2,  //过渡花费时间
    orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-20),
        roll: 0,
    },
});
```

## 控制相机

- **`positionCartographic`**：相机的位置可以用不同的坐标系统来表示。`positionCartographic` 是将相机位置以地理坐标系（Cartographic）来表示，地理坐标系使用经度（longitude）、纬度（latitude）和高度（height）三个值来确定一个点在地球上的位置。
- **`height`**：这是 `positionCartographic` 对象的一个属性，它表示相机相对于地球表面（参考椭球体）的垂直高度，单位通常是米。

```js
document.addEventListener("keydown", (e) => {
    let height = viewer.camera.positionCartographic.height;
    let moveSpeed = height/100; // 移动速度
    if (e.key == "w") {
        viewer.camera.moveForward(moveSpeed)  //向前移动，数值为移动速率
    }else if (e.key == "s") {
        viewer.camera.moveBackward(moveSpeed)  //向后移动，数值为移动速率 
    }else if (e.key == "a") {
        viewer.camera.moveLeft(moveSpeed)  //向左移动，数值为移动速率 
    }else if (e.key == "d") {
        viewer.camera.moveRight(moveSpeed)  //向右移动，数值为移动速率 
    }else if (e.key == "q") {
        viewer.camera.lookLeft(Cesium.Math.toRadians(0.1))  //向左边看，数值为旋转速率,值为弧度
    }else if (e.key == "e") {
        viewer.camera.lookRight(Cesium.Math.toRadians(0.1))  //向右边看，数值为旋转速率 ,值为弧度
    }else if (e.key == "z") {
        viewer.camera.twistLeft(Cesium.Math.toRadians(0.1))  //向左自身逆时针旋转，数值为旋转速率,值为弧度
        //  viewer.camera.twistRight(Cesium.Math.toRadians(0.1))  //向右自身顺时针旋转，数值为旋转速率,值为弧度
    }
})
```

# 实体与图元

## entities

在 Cesium 中，`viewer.entities` 是一个 `EntityCollection` 类型的对象，它主要用于管理和操作场景中的实体（`Entity`）

###  `add(entity)`

- **作用**：向实体集合中添加一个新的实体。

```
// 创建一个点实体
var pointEntity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    point: {
        pixelSize: 10,
        color: Cesium.Color.YELLOW
    }
});
```

### `remove(entity)`

- **作用**：从实体集合中移除指定的实体。

```javascript
// 移除之前添加的点实体
viewer.entities.remove(pointEntity);
```

### `removeAll()`

- **作用**：移除实体集合中的所有实体。

```javascript
// 移除所有实体
viewer.entities.removeAll();
```

### `getById(id)`

- **作用**：根据实体的 ID 获取对应的实体。

```javascript
// 创建一个带有ID的实体
var entityWithId = viewer.entities.add({
    id: 'myEntity',
    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    point: {
        pixelSize: 10,
        color: Cesium.Color.RED
    }
});

// 根据ID获取实体
var retrievedEntity = viewer.entities.getById('myEntity');
```

### 创建点

```js
let point = viewer.entities.add({
    position:Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 20),
    point: {
        //不能直接使用颜色字符串或者RGB值
        color: Cesium.Color.RED, // 点的颜色
        pixelSize: 10, // 点的大小
        outlineColor: Cesium.Color.WHITE, // 点的轮廓颜色
        outlineWidth: 4, // 点的轮廓宽度
    }
})
```

## 添加3D建筑

```js
const osmBuildings=viewer.scene.primitives.add(
    //cesium自带的3d建筑
    new Cesium.createOsmBuildings()
)
```

### 对建筑物的颜色进行过滤或者反转

```js
export default function modtifyMap(viewer) {
    //获取影像图层            
    let baseLayer = viewer.imageryLayers.get(0);
    baseLayer.invertColor = true;
    baseLayer.filterRGB = [0, 50, 100]

    //获取地图着色器代码
    const baseFragementShader =
          viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources;
    // console.log(baseFragementShader);

    //修改着色器代码
    for (let i = 0; i < baseFragementShader.length; i++) {
        const strS = "color = czm_saturation(color, textureSaturation);\n#endif\n";
        let strT = "color = czm_saturation(color, textureSaturation);\n#endif\n";
        if (baseLayer.invertColor) {
            strT += `
        color.r = 1.0 - color.r;
        color.g = 1.0 - color.g;
        color.b = 1.0 - color.b;
      `;
        }
        if (baseLayer.filterRGB) {
            strT += `
        color.r = color.r*${baseLayer.filterRGB[0]}.0/255.0;
        color.g = color.g*${baseLayer.filterRGB[1]}.0/255.0;
        color.b = color.b*${baseLayer.filterRGB[2]}.0/255.0;
      `;
        }

        baseFragementShader[i] = baseFragementShader[i].replace(strS, strT);
    }

}
```

## primitives&entities&scene的区别

###  `viewer.scene.primitives`

- **性能要求极高**：如果要添加的模型是大规模的，比如包含大量顶点的地形模型、海量的点云数据，使用 `primitives` 能获得更好的性能。因为图元的渲染是直接在底层进行的，减少了中间层的开销。

```javascript
// 示例：添加一个简单的地面图元
var groundPrimitive = new Cesium.GroundPrimitive({
    geometryInstances: new Cesium.GeometryInstance({
        geometry: new Cesium.RectangleGeometry({
            rectangle: Cesium.Rectangle.fromDegrees(-120.0, 20.0, -60.0, 40.0)
        })
    }),
    appearance: new Cesium.PerInstanceColorAppearance({
        flat: true
    })
});
viewer.scene.primitives.add(groundPrimitive);
```

- **需要精细控制渲染过程**：当需要对模型的渲染过程进行精细控制，例如自定义着色器、光照效果等，使用 `primitives` 更合适，因为可以直接操作图元的属性和状态。

###  `viewer.entities`

- **快速开发和简单操作**：如果只是想快速添加一个模型，并且不需要对渲染过程进行精细控制，使用 `entities` 会更方便。实体提供了简单的 API 来设置模型的位置、方向、缩放等属性。

```javascript
// 示例：添加一个 3D 模型实体
var modelEntity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-75.62898254394531, 40.02804946899414, 0.0),
    model: {
        uri: 'path/to/your/model.glb'
    }
});
```

- **需要添加动画和交互**：实体支持添加动画和事件处理，如果你需要为模型添加动画效果或处理用户交互，使用 `entities` 会更合适。

### 不直接向 `viewer.scene` 添加模型

通常情况下，不直接向 `scene` 添加模型，因为 `scene` 是一个更高级别的管理对象，它主要负责场景的整体设置和渲染流程的控制。模型的添加和管理应该通过 `primitives` 或 `entities` 来完成。

## 标签

```js
 let label=viewer.entities.add({
        position:Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 20), 
        label:{
            text:"广州塔",
            font:"14px Microsoft YaHei",
            fillColor:Cesium.Color.WHITE,
            outlineColor:Cesium.Color.BLACK,
            outlineWidth:2,
            //Cesium.LabelStyle 属于一个枚举类型，它定义了标签的不同显示样式
            //FILL_AND_OUTLINE 代表标签会同时显示填充颜色和轮廓线
            //FILL 代表标签只显示填充颜色
            //OUTLINE 代表标签只显示轮廓线
            style:Cesium.LabelStyle.FILL_AND_OUTLINE,
            //设置文字的偏移量，向y轴负方向偏移30像素
            pixelOffset:new Cesium.Cartesian2(0,-30),
            //设置文字的水平显示位置,设置对齐方式是居中还是左右对齐
            horizontalOrigin:Cesium.HorizontalOrigin.CENTER,
            //设置文字的垂直显示位置,设置对齐方式是居中还是上下对齐
         
```

### 广告牌

`billboard` 属性是 `Entity` 对象的一个属性，其用途是在三维场景中添加一个广告牌（Billboard）。广告牌是一种始终面向相机的二维图像，常用于标记特定的地理位置、显示图标等

**常用属性**：

- **`image`**：用于指定广告牌所显示的图像，可以是图像的 URL 或者 `HTMLImageElement` 对象。
- **`scale`**：用于设置广告牌的缩放比例，默认值为 1.0。
- **`pixelOffset`**：用于设置广告牌相对于其位置的像素偏移量。
- **`color`**：用于设置广告牌的颜色，会与图像颜色相乘。
- **`horizontalOrigin`** 和 **`verticalOrigin`**：用于设置广告牌的水平和垂直原点，决定了广告牌相对于其位置的对齐方式。
- **`eyeOffset`**：用于设置广告牌相对于相机位置的偏移量，可实现一些立体效果。
- **`distanceDisplayCondition`**：用于设置广告牌的显示距离范围，只有在指定的距离范围内才会显示。

```js
let label = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 20),
    label: {
        //........
    },
    billboard: {
        image: new URL("@/assets/imgs/gzt.png", import.meta.url).href,
        width: 20,//图片的宽度
        height: 20,//图片的高度             
        pixelOffset: new Cesium.Cartesian2(60, 0),
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        scale:5,
        //设置广告牌的可见距离，类似相机的远近裁剪
        distanceDisplayCondition:new Cesium.DistanceDisplayCondition(1000, 10000)
    }
})
```

## 添加3D建筑模型

```js
const airPlane = viewer.entities.add({
    name: '飞机',
    position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 1200),
    model: {
        uri: new URL("@/assets/models/Air.glb", import.meta.url).href,
        //设置模型的最小像素尺寸，当模型的尺寸小于这个值时，模型将不会被显示
        minimumPixelSize: 128,
        //当 runAnimations 为 true 时，如果 Air.glb 模型文件中包含动画数据，Cesium 会自动播放这些动画
        // runAnimations: true,
        // 设置飞机的轮廓
        silhouetteSize: 5,
        // 设置轮廓的颜色
        silhouetteColor: Cesium.Color.WHITE,
        // 设置相机距离模型多远的距离显示
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000),
    }
})
```

## 设置2D几何体

### **entity【实体】创建矩形**:

```js
// 使用entity创建矩形,这里为直接添加到entities
var rectangle = viewer.entities.add({
    rectangle: {
        //这里的经纬度，不是用4个点来确定一个矩形，
        //而是分别用某一个经纬度来形成一条线，总共4个边界，框出来一个矩形
        coordinates: Cesium.Rectangle.fromDegrees(
            // 西边的经度
            90,
            // 南边维度
            20,
            // 东边经度
            110,
            // 北边维度
            30
        ),
        hole:[   //可以使用hole来对几何体进行打动【可以嵌套】
            positon:''//....
        ]
        material: Cesium.Color.RED.withAlpha(0.5),
},
                                    });

//声明一个实体
var rectangle = new Cesium.Entity({
    rectangle: {
        // 这里的经纬度，不是用 4 个点来确定一个矩形，
        // 而是分别用某一个经纬度来形成一条线，总共 4 个边界，框出来一个矩形
        coordinates: Cesium.Rectangle.fromDegrees(
            // 西边的经度
            90,
            // 南边维度
            20,
            // 东边经度
            110,
            // 北边维度
            30
        ),
        // 原代码中 hole 写法有误，正确的应该是 hierarchy 来定义洞
        // 这里简单给出示例，你可以根据需求修改
        hierarchy: [
            Cesium.Rectangle.fromDegrees(92, 22, 108, 28)
        ],
        material: Cesium.Color.RED.withAlpha(0.5)
    }
});
```

### **primivite【图元】创建矩形**:

```js
// 01-创建几何体
let rectGeometry = new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(
        // 西边的经度
        115,
        // 南边维度
        20,
        // 东边经度
        135,
        // 北边维度
        30
    ),
    // 距离表面高度
    height: 0,
    //使用vertexFormat来指定顶点格式：
    //如果使用PerInstanceColorAppearance这种外观【材质】来渲染几何体，
    //则需要【外观（材质）】的顶点数据至少包括了位置positon、颜色color这两种属性
    //其中position已经在rectangle给出，颜色color可以在实例中声明
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
});

// 02-创建几何体实例
let instance = new Cesium.GeometryInstance({
    geometry: rectGeometry,
    attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.RED.withAlpha(0.5)
        ),
    },
});

// 03-设置外观颜色的上色方式
let appearance = new Cesium.PerInstanceColorAppearance({
    flat:false,
});
// 04-图元
let primitive = new Cesium.Primitive({
    geometryInstances: instance,
    appearance: appearance,
});
```

## 设置3D几何体

**创建长方体**：

```js
// 使用 entity 创建具有高度的矩形
var rectangle = viewer.entities.add({
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(
            // 西边的经度
            90,
            // 南边维度
            20,
            // 东边经度
            110,
            // 北边维度
            30
        ),
        // 长方体底部距离地表的高度
        height: 0,
        // 长方体从底部向上拉伸的高度
        extrudedHeight:20000,
        material: Cesium.Color.RED.withAlpha(0.5),
        // 显示长方体的轮廓
        outline: true,
        outlineColor: Cesium.Color.BLACK
    }
});    
```

**创建3D多边形**：

```js
// 创建 Cesium Viewer
var viewer = new Cesium.Viewer('cesiumContainer');

// 定义多边形的顶点经纬度数组
var polygonPositions = Cesium.Cartesian3.fromDegreesArray([
    90, 20,
    92, 22,
    95, 21,
    93, 19
]);

// 创建立体多边形实体
var solidPolygon = viewer.entities.add({
    polygon: {
        hierarchy: polygonPositions,
        // 多边形底部距离地面的高度
        height: 0,
        // 多边形从底部向上拉伸的高度
        extrudedHeight: 100,
        material: Cesium.Color.BLUE.withAlpha(0.5),
        // 显示多边形的轮廓
        outline: true,
        outlineColor: Cesium.Color.BLACK
    }
});    

//或者使用fromDegreesArrayHeights

// 示例经纬度和高度数组
const degreesArrayHeights = [
    110, 30, 100,
    111, 31, 200,
    112, 32, 300
];

// 转换为笛卡尔坐标数组
const cartesian3Array = Cesium.Cartesian3.fromDegreesArrayHeights(degreesArrayHeights);
// 创建立体多边形实体
var solidPolygon = viewer.entities.add({
    polygon: {
        hierarchy: cartesian3Array,
        // 多边形底部距离地面的高度
        height: 0,
        material: Cesium.Color.BLUE.withAlpha(0.5),
        // 显示多边形的轮廓
        outline: true,
        outlineColor: Cesium.Color.BLACK
    }
});   

```

## 合并几何体

```js
// 01-创建几何体
let rectGeometry = new Cesium.RectangleGeometry({
    //。。。
});

// 02-创建几何体实例
let instance = new Cesium.GeometryInstance({
    geometry: rectGeometry,
    attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.RED.withAlpha(0.5)
        ),
    },
});

// 第二个创建几何体实例2
let instance2222 = new Cesium.GeometryInstance({
    geometry: rectGeometry,
    attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(
          Cesium.Color.BLACK.withAlpha(0.5)
        ),
    },
});

// 03-设置外观[着色处理方式]
let appearance = new Cesium.PerInstanceColorAppearance({
    flat:false,
});
// 04-图元 通过数组的形式将多个几何体传入图元，最后公用一个模型达到合并的效果
let primitive = new Cesium.Primitive({
    geometryInstances: [instance,instance2222],
    appearance: appearance,
});
```

## 动态修改图元

### 获取实体

```js
let instance = new Cesium.GeometryInstance({
    id: "黑色矩形",
    geometry: rectGeometry,
    attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(
            Cesium.Color.BLACK.withAlpha(0.5)
        ),
    },
});
const geo=  primitive.getGeometryInstanceAttributes('黑色矩形') ;
```

### 修改颜色

```js
setTimeout(() => {
    const geo = primitive.getGeometryInstanceAttributes('黑色矩形');
    geo.color = Cesium.ColorGeometryInstanceAttribute.toValue(
        Cesium.Color.RED.withAlpha(0.5)
    )

},2000)


setTimeout(() => {
    const geo = primitive.getGeometryInstanceAttributes('黑色矩形');
    geo.color = Cesium.ColorGeometryInstanceAttribute.toValue(
        Cesium.Color.RED.withAlpha(0.5)
    )

},2000)
```

### 随机颜色

```js
setTimeout(() => {
    const geo = primitive.getGeometryInstanceAttributes('黑色矩形');
    geo.color = Cesium.ColorGeometryInstanceAttribute.toValue(
        Cesium.Color.fromRandom({
            alpha: 0.5,
        })
    )

},2000)
```

## 材质

```js
let material = new Cesium.ColorMaterialProperty(
    new Cesium.Color(1.0, 1.0, 1.0, 1.0)
);
// 棋盘纹理
let material = new Cesium.CheckerboardMaterialProperty({
    evenColor: Cesium.Color.RED,
    oddColor: Cesium.Color.YELLOW,
    repeat: new Cesium.Cartesian2(2, 2), //水平与垂直各自多少个网格
});
//条纹纹理
let material = new Cesium.StripeMaterialProperty({
    evenColor: Cesium.Color.WHITE,
    oddColor: Cesium.Color.BLACK,
    repeat: 8,
});
// 网格纹理
let material = new Cesium.GridMaterialProperty({
    color: Cesium.Color.YELLOW,
    cellAlpha: 0.2,
    lineCount: new Cesium.Cartesian2(4, 4),
    lineThickness: new Cesium.Cartesian2(4.0, 4.0),
});
```

### 线材质

```js
// let material = new Cesium.PolylineDashMaterialProperty({
//   dashLength: 30,
//   color: Cesium.Color.RED,
// });

// 设置箭头材质
// let material = new Cesium.PolylineArrowMaterialProperty(Cesium.Color.RED);

// 设置发光飞线效果
let material = new Cesium.PolylineGlowMaterialProperty({
    // 设置发光程度
    glowPower: 0.8,
    // 尾椎缩小程度
    taperPower: 0.7,
    color: Cesium.Color.RED,
});

const redLine = viewer.entities.add({
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([-75, 35, -125, 35]),
        width: 20,
        material: material,
    },
});
```

# 外观

## 外观

### MaterialAppearance

`Cesium.MaterialAppearance`

- 这是一种通用的外观类型，主要用于给几何体应用自定义材质。它提供了高度的灵活性，可用于各种类型的几何实例，不管是在地球表面还是太空中的模型都适用。你可以通过指定不同的材质来实现多样化的视觉效果，比如颜色、纹理等。

- ```js
  let material1 = new Cesium.Material.fromType("Color", {
  color: Cesium.Color.AQUA.withAlpha(0.5),
  });
  
  let appearance = new Cesium.MaterialAppearance({
  material: material1,
  });
  ```

### EllipsoidSurfaceAppearance

`Cesium.EllipsoidSurfaceAppearance`

- 针对地球表面的几何体进行了优化，在处理大量与地球椭球体平行的几何实例时，性能更优。适用于地形、地表建筑物、道路等与地球表面紧密相关的场景。

- ```js
  // 设定几何体都是与地球的椭球体平行
  //假定几何体与地球椭球体平行，就可以在计算大量顶点属性的时候节省内存
  let appearance = new Cesium.EllipsoidSurfaceAppearance({
      material: material1,
      aboveGround: true,
  });
  
  ```

### PerInstanceColorAppearance

`Cesium.PerInstanceColorAppearance`

- 当需要为每个几何实例赋予不同颜色时，使用它可以方便地实现这一需求。但如果所有实例颜色相同，使用它会增加不必要的复杂度。适用于需要区分不同实例颜色的场景，如数据可视化中的不同类别数据展示。

- `Cesium.PerInstanceColorAppearance`不能指定通用的材质

- ```js
  // 02-创建几何体实例
  let instance = new Cesium.GeometryInstance({
      id: "黑色矩形",
      geometry: rectGeometry,
      attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(
              Cesium.Color.BLACK.withAlpha(0.5)
          ),
      },
  }); 
  // 03-设置外观
  let appearance = new Cesium.PerInstanceColorAppearance({
      flat: false,
  });
  // 04-图元
  let primitive = new Cesium.Primitive({
      geometryInstances: instance,
      appearance: appearance,
  });
  ```

  



## 材质

```js
let material = new Cesium.ColorMaterialProperty(
    new Cesium.Color(1.0, 1.0, 1.0, 1.0)
);
// 棋盘纹理
let material = new Cesium.CheckerboardMaterialProperty({
    evenColor: Cesium.Color.RED,
    oddColor: Cesium.Color.YELLOW,
    repeat: new Cesium.Cartesian2(2, 2), //水平与垂直各自多少个网格
});
//条纹纹理
let material = new Cesium.StripeMaterialProperty({
    evenColor: Cesium.Color.WHITE,
    oddColor: Cesium.Color.BLACK,
    repeat: 8,
});
// 网格纹理
let material = new Cesium.GridMaterialProperty({
    color: Cesium.Color.YELLOW,
    cellAlpha: 0.2,
    lineCount: new Cesium.Cartesian2(4, 4),
    lineThickness: new Cesium.Cartesian2(4.0, 4.0),
});
```

### 线材质

```js
// let material = new Cesium.PolylineDashMaterialProperty({
//   dashLength: 30,
//   color: Cesium.Color.RED,
// });

// 设置箭头材质
// let material = new Cesium.PolylineArrowMaterialProperty(Cesium.Color.RED);

// 设置发光飞线效果
let material = new Cesium.PolylineGlowMaterialProperty({
    // 设置发光程度
    glowPower: 0.8,
    // 尾椎缩小程度
    taperPower: 0.7,
    color: Cesium.Color.RED,
});

const redLine = viewer.entities.add({
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([-75, 35, -125, 35]),
        width: 20,
        material: material,
    },
});
```

### 材质类型

更多属性设置需见文档

<a href="http://cesium.xin/cesium/cn/Documentation1.62/Material.html?classFilter=Material">材质类型</a>

```js
// 使用instance的颜色去着色
let appearance = new Cesium.PerInstanceColorAppearance({
    flat: true,
});
// type color
let material1 = new Cesium.Material.fromType("Color", {
    color: Cesium.Color.AQUA.withAlpha(0.5),
});

// type image    图片纹理
let material1 = new Cesium.Material.fromType("Image", {
    image: "./texture/logo.png",
    repeat: new Cesium.Cartesian2(2.0, 2.0),
});

// type disffuseMap  漫反射纹理
let material1 = new Cesium.Material.fromType("DiffuseMap", {
    image: "./texture/logo.png",
});

// type grid  网格状
let material1 = new Cesium.Material.fromType("Grid", {
    color: Cesium.Color.AQUA.withAlpha(0.5),
    cellAlpha: 0.2,
    lineCount: new Cesium.Cartesian2(4, 4),
    lineThickness: new Cesium.Cartesian2(4.0, 4.0),
});

// type water  水纹理
let material1 = new Cesium.Material.fromType("Water", {
    baseWaterColor: Cesium.Color.AQUA.withAlpha(0.8),
    distortion: 0.25,
    normalMap: "./Assets/Textures/waterNormals.jpg",
});
```

### fabric使用JSON配置材质

```js
 // 使用instance的颜色去着色
  let material1 = new Cesium.Material({
    fabric: {
      type: "Color",
      uniforms: {
        color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
      },
    },
  });

  let material1 = new Cesium.Material({
    fabric: {
      type: "Image",
      uniforms: {
        image: "texture/logo.png",
      },
    },
  });


let material1 = new Cesium.Material({
    fabric: {
        uniforms: {
            uTime: 0,
        },
        source: `
        czm_material czm_getMaterial(czm_materialInput materialInput)
        {
          // 生成默认的基础材质
          czm_material material = czm_getDefaultMaterial(materialInput);
          // material.diffuse = vec3(materialInput.st+uTime, 0.0);
          float strength = mod((materialInput.s-uTime) * 10.0, 1.0);
          material.diffuse = vec3(strength, 0.0, 0.0);
          return material;
        }
      `,
    },
});
```



# 拾取

## 创建事件处理器

创建一个 `Cesium.ScreenSpaceEventHandler` 的实例，并将其赋值给变量 `handler`。通过这个 `handler` 实例，可以为不同的屏幕空间事件注册回调函数

```js
var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
```

## 绑定事件

第一个参数为：需要使用的回调函数

第二个参数为：需要声明绑定的事件类型：

- **`Cesium.ScreenSpaceEventType.LEFT_CLICK`**：鼠标左键单击事件，当用户按下并释放鼠标左键时触发。
- **`Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK`**：鼠标左键双击事件，当用户快速连续两次按下并释放鼠标左键时触发。
- **`Cesium.ScreenSpaceEventType.RIGHT_CLICK`**：鼠标右键单击事件，当用户按下并释放鼠标右键时触发。
- **`Cesium.ScreenSpaceEventType.MIDDLE_CLICK`**：鼠标中键单击事件，当用户按下并释放鼠标中键时触发。
- **`Cesium.ScreenSpaceEventType.MOUSE_MOVE`**：鼠标移动事件，当用户移动鼠标时持续触发。
- **`Cesium.ScreenSpaceEventType.WHEEL`**：鼠标滚轮滚动事件，当用户滚动鼠标滚轮时触发。
- **`Cesium.ScreenSpaceEventType.PINCH_START`**：双指触摸开始事件，当用户开始用两根手指触摸屏幕时触发。
- **`Cesium.ScreenSpaceEventType.PINCH_END`**：双指触摸结束事件，当用户两根手指都离开屏幕时触发。
- **`Cesium.ScreenSpaceEventType.PINCH_MOVE`**：双指触摸移动事件，当用户用两根手指在屏幕上移动时持续触发。

**第三个参数**：

1. **`modifier`**

   - 这是一个可选参数，类型为 `Cesium.KeyboardEventModifier` 枚举值。它用于指定在触发事件时需要同时按下的键盘修饰键，以此来进一步限定事件触发的条件。

   - ```
     Cesium.KeyboardEventModifier
     ```

     枚举包含以下几个常用值：

     - **`Cesium.KeyboardEventModifier.CTRL`**：表示需要同时按下 `Ctrl` 键。
     - **`Cesium.KeyboardEventModifier.SHIFT`**：表示需要同时按下 `Shift` 键。
     - **`Cesium.KeyboardEventModifier.ALT`**：表示需要同时按下 `Alt` 键。

```js
let handle=new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
handle.setInputAction((movement)=>{
    console.log(movement); 
},Cesium.ScreenSpaceEventType.LEFT_CLICK)
```

## 获取物体

`pick` 方法会从相机位置出发，沿着屏幕上指定点对应的射线方向，在场景中进行查找，尝试找到与该射线相交的对象。如果找到了相交对象，就会返回该对象；若没有找到，则返回 `undefined`。

```js
let handle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
handle.setInputAction((movement) => {
    const pickObject = viewer.scene.pick(movement.position);
    if (Cesium.defined(pickObject)) {
        //拾取实体与primitive的区别：
        //拾取实体返回的对象中id为 声明实体时设置的id
        //拾取primitive返回的对象中id为 Entity对象，对象中的_id为primitive的id
        console.log(pickObject);
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
```

## 坐标获取pick与pickEllipsoid

1. - `viewer.scene.pick(movement.position)`： 这个方法用于在场景中进行拾取操作。它会从相机的位置沿着屏幕坐标（由 `movement.position` 表示）所确定的射线，与场景中的所有可渲染对象（如实体、图元等）进行相交检测。如果射线与某个对象相交，它会返回相交的对象信息。这通常用于检测用户点击或移动时所指向的具体场景对象，例如选中某个建筑物、模型等。
   - `viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid)`： 该方法主要用于将屏幕坐标（`movement.position`）转换为椭球体（`viewer.scene.globe.ellipsoid`，通常代表地球的椭球体模型）表面上的三维世界坐标。它从相机位置沿着指定的屏幕坐标方向进行射线投射，找到射线与椭球体表面的交点，并返回该交点的三维坐标。这个方法主要用于获取屏幕上某个点对应的地球表面的位置，而不是检测与具体对象的相交。
2. **返回值类型**：
   - `viewer.scene.pick(movement.position)`： 返回的是一个包含相交对象相关信息的对象（例如 `Cesium.PickedFeature` 类型的对象），如果没有相交对象则返回 `null`。通过这个返回值，可以获取到被选中对象的属性、实体等相关信息。
   - `viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid)`： 返回的是一个 `Cesium.Cartesian3` 类型的三维坐标对象，表示射线与椭球体表面交点的位置。如果射线没有与椭球体相交，则返回 `null`。

```js
//获取点击地球时的坐标
import * as Cesium from "cesium";
export default class mouseLngLat {
    constructor(viewer) {
        const handle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handle.setInputAction((movement) => {
            // const pickObject = viewer.scene.pick(movement.position);
            const pickV3 = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
            if (pickV3) {
                const cartographic = Cesium.Cartographic.fromCartesian(pickV3);
                const longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
                const latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
                const heightString = cartographic.height;

                console.log('经纬度:' + longitudeString + ',' + latitudeString, '高度:' + heightString);
            }

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    }


}
```



# 着色器

## 材质输入函数czm_materialInput

用作每个材质的 czm_getMaterial 函数的输入。

| 名称               | 类型             | 描述                                                         |
| ------------------ | ---------------- | ------------------------------------------------------------ |
| s                  | 浮点数（float）  | 一维纹理坐标。                                               |
| st                 | 二维向量（vec2） | 二维纹理坐标。                                               |
| str                | 三维向量（vec3） | 三维纹理坐标。                                               |
| normalEC           | 三维向量（vec3） | 以视点坐标表示的未扰动表面法线。                             |
| tangentToEyeMatrix | 三维矩阵（mat3） | 用于将切线空间法线转换为视点空间的矩阵。                     |
| positionToEyeEC    | 三维向量（vec3） | 从片段到视点的向量（以视点坐标表示）。其模长是从片段到视点的距离（单位：米）。 |

## 生成默认基础材质

一个具有默认值的 `czm_material`。每种材质的 `czm_getMaterial` 函数在返回材质时，都应将此默认材质作为基础。默认的法线值由 `materialInput.normalEC` 给出。

| 名称  | 类型              | 描述                     |
| ----- | ----------------- | ------------------------ |
| input | czm_materialInput | 用于构建默认材质的输入。 |

## 默认基础材质czm_material

保存可用于照明的材质信息。由所有 czm_getMaterial 函数返回。

| 名称      | 类型             | 描述                                                         |
| --------- | ---------------- | ------------------------------------------------------------ |
| diffuse   | 三维向量（vec3） | 以均匀的方式向各个方向散射的入射光。                         |
| specular  | 浮点数（float）  | 沿单一方向反射的入射光强度。                                 |
| shininess | 浮点数（float）  | 镜面反射的锐利程度。值越高，镜面高光越小且越集中。           |
| normal    | 三维向量（vec3） | 以视点坐标表示的表面法线。用于法线贴图等效果。默认值为表面未修改的法线。 |
| emission  | 三维向量（vec3） | 材质向各个方向均匀发出的光。默认值为三维向量 (0, 0, 0) ，即不发光。 |
| alpha     | 浮点数（float）  | 该材质的不透明度。0.0 表示完全透明，1.0 表示完全不透明。     |

## 在外观修改着色器

```js
//图元
let appearance = new Cesium.EllipsoidSurfaceAppearance({
    // material: material1,
    // aboveGround: false,
    // translucent: true,
    // uniform不在这里传值
    // uniforms: {
    //   uTime: 0,
    // },
    fragmentShaderSource: `
    varying vec3 v_positionMC;
    varying vec3 v_positionEC;
    varying vec2 v_st;
    uniform float uTime;

    void main()
    {
        czm_materialInput materialInput;

        gl_FragColor = vec4(v_st,uTime, 1.0);
    }
    `,
});
appearance.uniforms = {
    uTime: 0,
};
```

## 帧数转换时间

```js
//是将当前帧数除以 60，假定帧率为 60 帧每秒，这样就可以把帧数转换为以秒为单位的时间值。不过这个值会持续增大。
czm_frameNumber / 60.0 

//会取 czm_frameNumber / 60.0 的小数部分。这样 time 的值就会在 [0.0, 1.0) 这个区间内循环变化。每过 60 帧（也就是 1 秒），time 的值就会完成一次从 0.0 到接近 1.0 的循环
fract(czm_frameNumber / 60.0) 

//乘以10就是 0-10秒完成一次循环
fract(czm_frameNumber / (60.0*10.0) )
```

## 常用函数

### 平滑过渡函数

```js
//平滑过渡函数
smoothstep(edge0, edge1,value);
//参数1:边缘0==8,
//参数2:边缘1==10,
//参数3:当前值==7 , result = 0
//参数3:当前==9 , result = 0.5
//参数3:当前值==10 , result = 1
//也就是给出两个边界，根据输入的指自动换算至0-1的值
```

## 取小数fract

```js
//会取传入函数的小数部分
let data=fract(value) 
```

### 阶跃比较step

```js
float step(float edge, float x);
vec2 step(vec2 edge, vec2 x);
vec3 step(vec3 edge, vec3 x);
vec4 step(vec4 edge, vec4 x);

//edge：阈值，也就是比较的边界值。
//x：需要进行比较的输入值。
```

对于 `step(edge, x)` 函数，其返回值规则如下：

- 若 `edge > x`，则返回 0。
- 若 `edge <= x`，则返回 1。

## 实体自定义材质

注意：材质名称，type,返回类型都要相同

```js
class CustomMaterialProperty {
    constructor() {
        this.definitionChanged = new Cesium.Event();
        Cesium.Material._materialCache.addMaterial('CustomMaterial', {
            fabric: {
                uniforms: {
                    uTime: 0,
                },
                source: `
        czm_material czm_getMaterial(czm_materialInput materialInput)
        {
          // 生成默认的基础材质
          czm_material material = czm_getDefaultMaterial(materialInput);
          float strength = mod((materialInput.s-uTime) * 10.0, 1.0);
          //材质的漫反射颜色
          material.diffuse = vec3(strength, 0.0, 0.0);
          return material;
        }
      `,
            },
        }

                                                  )
        this.params = {
            uTime: 0,
        };
    }
    getType() {
        //返回材质类型
        return 'CustomMaterial';
    }
     //result 是一个结构体，包含了材质的一些属性，如透明度，颜色，是否透明等，
    //也包含了需要根据自己的需求来设置的uniforms中定义的属性
    getValue(time, result) {
        // // 计算时间
        // result.uTime = time;
        //返回材质的值
        return result;
    }
    
    
    
}

let material = new CustomMaterialProperty();

let entities=new Cesium.Entity({
    rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(115, 20, 135, 30),
        material: material,
    },
})

viewer.entities.add(entities)
```

## 自定义闪烁材质

```js
import * as Cesium from 'cesium'
import gsap from 'gsap'
export default class flyLineMaterialProperty {
    constructor(name) {
        this.name = name;
        this.definitionChanged = new Cesium.Event();
        Cesium.Material._materialCache.addMaterial('flyLineMaterial', {
            fabric: {
                type:'flyLineMaterial',
                uniforms: {
                    uTime: 0,
                },
                source: `
                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                    // 生成默认的基础材质
                    czm_material material = czm_getDefaultMaterial(materialInput);
                    material.diffuse = vec3(1.0, 0.0, 0.0);
                    material.alpha = uTime;
                    return material;
                    }
                       `,
            },
        }

                                                  )
        this.params = {
            uTime: 0,
        };


        gsap.to(this.params, {
            uTime: 1,
            duration: 1.5,
            repeat: -1, 
            yoyo: true,
        })
    }
    getType() {
        //返回材质类型
        return 'flyLineMaterial';
    }
    //result 是一个结构体，包含了材质的一些属性，如透明度，颜色，是否透明等，
    //也包含了需要根据自己的需求来设置的uniforms中定义属性
    getValue(time, result) {
        // // 计算时间

        result.uTime = this.params.uTime;
        //返回材质的值
        return result;
    }


    equals(other) {
        //判断两个材质是否相同
        return (
            other instanceof flyLineMaterialProperty 
            && 
            this.name === other.name
        );
    }
}


```

## 实现向上的飞线特效

```js
import * as Cesium from 'cesium'
import gsap from 'gsap'
export default class flyLineMaterialProperty {
    constructor(name) {
        this.name = name;
        this.definitionChanged = new Cesium.Event();
        Cesium.Material._materialCache.addMaterial('flyLineMaterial', {
            fabric: {
                type: 'flyLineMaterial',
                uniforms: {
                    uTime: 0,
                },
                source: `
                    czm_material czm_getMaterial(czm_materialInput materialInput)
                    {
                    // 生成默认的基础材质
                    czm_material material = czm_getDefaultMaterial(materialInput);
                    //获取二维纹理坐标st
                    vec2 st = materialInput.st;
                    //获取随着当前帧数从0-1变化的值
                    float time=fract(czm_frameNumber/(60.0*5.0));
                    time=time*1.1;
                    //这里是希望线从一端开始到另一端所以用st.s
                    //将 smoothstep(time - 0.1, time, st.s) 和 1.0 - step(time, st.s) 相乘
                    //最终得到的 alpha 值会在 st.s 接近 time 时，从 0 平滑过渡到 1,然后在 st.s 大于 time 时迅速变为 0。
                    float alpha=smoothstep(time-0.3,time, st.s)*(1.0-step(time,st.s));
                    //设置透明度
                    material.alpha=alpha;
                    //设置颜色
                    material.diffuse=vec3(0.7,0.6,0.6);
                    return material;
                    }
                       `,
            },
        }

        )
        this.params = {
            uTime: 0,
        };


        gsap.to(this.params, {
            uTime: 1,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
        })
    }
    getType() {
        //返回材质类型
        return 'flyLineMaterial';
    }
    //result 是一个结构体，包含了材质的一些属性，如透明度，颜色，是否透明等，
    //也包含了需要根据自己的需求来设置的uniforms中定义属性
    getValue(time, result) {
        // // 计算时间

        result.uTime = this.params.uTime;
        //返回材质的值
        return result;
    }


    equals(other) {
        //判断两个材质是否相同
        return (
            other instanceof flyLineMaterialProperty
            &&
            this.name === other.name
        );
    }
}


```

## 路线生成

可在阿里云等地图平台中获取相关路线的绘制 然后导出geoJSON



## 常用矩阵

#### 1. `czm_model`

- **含义**：模型矩阵，其作用是把顶点从模型空间（物体自身的局部坐标系）变换到世界空间。借助这个矩阵，能对物体进行平移、旋转和缩放等操作。
- **使用示例**：

```glsl
vec4 worldPosition = czm_model * vec4(modelPosition, 1.0);
```

#### 2. `czm_view`

- **含义**：视图矩阵，它负责将世界空间中的顶点转换到视图空间（相机的坐标系）。此矩阵定义了相机的位置和朝向。
- **使用示例**：

```glsl
vec4 viewPosition = czm_view * worldPosition;
```

#### 3. `czm_projection`

- **含义**：投影矩阵，用于把视图空间中的顶点投影到裁剪空间，方便后续的渲染和显示。常见的投影方式有透视投影和正交投影。
- **使用示例**：

```glsl
vec4 clipPosition = czm_projection * viewPosition;
```

#### 4. `czm_modelView`

- **含义**：模型视图矩阵，是模型矩阵和视图矩阵相乘的结果，可将顶点从模型空间直接变换到视图空间。
- **使用示例**：

```glsl
vec4 viewPosition = czm_modelView * vec4(modelPosition, 1.0);
```

#### 5. `czm_modelViewProjection`

- **含义**：模型视图投影矩阵，由模型矩阵、视图矩阵和投影矩阵相乘得到，能把顶点从模型空间直接变换到裁剪空间。在顶点着色器里，常使用该矩阵来计算最终的裁剪空间位置。
- **使用示例**：

```glsl
// 顶点着色器
#version 300 es
in vec3 a_position;

void main() {
    gl_Position = czm_modelViewProjection * vec4(a_position, 1.0);
}
```

#### 6. `czm_inverseModel`

- **含义**：模型矩阵的逆矩阵，用于将顶点从世界空间转换回模型空间。
- **使用示例**：

```glsl
vec4 modelPosition = czm_inverseModel * worldPosition;
```

#### 7. `czm_inverseView`

- **含义**：视图矩阵的逆矩阵，可将顶点从视图空间转换回世界空间。
- **使用示例**：

```glsl
vec4 worldPosition = czm_inverseView * viewPosition;
```

#### 8. `czm_inverseProjection`

- **含义**：投影矩阵的逆矩阵，用于将顶点从裁剪空间转换回视图空间。
- **使用示例**：

```glsl
vec4 viewPosition = czm_inverseProjection * clipPosition;
```

#### 9. `czm_inverseModelView`

- **含义**：模型视图矩阵的逆矩阵，能将顶点从视图空间转换回模型空间。
- **使用示例**：

```glsl
vec4 modelPosition = czm_inverseModelView * viewPosition;
```

#### 10. `czm_normalMatrix`

- **含义**：法线矩阵，它是模型视图矩阵的逆转置矩阵，用于在变换过程中正确处理法线向量，保证光照计算的正确性。
- **使用示例**：

```glsl
vec3 normal = normalize(czm_normalMatrix * vec3(a_normal, 0.0));
```

## 常用内置变量

##### `v_positionMC`

- **含义**：`v_` 通常代表从顶点着色器传递到片元着色器的 `varying` 变量。`position` 表示位置信息，`MC` 是 “Model Coordinates” 的缩写，所以 `v_positionMC` 代表顶点在模型坐标系（局部坐标系）下的位置。
- **使用示例**：在片元着色器里，可依据 `v_positionMC` 进行纹理采样等操作。

```glsl
// 片元着色器
#version 300 es
in vec3 v_positionMC;
out vec4 fragColor;

void main() {
    // 可以根据 v_positionMC 进行纹理采样等操作
    fragColor = vec4(v_positionMC, 1.0);
}
```

##### 2. `v_positionEC`

- **含义**：`EC` 是 “Eye Coordinates” 的缩写，即眼睛坐标系（视图坐标系）。`v_positionEC` 表示顶点在视图坐标系下的位置。在这个坐标系中，相机位于原点，视线方向沿着负 Z 轴。
- **使用示例**：在光照计算时，常使用 `v_positionEC` 来计算视线方向。

```glsl
// 片元着色器
#version 300 es
in vec3 v_positionEC;
out vec4 fragColor;

void main() {
    // 计算视线方向
    vec3 eyeDirection = normalize(-v_positionEC);
    // 后续光照计算...
    fragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
```

##### 3. `v_positionWC`

- **含义**：`WC` 是 “World Coordinates” 的缩写，即世界坐标系。`v_positionWC` 代表顶点在世界坐标系下的位置。
- **使用示例**：在计算全局光照或者物体之间的相对位置时，会用到 `v_positionWC`。

```glsl
// 片元着色器
#version 300 es
in vec3 v_positionWC;
out vec4 fragColor;

void main() {
    // 计算与另一个物体在世界坐标系下的距离
    vec3 otherObjectPosition = vec3(10.0, 0.0, 0.0);
    float distance = length(v_positionWC - otherObjectPosition);
    // 根据距离设置颜色
    fragColor = vec4(distance / 100.0, 0.0, 0.0, 1.0);
}
```

#### 法线相关变量

##### 1. `v_normalMC`

- **含义**：表示法线在模型坐标系下的方向。法线用于光照计算，以确定表面的朝向。
- **使用示例**：在片元着色器里，可使用 `v_normalMC` 进行光照计算。

```glsl
// 片元着色器
#version 300 es
in vec3 v_normalMC;
out vec4 fragColor;

void main() {
    // 假设光照方向
    vec3 lightDirection = vec3(0.0, 0.0, 1.0);
    // 计算漫反射光照
    float diffuse = max(dot(normalize(v_normalMC), lightDirection), 0.0);
    fragColor = vec4(diffuse, diffuse, diffuse, 1.0);
}
```

##### 2. `v_normalEC`

- **含义**：表示法线在视图坐标系下的方向。在进行光照计算时，通常需要将法线转换到视图坐标系，以确保计算的准确性。
- **使用示例**：

```glsl
// 片元着色器
#version 300 es
in vec3 v_normalEC;
out vec4 fragColor;

void main() {
    // 假设光照方向在视图坐标系下
    vec3 lightDirectionEC = vec3(0.0, 0.0, 1.0);
    // 计算漫反射光照
    float diffuse = max(dot(normalize(v_normalEC), lightDirectionEC), 0.0);
    fragColor = vec4(diffuse, diffuse, diffuse, 1.0);
}
```

##### 3. `v_normalWC`

- **含义**：表示法线在世界坐标系下的方向。在一些需要全局光照计算或者物体间交互的场景中，会用到 `v_normalWC`。
- **使用示例**：

```glsl
// 片元着色器
#version 300 es
in vec3 v_normalWC;
out vec4 fragColor;

void main() {
    // 假设太阳光照方向在世界坐标系下
    vec3 sunDirectionWC = vec3(0.0, 0.0, 1.0);
    // 计算漫反射光照
    float diffuse = max(dot(normalize(v_normalWC), sunDirectionWC), 0.0);
    fragColor = vec4(diffuse, diffuse, diffuse, 1.0);
}
```

#### 其他常用变量

##### 1. `czm_eyePositionWC`

- **含义**：相机在世界空间中的位置。
- **使用示例**：在光照计算中，可使用该变量来计算视线方向。

```glsl
vec3 eyeDirection = normalize(czm_eyePositionWC - worldPosition.xyz);
```

##### 2. `czm_frameNumber`

- **含义**：当前帧的编号，可用于实现一些基于帧的动画效果。
- **使用示例**：

```glsl
float animationFactor = mod(czm_frameNumber, 100.0) / 100.0;
```

##### 3. `czm_morphTime`

- **含义**：用于形态变形（morphing）的时间参数，取值范围通常是 `[0, 1]`。
- **使用示例**：

```glsl
vec3 morphedPosition = mix(positionA, positionB, czm_morphTime);
```

##### 4. `czm_resolution`

- **含义**：渲染窗口的分辨率，以像素为单位。
- **使用示例**：在实现一些屏幕空间效果时，可使用该变量来计算像素坐标。

```glsl
vec2 pixelCoord = gl_FragCoord.xy / czm_resolution;
```

##### 5. `czm_sunDirectionWC`

- **含义**：太阳在世界空间中的方向向量。
- **使用示例**：在光照计算中，可使用该变量来计算太阳光照。

```glsl
float diffuse = max(dot(normal, czm_sunDirectionWC), 0.0);
```

##### 6. `czm_moonDirectionWC`

- **含义**：月亮在世界空间中的方向向量。
- **使用示例**：可用于实现月光效果。

```glsl
float moonDiffuse = max(dot(normal, czm_moonDirectionWC), 0.0);
```

##### 7. `czm_atmosphereSunDirectionEC`

- **含义**：太阳在眼睛坐标系（Eye Coordinates）中的方向向量，用于大气散射效果的计算。
- **使用示例**：

```glsl
vec3 atmosphereLight = computeAtmosphereLight(czm_atmosphereSunDirectionEC);
```

# 渲染GEOJSON数据

```js
// 加载geojson数据
let dataGeo = Cesium.GeoJsonDataSource.load(
    "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json",
    {
        stroke: Cesium.Color.RED,
        fill: Cesium.Color.SKYBLUE.withAlpha(0.5),
        strokeWidth: 4,
    }
);
// console.log(dataGeo);
// viewer.dataSources.add(dataGeo);

dataGeo.then((dataSources) => {
    console.log(dataSources);
    viewer.dataSources.add(dataSources);
    let entities = dataSources.entities.values;
    entities.forEach((entity, i) => {
        entity.polygon.material = new Cesium.ColorMaterialProperty(
            Cesium.Color.fromRandom({
                alpha: 1,
            })
        );
        entity.polygon.outline = false;
        //设置随机高度
        let randomNum = parseInt(Math.random() * 5);
        entity.polygon.extrudedHeight = 100000 * randomNum;
    });
})
```

# KML生成3D地理标记

```js
let kmlUrl = "./Assets/facilities1.kml";
let kmlDataPromise = Cesium.KmlDataSource.load(kmlUrl, {
    camera: viewer.scene.camera,
    canvas: viewer.scene.canvas,
    screenOverlayContainer: viewer.container,
});
console.log(kmlDataPromise);
kmlDataPromise.then(function (dataSource) {
    console.log(dataSource);
    viewer.dataSources.add(dataSource);
});
```

# CZML格式数据应用

<a href="https://github.com/AnalyticalGraphicslnc/czml-writer/wiki/CZML-Guide">CZML官方文档</a>

CZML 是一种用于描述时间动态图形场景的 JSON 格式，主要用于在运行 Cesium 的网页浏览器中展示。它可描述线条、点、广告牌、模型及其他图形基元，并能指定它们随时间的变化情况。

Cesium 与 CZML 的关系类似于 Google Earth 与 KML 的关系。

CZML 和 KML 都是用于在各自客户端中描述场景的数据格式，旨在由各种应用程序生成，甚至可以手动编写。

CZML 有许多重要特性，其中一些使其区别于 KML：

- **基于 JSON**：CZML 采用 JSON 格式。
- **精准描述随时间变化的属性**：CZML 能够精确描述随时间改变值的属性。例如，一条线在某段时间内可以是红色，而在另一段时间内可以是蓝色。客户端也应能够对带时间标签的样本进行插值处理。如果在两个时间点指定了车辆的位置，客户端可以使用 CZML 指定的插值算法准确显示车辆在这两个时间点之间的位置。每个属性都是时间动态的。
- **支持高效增量流式传输至客户端**：CZML 的结构设计便于高效地以增量方式流式传输到客户端。在展示场景之前，客户端无需获取整个文档。在很多情况下，单个客户端甚至可以在流式传输过程中加入或退出。
- **优化客户端使用体验**：CZML 针对客户端消费进行了优化，力求简洁且易于解析。同时，它也具有一定的可读性和可编写性，方便人类处理。

```js
const czml = [
    {
        id: "document",
        name: "box",
        version: "1.0",
    },
    {
        id: "shape1",
        name: "Blue box",
        position: {
            cartographicDegrees: [-114.0, 40.0, 300000.0],
        },
        box: {
            dimensions: {
                cartesian: [400000.0, 300000.0, 500000.0],
            },
            material: {
                solidColor: {
                    color: {
                        rgba: [0, 0, 255, 255],
                    },
                },
            },
        },
    },
]; 

let czmlUrl = "./Assets/box.czml";

// 加载czml数据
let promiseData = Cesium.CzmlDataSource.load(czml);
promiseData.then((dataSource) => {
    console.log(dataSource);
    viewer.dataSources.add(dataSource);
    viewer.flyTo(dataSource);
});
```

## 动态图形

```js
var viewer = new Cesium.Viewer("cesiumContainer", {
    // 是否显示信息窗口
    infoBox: false,
    // terrainProvider: Cesium.createWorldTerrain(),
    shouldAnimate: true, //设置为true，场景中的动画会自动播放
  });


// 加载kml数据
const czml = [
    {
        id: "document",
        name: "CZML Point - Time Dynamic",
        version: "1.0",
    },
    {
        id: "point",
        // 物体在什么时间范围可用
        availability: "2012-08-04T16:00:00Z/2012-08-04T16:05:00Z",
        position: {
            // 设置物体的起始时间
            epoch: "2012-08-04T16:00:00Z",
            // 设置了四个维度，1维是时间，2维是经度，3维是纬度，4维是高度
            cartographicDegrees: [
                0, -70, 20, 150000, 
                100, -80, 44, 150000,
                200, -90, 18, 150000, 
                300,-98, 52, 150000,
            ],
        },
        point: {
            color: {
                rgba: [255, 255, 255, 128],
            },
            outlineColor: {
                rgba: [255, 0, 0, 128],
            },
            outlineWidth: 3,
            pixelSize: 15,
        },
    },
];

// 加载czml数据
let promiseData = Cesium.CzmlDataSource.load(czml);
promiseData.then((dataSource) => {
    console.log(dataSource);
    viewer.dataSources.add(dataSource);
    // viewer.flyTo(dataSource);
});
```

# 航班飞行[插值采样]

注意：需要打开观察器的动画播放

```js
//创建采样位置属性对象
const positionProperty = new Cesium.SampledPositionProperty();


//事件间隔
const timeStep = 30;

//总时长
let totalTime = (planeData.length - 1) * timeStep;

//设置起点时间
let startTime = new Date("2025-04-06 00:00:00");

//cesium默认使用儒略日时间
const startJulianTime = Cesium.JulianDate.fromDate(startTime);

//设置终点时间
const endJulianTime = Cesium.JulianDate.addSeconds(
    startJulianTime,
    totalTime,
    new Cesium.JulianDate()
);

//将查看器时间调整刀起点和结束时间
viewer.clock.startTime = startJulianTime.clone();
viewer.clock.stopTime = endJulianTime.clone();
viewer.clock.currentTime = startJulianTime.clone();
viewer.timeline.zoomTo(startJulianTime, endJulianTime);
//时间速率乘以10倍，变相加快动画速度
viewer.clock.multiplier = 10;

planeData.forEach((item, index) => {
    const time = Cesium.JulianDate.addSeconds(
        startJulianTime,
        index * timeStep,
        new Cesium.JulianDate()
    )

    const position = Cesium.Cartesian3.fromDegrees(
        item.longitude,
        item.latitude,
        item.height
    )

    positionProperty.addSample(time, position)

    //通过添加实体点的方式，可以观察到数据是不连续的点
    //但是物体的移动并不是从一个点瞬间移动到另一个点，而是从一个点平滑的移动到另一个点
    //而采样点的作用就是对这些点之间进行插值计算，从而实现平滑的移动
    // const entity = viewer.entities.add({
    //     position: position,
    //     point: {
    //         pixelSize: 5,
    //         color: Cesium.Color.RED,
    //         outlineColor: Cesium.Color.WHITE,
    //     }
    // })


    const airFly = viewer.entities.add({
        position: positionProperty,
        //orientation会根据采样点的位置来计算飞机的朝向
        orientation: new Cesium.VelocityOrientationProperty(positionProperty),
        model: {
            uri: new URL("@/assets/models/Air.glb", import.meta.url).href,
            //设置模型的最小像素尺寸，当模型的尺寸小于这个值时，模型将不会被显示
            minimumPixelSize: 128,
            //当 runAnimations 为 true 时，如果 Air.glb 模型文件中包含动画数据，Cesium 会自动播放这些动画
            // runAnimations: true,
            // 设置飞机的轮廓
            // silhouetteSize: 5,
            // 设置轮廓的颜色
            // silhouetteColor: Cesium.Color.WHITE,
            maximumScale: 20000,
            // 设置相机距离模型多远的距离显示
            // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1000000),



        },
        //设置模型可见时间
        availability: new Cesium.TimeIntervalCollection([
            new Cesium.TimeInterval({
                start: startJulianTime,
                stop: endJulianTime,
            })
        ]),
        //绘制轨迹线
        // path: new Cesium.PathGraphics({
        //     width: 10,
        //     material: Cesium.Color.YELLOW,
        // })
    })

    viewer.trackedEntity = airFly;
})

```

# 3DTiles

如果直接将3D建筑物一次性全部渲染处理，电脑性能无法接受，因此通过 按需进行流式传输的异构3D地理空间数据集进行渲染

## 数据集详解

b3dm:`.b3dm` 是 3D Tiles 数据格式中的一种二进制文件，专门用于存储 3D 模型相关的数据

在加载数据集时需注意:==`.b3dm`文件路径是否正确或是否存在==。

```js
{
    // 关于数据集本身的元信息
    "asset": {
        // 3D Tiles规范的版本号，此数据集遵循1.0版本的规范
        "version": "1.0",
        // 自定义的该数据集的版本号，方便管理和更新
        "tilesetVersion": "1.2.3"
    },
    // 额外的自定义信息，用于对数据集进行描述或添加标识
    "extras": {
        // 给这个数据集起的一个名称，方便识别，就像给一本书取个书名
        "name": "Sample Tileset"
    },
    // 定义数据集中图块可能包含的属性及其取值范围
    "properties": {
        // 图块的唯一标识符，取值范围在0到9之间，类似学生的学号
        "id": {
            "minimum": 0,
            "maximum": 9
        },
        // 图块所在位置的经度范围，例如这个范围可能对应地球上某一片区域的东西方向界限
        "Longitude": {
            "minimum": -1.3197192952275933,
            "maximum": -1.319644104024109
        },
        // 图块所在位置的纬度范围，对应地球上某一片区域的南北方向界限
        "Latitude": {
            "minimum": 0.698848878034009,
            "maximum": 0.6989046192460953
        },
        // 图块的高度范围，例如建筑物的高度就在这个区间内
        "Height": {
            "minimum": 6.161747192963958,
            "maximum": 85.41026367992163
        }
    },
    // 整个数据集的全局几何误差，用于决定何时加载更详细的图块,值越大越精细
    // 想象看地图，离得远时用低精度的图，离得近就需要高精度图，这个值就是判断远近的一个标准
    "geometricError": 240,
    // 数据集的根图块，是整个图块层次结构的起始点
    "root": {
        // 根图块的边界体，定义了它所覆盖的地理区域
        "boundingVolume": {
            // 使用region类型表示地理区域，依次为最小经度、最小纬度、最大经度、最大纬度、最小高度、最大高度
            // 好比一个盒子把这片地理区域框起来
            "region": [
                -1.3197209591796106, 0.6988424218, -1.3196390408203893, 0.6989055782, 0,
                88
            ]
        },
        // 根图块的几何误差，比全局几何误差小，因为它更具体一些
        "geometricError": 30,
            
        // 当加载更详细的子图块时，与当前图块的合并方式：值为add时
        // 表示把子图块内容添加到当前图块内容之上，就像在一张纸上再贴一张小纸片
        "refine": "ADD",
        // 根图块的实际内容信息
        "content": {
            // 根图块内容文件的路径，指向一个b3dm格式的二进制模型文件
            "uri": "parent.b3dm",
            // 根图块内容所覆盖的地理区域，可能和根图块整体边界体不同
            "boundingVolume": {
                "region": [
                    -1.3197004795898053, 0.6988582109, -1.3196595204101946, 0.6988897891,
                    0, 88
                ]
            }
        },
        // 根图块的子图块列表，每个子图块进一步细化根图块的内容
        "children": [
            {
                // 子图块的边界体，定义其覆盖的地理区域
                "boundingVolume": {
                    "region": [
                        -1.3197209591796106, 0.6988424218, -1.31968, 0.698874, 0, 20
                    ]
                },
                // 子图块的几何误差，为0表示可能是最详细的表示了
                "geometricError": 0,
                // 子图块的实际内容信息
                "content": {
                    // 子图块内容文件的路径
                    "uri": "ll.b3dm"
                }
            },
            {
                "boundingVolume": {
                    "region": [
                        -1.31968, 0.6988424218, -1.3196390408203893, 0.698874, 0, 20
                    ]
                },
                "geometricError": 0,
                "content": {
                    "uri": "lr.b3dm"
                },
                // 子图块的额外自定义信息
                "extras": {
                    // 给这个子图块一个特殊的标识，像给一个房间贴上特殊标签
                    "id": "Special Tile"
                }
            },
            {
                "boundingVolume": {
                    "region": [
                        -1.31968, 0.698874, -1.3196390408203893, 0.6989055782, 0, 20
                    ]
                },
                "geometricError": 0,
                "content": {
                    "uri": "ur.b3dm"
                }
            },
            {
                "boundingVolume": {
                    "region": [
                        -1.3197209591796106, 0.698874, -1.31968, 0.6989055782, 0, 20
                    ]
                },
                "geometricError": 0,
                "content": {
                    "uri": "ul.b3dm"
                }
            }
        ]
    }
}
```

## 加载3Dtiles

```js
const tiles=new Cesium.Cesium3DTileset({
    url:new URL("@/assets/json/tileset.json", import.meta.url).href,
    // maximumScreenSpaceError: 1, 
})

viewer.scene.primitives.add(tiles)
tiles.readyPromise.then((tileset)=>{
    //摄像头追踪物体
    viewer.zoomTo(tileset) 
})
// 3dtiles调试面板
viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin);
```

## 调试面板

```js
viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin);
```

## 瓦片加载时间监听

```js
 //当瓦片加载的时候执行时间
  tiles3d.tileVisible.addEventListener((tile, visibility) => {
             console.log(tile, visibility);
  })
```



## 修改3Dtiles的样式

```js
const tiles3D= new Cesium.createOsmBuildings()
const osmBuildings = viewer.scene.primitives.add(
    tiles3D
)
viewer.camera.flyTo({
    destination: position,
})

tiles3D.style=new Cesium.Cesium3DTileStyle({
    //颜色设置
    color: "color('red')",
    show: true,
})
tiles3d.style = new Cesium.Cesium3DTileStyle({
    // 颜色设置，颜色名称/16进制颜色值/rgba颜色值
    // color: "color('yellow')",
    // color: "rgba(255, 255, 0, 0.5)",
    color: "color('#f00')",
    show: true,
});
```

**进行条件判断**：

```js
  tiles3d.style = new Cesium.Cesium3DTileStyle({
    color: {
      conditions: [
          //检查当前 3D 要素的 building 属性是否等于 'apartments'（公寓）。如果是，则将该要素的颜色设置为半透明的绿色（rgba(50, 255, 0, 0.5)）。
        [
          "${feature['building']} === 'apartments'",
          "color('rgba(50, 255, 0, 0.5)')",
        ],
        [
          "${feature['building']} === 'office'",
          "color('rgba(255, 255, 0, 0.5)')",
        ],
          //检查当前 3D 要素的 cesium#estimatedHeight（估计高度）属性是否大于 300。如果是，则将该要素的颜色设置为半透明的淡蓝色（rgba(200, 200, 255, 0.7)）。
        [
          "${feature['cesium#estimatedHeight']} > 300",
          "color('rgba(200, 200, 255, 0.7)')",
        ],
        [
          "${feature['cesium#estimatedHeight']} > 100",
          "color('rgba(100, 100, 255, 0.7)')",
        ],
        [
          "${feature['cesium#estimatedHeight']} > 50",
          "color('rgba(50, 50, 150, 0.7)')",
        ],
        ["true", "color('white')"],
      ],
    },
    show: true,
  });
```

## 高级样式设置

```js
tiles3D.style = new Cesium.Cesium3DTileStyle({
    //defines中可以自定义变量，这里自定义变量distance，它的值为每个点与vec2(113.3191,23.109)的距离
    //并用于条件判断
    defines: {
        distance:
        "distance(vec2(${feature['cesium#longitude']},${feature['cesium#latitude']}),vec2(113.3191,23.109))",
    },
    color: {
        conditions: [
            ["${distance} < 0.01", "color('rgba(0,0,50, 0.7)')"],
            ["${distance} < 0.02", "color('rgba(0,0,50, 0.5)')"],
            ["${distance} < 0.04", "color('rgba(0,0,50, 0.2)')"],
            ["true", "color('white')"],
        ],
    },
    //显示满足条件的模型
    show: "${distance} < 0.04 && ${feature['building']} === 'apartments'",
});
```

## 加载时的3Dtiles的样式修改

```js
import * as Cesium from "cesium";

export default function modifyBuild(viewer) {
  // 添加3D建筑
  let tiles3d = new Cesium.createOsmBuildings();
  const osmBuildings = viewer.scene.primitives.add(tiles3d);

  //当瓦片加载的时候执行时间
  tiles3d.tileVisible.addEventListener((tile) => {
    //获取3D瓦片内容
    const cesium3DTilesetCon = tile.content;
    //其中featuresLength属性表示当前3D瓦片包含的所有要素的数量
    for (let i = 0; i < 1; i++) {
      //获取要素的模型
      const model = cesium3DTilesetCon.getFeature(i).content._model;

      //在其中的渲染器资源_rendererResources中可以找到着色器sourceShaders数据
      //这里需要找到哪一个是片元着色器，可能没有，可能既有顶点着色器，又有片元着色器
      //需要自行判断,并修改它的值
    //  console.log(model._rendererResources.sourceShaders);
    //这里打印model._rendererResources.sourceShaders可以看到
    //顶点着色器中通过varying关键字定义了变量v_positionEC，也就是视图坐标下的顶点位置
    //因此需要转换回模型坐标:可以直接乘以模型视图矩阵的逆矩阵
    //也可以先后乘以世界矩阵和视图矩阵的逆矩阵
      model._rendererResources.sourceShaders[1] = `
    varying vec3 v_positionEC;

    void main()
    {
        czm_materialInput materialInput;
       //获取模型position信息
       vec4 position=czm_inverseModelView*vec4(v_positionEC,1.0);
              float strength=position.z/200.0;
       gl_FragColor=vec4(strength,0.3*strength,strength,1.0);
    }
        `

      //修改片元着色器以后需要声明着色器的更新，否则不会生效
      model._shouldRegenerateShaders = true;

    }
  })

}

```

## 实现上下滚动光环

```js
import * as Cesium from "cesium";

export default function modifyBuild(viewer) {
    // 添加3D建筑
    let tiles3d = new Cesium.createOsmBuildings();
    const osmBuildings = viewer.scene.primitives.add(tiles3d);

    //当瓦片加载的时候执行时间
    tiles3d.tileVisible.addEventListener((tile) => {
        //获取3D瓦片内容
        const cesium3DTilesetCon = tile.content;
        //其中featuresLength属性表示当前3D瓦片包含的所有要素的数量
        for (let i = 0; i < 1; i++) {
            //获取要素的模型
            const model = cesium3DTilesetCon.getFeature(i).content._model;

            //在其中的渲染器资源_rendererResources中可以找到着色器sourceShaders数据
            //这里需要找到哪一个是片元着色器，可能没有，可能既有顶点着色器，又有片元着色器
            //需要自行判断,并修改它的值
            //  console.log(model._rendererResources.sourceShaders);
            //这里打印model._rendererResources.sourceShaders可以看到
            //顶点着色器中通过varying关键字定义了变量v_positionEC，也就是视图坐标下的顶点位置
            //因此需要转换回模型坐标:可以直接乘以模型视图矩阵的逆矩阵
            //也可以先后乘以世界矩阵和视图矩阵的逆矩阵
            model._rendererResources.sourceShaders[1] = `
    varying vec3 v_positionEC;

    void main()
    {
        czm_materialInput materialInput;
       //获取模型position信息
       vec4 position=czm_inverseModelView*vec4(v_positionEC,1.0);
              float strength=position.z/200.0;
       gl_FragColor=vec4(strength,0.3*strength,strength,1.0);



     float time = fract(czm_frameNumber/(60.0*10.0));
      time = abs(time-0.5)*2.0;
      //clamp 函数的作用是将一个数值限制在指定的最小值和最大值范围内
      float diff = abs(clamp(position.z/500.0, 0.0, 1.0) - time) ;

      // step(edge, x)，如果x大于等于edge，返回1，否则返回0
      diff = step(0.01, diff);

      gl_FragColor.rgb += vec3(0.5)*(1.0-diff);
    }
        `

            //修改片元着色器以后需要声明着色器的更新，否则不会生效
            model._shouldRegenerateShaders = true;

        }
    })

}

```

## 实现上下浮动光标

```js
import * as Cesium from "cesium";
import gsap from "gsap";
export default class lightPyramid {
    constructor(viewer) {
        this.params = {
            height: 500,
            //旋转角度
            degress: 0,
        }
        //可以通过设置模型的位置矩阵来调整模型的位置以及姿态
        this.modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
            //位置
            Cesium.Cartesian3.fromDegrees(113.324520, 23.102290,this.params.height),
            //旋转姿态
            new Cesium.HeadingPitchRoll(this.params.degress, 0, 0)

        )
        this.model = viewer.scene.primitives.add(
            new Cesium.Model.fromGltf({
                url: new URL("@/assets/models/pyramid.glb", import.meta.url).href,
                show: true,
                scale: 100,
                minimumPixelSize: 10,
                maximumScale: 20000,
                //能否被选择点击
                allowPicking: true,
                //是否显示debug的边框
                debugShowBoundingVolume: false,
                //是否显示模型的线框
                debugWireframe: false,
                color: Cesium.Color.YELLOW,
                //设置颜色的混合模式,高光颜色容易失真
                // colorBlendMode: Cesium.ColorBlendMode.REPLACE,
                // colorBlendMode: Cesium.ColorBlendMode.HIGHLIGHT
                colorBlendMode: Cesium.ColorBlendMode.MIX,
                //设置模型的位置矩阵
                modelMatrix: this.modelMatrix,
            }))

        this.animtion()
    }


    animtion() {

        gsap.to(this.params, {
            height: 800,
            degress: Math.PI,
            duration: 1,
            //是否往返
            yoyo: true,
            //-1为无限循环
            repeat: -1,
            //缓动函数
            ease: "power1.inOut",
            //每一帧都会执行
            onUpdate: () => {
                //可以通过设置模型的位置矩阵来调整模型的位置以及姿态
                this.model.modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
                    //位置
                    Cesium.Cartesian3.fromDegrees(113.324520, 23.102290, this.params.height),
                    //旋转姿态
                    new Cesium.HeadingPitchRoll(this.params.degress, 0, 0)
                )
            }
        })

    }

}
```



# 库

## 导航罗盘

```js
npm i cesium-navigation-es6
```

```js
  var options = {
    // 启用罗盘
    enableCompass: true,
    // 是否启用缩放
    enableZoomControls: false,
    // 是否启用指南针外环
    enableCompassOuterRing: true,
    // 是否启用距离的图例
    // enableDistanceLegend: false,
  };
  // 初始化导航罗盘
  let navigation = new CesiumNavigaion(viewer, options);
```

## 动画库gsap

```js
npm i gsap
```

```js
gsap.to(this.params, {
    height: 800,
    degress: Math.PI,
    duration: 1,
    //是否往返
    yoyo: true,
    //-1为无限循环
    repeat: -1,
    //缓动函数
    ease: "power1.inOut",
    //每一帧都会执行
    onUpdate: () => {
        //可以通过设置模型的位置矩阵来调整模型的位置以及姿态
        this.model.modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
            //位置
            Cesium.Cartesian3.fromDegrees(113.324520, 23.102290, this.params.height),
            //旋转姿态
            new Cesium.HeadingPitchRoll(this.params.degress, 0, 0)
        )
    }
})
```

## turf

```js
npm install @turf/turf
```

