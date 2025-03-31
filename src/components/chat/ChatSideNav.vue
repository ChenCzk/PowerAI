<script setup lang="ts">
import { Monitor, Setting, ChatRound, Plus } from '@element-plus/icons-vue'

defineEmits(['create-chat', 'toggle-conversation-list'])
</script>

<template>
  <div class="side-nav">
    <div class="nav-top">
      <div class="nav-item logo">
        <el-icon><Monitor /></el-icon>
      </div>
      <div class="nav-item" @click="$emit('create-chat')">
        <el-icon><Plus /></el-icon>
      </div>
      <div 
        class="nav-item"
        :class="{ active: $route.path === '/chat' }"
        @click="$emit('toggle-conversation-list')"
      >
        <el-icon><ChatRound /></el-icon>
      </div>
    </div>
    <div class="nav-bottom">
      <div class="nav-item">
        <el-icon><Setting /></el-icon>
      </div>
      <div class="nav-item">
        <el-avatar :size="24" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.side-nav {
  width: 64px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 0;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
}

.nav-top, .nav-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.nav-item {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #4b5563;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background-color: #f3f4f6;
}

.nav-item.active {
  background-color: #eef3fe;
  color: #4b87ff;
}

.nav-item.logo {
  margin-bottom: 16px;
}

.nav-item .el-icon {
  font-size: 20px;
}
</style> 