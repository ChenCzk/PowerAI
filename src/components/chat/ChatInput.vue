<script setup lang="ts">
import { ref } from 'vue'
import { Upload, Refresh, Link } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'

const inputMessage = ref('')
const isDeepThinking = ref(false)
const isWebSearch = ref(false)
const emit = defineEmits(['send', 'upload'])

const handleSend = () => {
  if (!inputMessage.value.trim()) return
  emit('send', {
    content: inputMessage.value,
    isDeepThinking: isDeepThinking.value,
    isWebSearch: isWebSearch.value
  })
  inputMessage.value = ''
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}

const handleUpload = (file: UploadFile) => {
  emit('upload', file)
  return false // 阻止自动上传
}

const toggleDeepThinking = () => {
  isDeepThinking.value = !isDeepThinking.value
}

const toggleWebSearch = () => {
  isWebSearch.value = !isWebSearch.value
}
</script>

<template>
  <div class="chat-input-wrapper">
    <div class="chat-input-container">
      <div class="input-area">
        <el-input
          v-model="inputMessage"
          type="textarea"
          :rows="1"
          :autosize="{ minRows: 1, maxRows: 4 }"
          placeholder="给 PowerAI 发送消息"
          resize="none"
          @keydown="handleKeydown"
        />
        <div class="bottom-bar">
          <div class="left-actions">
            <div 
              class="mode-button"
              :class="{ active: isDeepThinking }"
              @click="toggleDeepThinking"
            >
              <el-icon><Refresh /></el-icon>
              深度思考
            </div>
            <div 
              class="mode-button"
              :class="{ active: isWebSearch }"
              @click="toggleWebSearch"
            >
              <el-icon><Link /></el-icon>
              联网搜索
            </div>
          </div>
          <div class="right-actions">
            <el-upload
              class="upload-button"
              action="#"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleUpload"
            >
              <el-button
                type="default"
                class="action-button"
              >
                <el-icon><Upload /></el-icon>
              </el-button>
            </el-upload>
            <el-button
              type="primary"
              :disabled="!inputMessage.trim()"
              @click="handleSend"
              class="send-button"
            >
              发送
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-input-wrapper {
  width: 100%;
  background-color: #ffffff;
  border-top: none;
  padding: 20px 0;
}

.chat-input-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px;
}

.input-area {
  position: relative;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.input-area:focus-within {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

:deep(.el-textarea__inner) {
  border: none !important;
  padding: 16px 16px;
  min-height: 80px !important;
  max-height: 400px;
  resize: none;
  font-size: 14px;
  line-height: 1.6;
  box-shadow: none !important;
  border-radius: 12px;
}

:deep(.el-textarea__inner):focus {
  border-radius: 12px 12px 0 0;
}

.bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid #f3f4f6;
}

.left-actions {
  display: flex;
  gap: 16px;
}

.mode-button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 13px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mode-button .el-icon {
  font-size: 14px;
}

.mode-button:hover {
  color: #6366f1;
  background-color: #f3f4f6;
}

.mode-button.active {
  color: #6366f1;
  background-color: #eef2ff;
}

.right-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.action-button {
  padding: 8px;
  border: none;
  background: none;
  color: #6b7280;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-button:hover {
  color: #6366f1;
  background-color: #f3f4f6;
}

.action-button .el-icon {
  font-size: 16px;
}

.send-button {
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 14px;
  background-color: #409eff;
  transition: all 0.2s ease;
}

.send-button:not(:disabled):hover {
  transform: translateY(-1px);
}

.send-button:disabled {
  background-color: #a3a6b4;
  border-color: #a3a6b4;
}

.upload-button {
  display: inline-flex;
  align-items: center;
}

.upload-button :deep(.el-upload) {
  display: block;
}
</style> 