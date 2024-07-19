<template>
    <div class="container-card p-[2vh] flex">
        <a href="#" @click="router.push('/menu')"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Table</a>
        <a href="#" @click="router.push('/view')"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">TV
        </a>
    </div>


</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<style scoped>
.container-card {
    gap: 10px;
}
</style>