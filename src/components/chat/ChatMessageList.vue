<script setup lang="ts">
import { Service } from '@element-plus/icons-vue'
import type { Message } from '@/types/chat'
import ChatMessage from './ChatMessage.vue'

defineProps<{
  messages: Message[]
  loading?: boolean
}>()
</script>

<template>
  <div class="messages-wrapper">
    <template v-if="messages.length > 0">
      <div class="messages-container">
        <ChatMessage
          v-for="message in messages"
          :key="message.id"
          :message="message"
        />
        <div v-if="loading" class="message-item assistant loading-message">
          <div class="message-avatar">
            <el-icon><Service /></el-icon>
          </div>
          <div class="message-content loading">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="welcome-container">
        <div class="welcome-content">
          <div class="welcome-icon">
            <el-icon><Service /></el-icon>
          </div>
          <h2 class="welcome-title">我是 PowerAI，很高兴见到你！</h2>
          <p class="welcome-text">我可以帮你写代码、读文件、写作各种创意内容，请把你的任务交给我吧~</p>
          <slot name="input"></slot>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.messages-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 24px 0;
  overflow-y: auto;
}

.messages-container {
  max-width: 768px;
  margin: 0 auto;
  width: 100%;
}

.welcome-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
}

.welcome-content {
  text-align: center;
  padding: 32px;
  width: 100%;
  max-width: 800px;
}

.welcome-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  border-radius: 16px;
  background-color: #eef2ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome-icon .el-icon {
  font-size: 32px;
  color: #6366f1;
}

.welcome-title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 16px;
}

.welcome-text {
  font-size: 16px;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 32px;
}

.loading-message {
  opacity: 0.8;
}

.loading .dot {
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #6b7280;
  margin: 0 2px;
  animation: loading 1.4s infinite ease-in-out both;
}

.loading .dot:nth-child(1) {
  animation-delay: -0.32s;
}

.loading .dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes loading {
  0%, 80%, 100% { 
    transform: scale(0);
  } 
  40% { 
    transform: scale(1.0);
  }
}
</style> 