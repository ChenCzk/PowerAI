import { ref } from 'vue'
import type { Message, Conversation } from '@/types/chat'
import { ElMessage, ElMessageBox } from 'element-plus'

export function useChat() {
  const conversations = ref<Conversation[]>([])
  const currentConversation = ref<Conversation | null>(null)
  const loading = ref(false)

  // 生成唯一ID
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // 创建新会话
  const createNewChat = () => {
    const newConversation: Conversation = {
      id: generateId(),
      title: '新的对话',
      messages: [],
      createTime: Date.now()
    }
    conversations.value.unshift(newConversation)
    currentConversation.value = newConversation
  }

  // 发送消息
  const sendMessage = async ({ content, isDeepThinking }: { content: string, isDeepThinking: boolean }) => {
    if (!currentConversation.value) return

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: Date.now()
    }

    // 如果是第一条消息，将其设置为会话标题
    if (currentConversation.value.messages.length === 0) {
      currentConversation.value.title = content.length > 20 ? content.slice(0, 20) + '...' : content
    }

    currentConversation.value.messages.push(userMessage)

    // 模拟AI回复
    loading.value = true
    try {
      // 这里可以替换为实际的 API 调用
      const demoContent = `# 回复示例

您发送的消息是：${content}

## 代码示例

\`\`\`javascript
// 一个简单的 JavaScript 函数
function processUserInput(input) {
  // 输入验证
  if (!input || typeof input !== 'string') {
    throw new Error('输入必须是非空字符串');
  }

  // 处理输入
  const processed = input
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/g, '');

  // 返回处理结果
  return {
    original: input,
    processed,
    length: processed.length,
    timestamp: new Date().toISOString()
  };
}

// 使用示例
const result = processUserInput("Hello, World! 👋");
console.log(result);
\`\`\`

## 图片展示

下面是一些相关的图片：

![Vue Logo](https://vuejs.org/images/logo.png)

![Element Plus](https://element-plus.org/images/element-plus-logo.svg)

## 功能说明

1. **代码高亮** - 支持多种编程语言
2. **图片展示** - 支持各种图片格式
3. **Markdown 格式** - 支持完整的 Markdown 语法

## 数学公式

行内公式：\\(E = mc^2\\)

块级公式：
\\[ f(x) = \\int_{-\\infty}^{\\infty} \\hat{f}(\\xi) e^{2\\pi i \\xi x} d\\xi \\]

## 表格展示

| 功能 | 支持情况 | 说明 |
|------|----------|------|
| Markdown | ✅ | 完整支持 |
| 代码高亮 | ✅ | 多语言 |
| 数学公式 | ✅ | KaTeX |
| 图片 | ✅ | 各种格式 |
| 表格 | ✅ | 自动对齐 |

> 提示：您可以尝试发送不同类型的消息，我会根据内容生成相应的回复格式。`

      const aiMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: isDeepThinking ? demoContent : '这是一个普通的回复...',
        timestamp: Date.now()
      }
      currentConversation.value.messages.push(aiMessage)
    } finally {
      loading.value = false
    }
  }

  // 切换会话
  const selectConversation = (conversation: Conversation) => {
    currentConversation.value = conversation
  }

  // 重命名会话
  const renameConversation = async (conversation: Conversation) => {
    try {
      const { value: newTitle } = await ElMessageBox.prompt('请输入新的会话名称', '重命名会话', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: conversation.title,
        inputValidator: (value) => {
          if (!value.trim()) {
            return '会话名称不能为空'
          }
          return true
        }
      })
      
      if (newTitle?.trim()) {
        conversation.title = newTitle.trim()
        ElMessage({
          type: 'success',
          message: '重命名成功'
        })
      }
    } catch {
      // 用户取消操作，不做任何处理
    }
  }

  // 删除会话
  const deleteConversation = async (conversation: Conversation) => {
    try {
      await ElMessageBox.confirm(
        '删除后无法恢复，是否确认删除？',
        '删除会话',
        {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
      
      const index = conversations.value.findIndex(c => c.id === conversation.id)
      if (index > -1) {
        conversations.value.splice(index, 1)
        if (currentConversation.value?.id === conversation.id) {
          currentConversation.value = conversations.value[0] || null
          if (!currentConversation.value) {
            createNewChat()
          }
        }
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      }
    } catch {
      // 用户取消操作，不做任何处理
    }
  }

  // 初始化
  if (conversations.value.length === 0) {
    createNewChat()
  }

  return {
    conversations,
    currentConversation,
    loading,
    createNewChat,
    sendMessage,
    selectConversation,
    renameConversation,
    deleteConversation
  }
} 