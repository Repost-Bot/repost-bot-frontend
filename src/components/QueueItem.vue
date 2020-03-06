<template>
    <div class="container">
        <mobile-queue-item v-if="isMobile"></mobile-queue-item>
        <desktop-queue-item v-else></desktop-queue-item>
    </div>
</template>

<script>
    import DesktopQueueItem from "./DesktopQueueItem.vue";
    import MobileQueueItem from "./MobileQueueItem.vue";

    export default {
        components: {MobileQueueItem, DesktopQueueItem},
        computed: {
            isMobile: () => window.innerWidth < 600
        }
    }
</script>

<style>
    .card-img-left {
        height: 100%;
    }

    .item {
        margin-bottom: 30px;
    }
</style>