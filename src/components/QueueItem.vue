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
        props: ["image", "text", "source", "sourceId"],
        data: function () {
            return {
                editable: false,
                items: []
            }
        },
        methods: {
            approve: function (item) {
                this.$http.post(this.$constants.approveMessage + '/' + item.id)
            },
            decline: function (item) {
                this.$http.post(this.$constants.declineMessage + '/' + item.id)
            }
        },
        mounted() {
            this.$http.get(this.$constants.queue + "/" + this.$route.params.queueId)
                .then(response => this.items = response.data);
        },
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