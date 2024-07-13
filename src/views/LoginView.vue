<template>
    <div class="max-w-sm mx-auto pt-[10%]" id="keyForm">
        <label for="key" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ключ активации</label>

        <div class="relative">
            <input type="text" id="key"
                class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="XXX-XXX" required v-model="key" min="7" />
            <button @click="activate"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Activate</button>
        </div>
        <div v-if="error"
            class="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert">
            {{ error }}
        </div>

        <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">Для получения ключа
            продукта обратитесь к нашим <a href="#"
                class="font-medium text-blue-600 hover:underline dark:text-blue-500">администраторам</a>.</p>


    </div>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const key = ref('')
const error = ref('')
const addAsp = ref(false);
watch(key, (newVal, oldVal) => {
    if (addAsp.value) {
        addAsp.value = false
        return
    }

    if (newVal.length > 4 && newVal[3] !== '-') {
        key.value = key.value.slice(0, 3) + '-' + key.value.slice(3, key.value.length)
        addAsp.value = true;
        return
    } else if (oldVal.length === 5 && newVal.length === 4) {
        key.value = key.value.slice(0, 3)
        addAsp.value = true;
        return
    } else
        if (key.value.length === 3) {
            addAsp.value = true;
            key.value += '-'
        } else if (key.value.length === 8) {
            addAsp.value = true;
            key.value = oldVal;
        }
    if (/[a-zа-я]/.test(key.value)) {
        key.value = key.value.toLocaleUpperCase()
        addAsp.value = true
        return
    }
})

const activate = () => {
    if (key.value === "HHH-HHH") {
        router.push('/menu')
    } else {
        error.value = "Невалидный ключ активации!"
    }
}
</script>

<style>
.hidden {
    display: none;
}
</style>
