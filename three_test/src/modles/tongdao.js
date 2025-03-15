import * as Three from 'three';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import{ EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import{ UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
export const groupFn = (renderer,scene,camera) => {
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    //给EffectComposer添加一个渲染器通道RenderPass。
    composer.addPass(renderPass);

    const bloomPass= new UnrealBloomPass (new Three.Vector2(window.innerWidth, window.innerHeight))
    //给EffectComposer添加一个后期处理通道UnrealBloomPass。
    composer.addPass(bloomPass)

    const glitchPass = new GlitchPass() ;
    composer.addPass(glitchPass)

    const geotry = new Three.BoxGeometry(50, 50, 50)
    const material = new Three.MeshBasicMaterial({ color: 'skyblue' })
    const group = new Three.Group()
    for (let i = 1; i <= 3; i++) {
        const mesh = new Three.Mesh(geotry, material)
        mesh.position.set(i * 100, 0, 0)
        group.add(mesh)
    }
  
    return  {
        composer,
        group
    }
}

