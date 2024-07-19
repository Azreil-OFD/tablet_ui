<template>
    <div ref="videoContainer" style="width: 100%; height: 100%;">
        <video ref="videoPlayer" :src="video" controls style="width: 100%; height: 100%;"></video>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from "@/utils/supabaseClient";
import { useKeyStore } from '@/stores/useVideoStore';

const video = ref("");
const videoPlayer = ref(null);
const videoContainer = ref(null);

const start = (url) => {
    video.value = url;
    const player = videoPlayer.value;

    player.load();
    player.onloadedmetadata = () => {
        if (player.requestFullscreen) {
            player.requestFullscreen();
        } else if (player.mozRequestFullScreen) { /* Firefox */
            player.mozRequestFullScreen();
        } else if (player.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            player.webkitRequestFullscreen();
        } else if (player.msRequestFullscreen) { /* IE/Edge */
            player.msRequestFullscreen();
        }
        player.play();
    };
};

const stop = () => {
    const player = videoPlayer.value;
    player.pause();
};

supabase.channel('custom-insert-channel')
    .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'poolx' },
        (payload) => {
            const key = useKeyStore();
            if (key.getKey() === payload.new.key) {
                if (payload.new.url === 'stop') {
                    stop()
                    video.value = ""

                } else {
                    start(payload.new.url);
                }
            }
        }
    )
    .subscribe();

onMounted(() => {
    // Здесь вы можете указать тестовый URL для начальной загрузки
    // start("your-video-url.mp4");
});
</script>

<style>
/* Стиль для видео контейнера, чтобы занимал весь экран */
html,
body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

#app {
    width: 100%;
    height: 100%;
}
</style>