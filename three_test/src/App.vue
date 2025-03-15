<script setup>
import car from '@/page/car.vue'
// import carLunKuo from '@/page/carLunKuo.vue'
// import quxian from '@/page/quxian.vue'
// import shan from '@/page/shan.vue'
// import gongchang from '@/page/gongchang.vue'
import tongdao from '@/page/tongdao.vue'
import renManyou from '@/page/renManyou.vue'
import wuli from '@/page/wuli.vue'
import { ref } from 'vue'
const carRef = ref()
</script>

<template>
    <wuli ref="carRef"></wuli>
    <!-- <car ref="carRef"></car> -->
    <!-- <quxian></quxian> -->
</template>

<style scoped></style>