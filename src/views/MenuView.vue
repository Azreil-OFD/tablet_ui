<template>
    <div class="container-card p-[2vh] flex flex-wrap">
        <div v-for="(item, index) in items" :key="index" class="item w-1/3">
            <div class="w-[70%] flex flex-col items-center pb-10">
                <img class="w-40 h-30 mb-3 rounded-full shadow-lg" :src="item.url" :alt="`Image ${index + 1}`" />
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ item.name }}</h5>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const items = ref([]);

const getAll = async () => {
    const category = 'nature';
    const apiKey = 'YQePJSgtUekxAuDQVI/giw==In3hGCLJnYEc4kcJ';
    const apiUrl = `https://api.api-ninjas.com/v1/randomimage?category=${category}`;

    try {
        const requests = Array.from({ length: 3 }, () =>
            axios.get(apiUrl, {
                headers: {
                    'X-Api-Key': apiKey,
                    'Accept': 'image/jpg'
                },
                responseType: 'blob'
            })
        );

        const responses = await Promise.all(requests);
        items.value = responses.map((response, index) => ({
            url: URL.createObjectURL(response.data),
            name: `Image ${index + 1}`
        }));
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    getAll();
});
</script>

<style scoped>
.container-card {
    display: flex;
    flex-wrap: wrap;
}

.item {
    display: flex;
    justify-content: center;
    width: 33.3333%;
}
</style>
