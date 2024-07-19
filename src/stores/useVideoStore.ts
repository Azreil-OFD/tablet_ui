import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { StandAPI } from '@/utils/video'

export const useKeyStore = defineStore('keys', () => {
  const api = new StandAPI()
  const key = ref<string | null>(null)

  const getKey = () => {
    if (!key.value) {
      key.value = localStorage.getItem('api_key')
    }
    return key.value
  }

  const setKey = (newKey: string) => {
    key.value = newKey
    localStorage.setItem('api_key', newKey)
  }

  const activated = computed(async () => {
    const currentKey = getKey()
    if (currentKey) {
      const response = await api.checkKeyValidity(currentKey)
      return response === 'success'
    }
    return false
  })

  return { getKey, setKey, activated }
})
