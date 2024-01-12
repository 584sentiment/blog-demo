<script setup lang="ts">
import { ref } from 'vue';
import Nav from '@/components/Nav.vue'

const tabMenu = [
  {
    label: '主页',
    value: '/home',
  },
  {
    label: '博客',
    value: '',
  },
  {
    label: '友链',
    value: '',
  },
  {
    label: '留言板',
    value: '',
  },
  {
    label: 'Code',
    value: '',
  },
]
</script>

<template>
  <div class="container">
    <Nav :list="tabMenu"/>
  </div>
</template>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.container {
  display: flex;
  justify-content: space-evenly;
  width: 100vw;
  height: 100vh;
  background-color: #000;
}
</style>
