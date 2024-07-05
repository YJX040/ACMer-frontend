import { DefineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = DefineStore('', () => {
    const token = ref('')
    const auth = ref(false)

    return {
        token,
        auth
    }

}, {
    persist: {
        enabled: true,
        strategies: [
            {
                type: 'local',
                storage: window.localStorage
            }
        ]
    }
})