<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const count = ref(0)
const message = ref('')
const visible = ref(false)

const showMessage = () => {
  ElMessage({
    message: '这是一条测试消息',
    type: 'success'
  })
}
</script>

<template>
  <router-view />
</template>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

#app {
  display: flex;
}
</style>
