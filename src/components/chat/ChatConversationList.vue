<script setup lang="ts">
import { ChatRound, MoreFilled, Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import type { Conversation } from '@/types/chat'

const props = defineProps<{
  conversations: Conversation[]
  currentConversation: Conversation | null
}>()

const emit = defineEmits(['select', 'rename', 'delete'])

const showDropdown = ref<string | null>(null)

const handleCommand = (command: 'rename' | 'delete', conversation: Conversation) => {
  emit(command, conversation)
}
</script>

<template>
  <el-aside width="240px" class="chat-aside">
    <div class="aside-header">
      <h3>会话列表</h3>
    </div>
    
    <el-scrollbar class="conversation-list">
      <div
        v-for="conv in conversations"
        :key="conv.id"
        class="conversation-item"
        :class="{ active: currentConversation?.id === conv.id }"
        @click="$emit('select', conv)"
      >
        <el-icon><ChatRound /></el-icon>
        <span class="conversation-title">{{ conv.title }}</span>
        <el-dropdown
          trigger="click"
          @command="(cmd: 'rename' | 'delete') => handleCommand(cmd, conv)"
          @visible-change="(visible: boolean) => showDropdown = visible ? conv.id : null"
        >
          <el-icon 
            class="more-icon"
            :class="{ active: showDropdown === conv.id }"
          >
            <MoreFilled />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="rename">
                <el-icon><Edit /></el-icon>
                重命名
              </el-dropdown-item>
              <el-dropdown-item command="delete">
                <el-icon><Delete /></el-icon>
                删除
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped>
.chat-aside {
  margin-left: 64px;
  background-color: #f9fafb;
  border-right: none;
  display: flex;
  flex-direction: column;
  min-width: 240px;
  max-width: 240px;
}

.aside-header {
  padding: 20px 16px;
  border-bottom: none;
}

.aside-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #374151;
}

.conversation-list {
  flex: 1;
  padding: 8px;
}

.conversation-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin: 4px 0;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  color: #4b5563;
  position: relative;
}

.conversation-item:hover {
  background-color: #f3f4f6;
}

.conversation-item.active {
  background-color: #eef3fe;
}

.conversation-item .el-icon {
  margin-right: 8px;
  font-size: 18px;
}

.conversation-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.more-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  font-size: 16px;
  color: #409eff;
  opacity: 0;
  transition: all 0.2s;
  border-radius: 6px;
  background-color: #ecf5ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.more-icon:hover, .more-icon.active {
  background-color: #409eff;
  opacity: 1;
  color: #ffffff;
}

.conversation-item:hover .more-icon {
  opacity: 0.9;
}

:deep(.el-dropdown-menu__item) {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 14px;
}

:deep(.el-dropdown-menu__item .el-icon) {
  margin: 0;
  font-size: 16px;
}

:deep(.el-dropdown-menu__item:hover) {
  background-color: #ecf5ff;
  color: #409eff;
}

:deep(.el-dropdown-menu__item:hover .el-icon) {
  color: #409eff;
}
</style> 