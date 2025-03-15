import * as THREE from 'three'


const textureCubepoint = new THREE.TextureLoader().load('../../assets/img/光点.png')

const sprite = new THREE.SpriteMaterial({
    // color: 0x00ffff,
    map: textureCubepoint,
    transparent: true,
})

const spriteMesh = new THREE.Sprite(sprite)
spriteMesh.scale.set(10, 10, 1)

export default spriteMesh