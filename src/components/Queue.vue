<template>
    <div class="container">
        <div class="header form-row">
            <div class="col">
                <h4>Queue</h4>
            </div>
            <div class="col">
                <h4>Date</h4>
            </div>
        </div>
        <div class="queue-row form-row" v-for="(elem, idx) in queue" v-bind:key="idx">
            <div class="col">
                <router-link :to="'/queue/' + elem.queueId"><h4>{{elem.queueId}}</h4></router-link>
            </div>
            <div class="col">
                <h4>{{elem.dateCreated}}</h4>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                queue: []
            }
        },
        mounted() {
            this.$http.get(this.$store.state.apiConstants.queue)
                .then(response => this.queue = response.data);
        }
    }
</script>

<style>
    .header {
        margin-bottom: 60px;
    }

    .queue-row {
        margin-bottom: 30px;
    }
</style>