<script setup lang="ts">
import { User, Service } from '@element-plus/icons-vue'
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import mk from 'markdown-it-katex'
import 'highlight.js/styles/github.css'
import 'katex/dist/katex.min.css'
import type { Message } from '@/types/chat'

const props = defineProps<{
  message: Message
}>()

// 配置 markdown-it
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }
    return '' // 使用默认的转义
  }
}).use(mk) // 启用 KaTeX 支持

// 转换消息内容为 HTML
const renderedContent = computed(() => {
  return md.render(props.message.content)
})
</script>

<template>
  <div class="message-item" :class="message.role">
    <div class="message-avatar">
      <el-icon v-if="message.role === 'assistant'">
        <Service />
      </el-icon>
      <el-icon v-else>
        <User />
      </el-icon>
    </div>
    <div class="message-content markdown-body" v-html="renderedContent" />
  </div>
</template>

<style scoped>
.message-item {
  padding: 16px 24px;
  display: flex;
  gap: 16px;
  border-bottom: none;
  
  &:hover {
    background-color: #fafafa;
  }
}

.message-item.user {
  flex-direction: row-reverse;
}

.message-item.user .message-avatar {
  margin: 0;
}

.message-item.user .message-content {
  color: #1f2937;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #eef2ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid #e5e7eb;
}

.message-avatar .el-icon {
  font-size: 16px;
  color: #6366f1;
}

.message-content {
  flex: 1;
  font-size: 15px;
  line-height: 1.6;
  color: #334155;
  
  :deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(h5), :deep(h6) {
    margin: 1em 0 0.5em;
    font-weight: 500;
    color: #0f172a;
  }
  
  :deep(pre) {
    margin: 0.5em 0;
    padding: 12px 16px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
    line-height: 1.5;
    overflow-x: auto;
  }
  
  :deep(blockquote) {
    margin: 0.5em 0;
    padding: 0.5em 1em;
    border-left: 4px solid #e2e8f0;
    background: #f8fafc;
    color: #64748b;
  }
}

.message-item.assistant {
  background-color: #ffffff;
}

.message-item.assistant .message-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.message-item.user .message-avatar {
  background-color: #f0f9ff;
}

.message-item.user .message-avatar .el-icon {
  color: #0ea5e9;
}

/* Markdown 样式 */
:deep(.markdown-body) {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.6;
  width: 100%;
}

:deep(.markdown-body pre) {
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  margin: 12px 0;
  border: 1px solid #e2e8f0;
  width: 100%;
}

:deep(.markdown-body code) {
  background-color: #f1f5f9;
  border-radius: 4px;
  padding: 0.2em 0.4em;
  font-size: 85%;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
  color: #0f172a;
}

:deep(.markdown-body pre code) {
  background-color: transparent;
  padding: 0;
  color: #334155;
}

:deep(.markdown-body p) {
  margin: 0;
  color: #334155;
}

.message-item.user :deep(.markdown-body p) {
  text-align: right;
}

:deep(.markdown-body h1),
:deep(.markdown-body h2),
:deep(.markdown-body h3),
:deep(.markdown-body h4),
:deep(.markdown-body h5),
:deep(.markdown-body h6) {
  margin: 16px 0 8px;
  font-weight: 600;
  line-height: 1.25;
  color: #0f172a;
  width: 100%;
}

.message-item.user :deep(.markdown-body h1),
.message-item.user :deep(.markdown-body h2),
.message-item.user :deep(.markdown-body h3),
.message-item.user :deep(.markdown-body h4),
.message-item.user :deep(.markdown-body h5),
.message-item.user :deep(.markdown-body h6) {
  text-align: right;
}

:deep(.markdown-body h1) {
  font-size: 1.5em;
  margin-top: 0;
}

:deep(.markdown-body h2) {
  font-size: 1.3em;
  margin-top: 12px;
}

:deep(.markdown-body h3) {
  font-size: 1.1em;
  margin-top: 12px;
}

:deep(.markdown-body blockquote) {
  border-left: 4px solid #e2e8f0;
  margin: 8px 0;
  padding: 0 12px;
  color: #64748b;
  width: 100%;
}

.message-item.user :deep(.markdown-body blockquote) {
  text-align: right;
  border-left: none;
  border-right: 4px solid #e2e8f0;
  padding: 0 12px;
}

:deep(.markdown-body ul),
:deep(.markdown-body ol) {
  padding-left: 1.2em;
  margin: 4px 0;
  width: 100%;
}

.message-item.user :deep(.markdown-body ul),
.message-item.user :deep(.markdown-body ol) {
  padding-left: 0;
  padding-right: 1.2em;
  text-align: right;
}

:deep(.markdown-body li) {
  margin: 2px 0;
}

:deep(.markdown-body table) {
  border-collapse: collapse;
  width: 100%;
  margin: 12px 0;
  font-size: 14px;
}

:deep(.markdown-body table th),
:deep(.markdown-body table td) {
  padding: 6px 10px;
  border: 1px solid #e2e8f0;
}

:deep(.markdown-body table th) {
  background-color: #f8fafc;
  font-weight: 500;
}

:deep(.markdown-body img) {
  max-width: 100%;
  border-radius: 6px;
  margin: 8px 0;
}

:deep(.markdown-body .katex-display) {
  margin: 12px 0;
  padding: 6px 0;
  overflow-x: auto;
  overflow-y: hidden;
  background-color: #f8fafc;
  border-radius: 6px;
  width: 100%;
}
</style> 