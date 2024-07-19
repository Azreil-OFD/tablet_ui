<template>
    <div class="container-card p-[2vh] flex flex-wrap" v-if="active_id == null && active_id !== 0">
        <div v-for="(item, index) in items" :key="item.id" class="item w-1/3">
            <div class="w-[70%] flex flex-col items-center pb-10" @click="active_id = index">
                <img class="w-40 h-30 mb-3 rounded-full shadow-lg" :src="item.icon_url" :alt="`Image ${item.id}`" />
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ item.title }}</h5>
            </div>
        </div>
    </div>
    <div v-if="active_id !== null" class=" flex items-center  flex-col">
        <img class="image" :src="items[active_id].icon_url" />
        <button
            class=" bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            @click="active_id = null">
            Стоп
        </button>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { StandAPI } from '@/utils/video';
import { supabase } from '@/utils/supabaseClient';
import { useKeyStore } from '@/stores/useVideoStore';
import { useRouter } from 'vue-router';

const items = ref([]);
const active_id = ref(null)

watch(active_id, async () => {
    const keyStorage = useKeyStore()
    const key = keyStorage.getKey()
    if (active_id.value === null) {
        await supabase
            .from('poolx')
            .insert([
                { key: key, url: 'stop' },
            ])
        return
    }

    if (key) {
        await supabase
            .from('poolx')
            .insert([
                { key: key, url: items.value[active_id.value].video_url },
            ])
    } else {
        useRouter().push('/login')
    }

})
const getAll = async () => {
    const api = new StandAPI();
    const keyStorage = useKeyStore()
    const key = keyStorage.getKey()
    if (key) {
        console.log(key)
        items.value = await (await api.getIcons(key)).data[0].collection
        console.log(items.value)
    } else {
        useRouter().push('/login')
    }
};

onMounted(async () => {
    await getAll();
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

.image {
    height: 70vh;
    margin-bottom: 10px;
}
</style>
