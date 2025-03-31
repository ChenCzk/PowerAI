import { ref, nextTick, type Ref } from 'vue'
import type { Conversation } from '@/types/chat'

export function useTitleEdit(currentConversation: Ref<Conversation | null>) {
  const isEditingTitle = ref(false)
  const editingTitle = ref('')

  const startEditTitle = () => {
    if (!currentConversation.value) return
    editingTitle.value = currentConversation.value.title
    isEditingTitle.value = true
    nextTick(() => {
      const input = document.querySelector('.chat-title.editing input') as HTMLInputElement
      if (input) {
        input.focus()
        input.select()
      }
    })
  }

  const saveTitle = () => {
    if (!currentConversation.value) return
    currentConversation.value.title = editingTitle.value.trim() || '新的对话'
    isEditingTitle.value = false
  }

  const handleTitleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      saveTitle()
    } else if (e.key === 'Escape') {
      isEditingTitle.value = false
    }
  }

  return {
    isEditingTitle,
    editingTitle,
    startEditTitle,
    saveTitle,
    handleTitleKeydown
  }
} 