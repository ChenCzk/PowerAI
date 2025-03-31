<script setup lang="ts">
import { ref } from 'vue'
import type { Message } from '@/types/chat'
import ChatSideNav from '@/components/chat/ChatSideNav.vue'
import ChatConversationList from '@/components/chat/ChatConversationList.vue'
import ChatMessageList from '@/components/chat/ChatMessageList.vue'
import ChatInput from '@/components/chat/ChatInput.vue'
import { Edit } from '@element-plus/icons-vue'
import { useChat } from '@/composables/useChat'
import { useTitleEdit } from '@/composables/useTitleEdit'
import { ElMessage } from 'element-plus'

// 状态管理
const showConversationList = ref(false)
const {
  conversations,
  currentConversation,
  loading,
  createNewChat,
  sendMessage,
  selectConversation,
  renameConversation,
  deleteConversation
} = useChat()

const {
  isEditingTitle,
  editingTitle,
  startEditTitle,
  saveTitle,
  handleTitleKeydown
} = useTitleEdit(currentConversation)

// 处理文件上传
const handleUpload = () => {
  ElMessage.info('文件上传功能开发中...')
}

// 切换会话列表显示
const toggleConversationList = () => {
  showConversationList.value = !showConversationList.value
}
</script>

<template>
  <el-container class="chat-container">
    <ChatSideNav 
      @create-chat="createNewChat"
      @toggle-conversation-list="toggleConversationList"
    />
    
    <ChatConversationList
      v-if="showConversationList"
      :conversations="conversations"
      :current-conversation="currentConversation"
      @select="selectConversation"
      @rename="renameConversation"
      @delete="deleteConversation"
    />

    <el-container class="chat-main" :class="{ 'full-width': !showConversationList }">
      <div v-if="currentConversation?.messages.length > 0" class="chat-header">
        <div v-if="isEditingTitle" class="chat-title editing">
          <el-input
            v-model="editingTitle"
            size="small"
            @keydown="handleTitleKeydown"
            @blur="saveTitle"
            ref="titleInput"
            v-focus
          />
        </div>
        <h2 v-else class="chat-title" @click="startEditTitle">
          {{ currentConversation?.title || '新的对话' }}
          <el-icon class="edit-icon"><Edit /></el-icon>
        </h2>
      </div>

      <el-main class="chat-messages">
        <el-scrollbar class="chat-messages" ref="messagesContainer">
          <ChatMessageList
            v-if="currentConversation"
            :messages="currentConversation.messages"
            :loading="loading"
          >
            <template v-if="currentConversation.messages.length === 0" #input>
              <div class="welcome-input">
                <ChatInput 
                  @send="sendMessage"
                  @upload="handleUpload"
                />
              </div>
            </template>
          </ChatMessageList>
        </el-scrollbar>
      </el-main>

      <ChatInput 
        v-if="currentConversation && currentConversation.messages.length > 0"
        @send="sendMessage"
        @upload="handleUpload"
      />
    </el-container>
  </el-container>
</template>

<style scoped>
.chat-container {
  height: 100vh;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
}

.chat-main {
  margin-left: 5px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background-color: #ffffff;
  position: relative;
  border-left: none;
  transition: margin-left 0.3s;
  overflow: hidden;
}

.chat-main.full-width {
  margin-left: 64px;
}

.chat-header {
  padding: 16px 24px;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
}

.chat-title {
  font-size: 16px;
  font-weight: 500;
  color: #111827;
  margin: 0;
  text-align: center;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 6px;
  transition: all 0.2s;
}

.chat-title:hover {
  background-color: #f3f4f6;
}

.chat-title .edit-icon {
  font-size: 14px;
  color: #409eff;
  opacity: 0;
  transition: opacity 0.2s;
}

.chat-title:hover .edit-icon {
  opacity: 1;
}

.chat-title.editing {
  padding: 0;
  width: auto;
  min-width: 160px;
  max-width: 300px;
}

:deep(.el-input__wrapper) {
  padding: 4px 8px;
  box-shadow: 0 0 0 1px #dcdfe6 !important;
  background: #ffffff;
  border-radius: 4px;
  transition: all 0.2s;
  width: 100%;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #409eff !important;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #409eff !important;
}

:deep(.el-input__inner) {
  height: auto;
  line-height: normal;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  padding: 0;
  color: #111827;
}

.chat-messages {
  flex: 1;
  position: relative;
  background-color: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

:deep(.el-main) {
  padding: 0;
  display: flex;
  flex-direction: column;
}

:deep(.el-scrollbar) {
  height: 100%;
  flex: 1;
}

:deep(.el-scrollbar__wrap) {
  overflow-x: hidden;
}

:deep(.el-scrollbar__bar) {
  opacity: 0;
  transition: opacity 0.3s;
}

:deep(.el-scrollbar__bar.is-horizontal) {
  display: none;
}

:deep(.el-scrollbar__bar.is-vertical) {
  width: 8px;
  opacity: 0;
  transition: opacity 0.3s;
}

:deep(.el-scrollbar__thumb) {
  background-color: #29344b;
  border-radius: 4px;
}

:deep(.el-scrollbar__thumb:hover) {
  background-color: #11161f;
}

:deep(.el-scrollbar:hover .el-scrollbar__bar) {
  opacity: 1;
}

@media (max-width: 768px) {
  .chat-main {
    margin-left: 0;
  }
}

.welcome-input {
  margin-top: 32px;
  width: 100%;
}

.welcome-input :deep(.chat-input-wrapper) {
  background: none;
  border: none;
  padding: 0;
}

.welcome-input :deep(.chat-input-container) {
  padding: 0;
}
</style>

<style>
/* 自定义指令：自动聚焦 */
[v-focus] input {
  box-shadow: none !important;
}
</style> 