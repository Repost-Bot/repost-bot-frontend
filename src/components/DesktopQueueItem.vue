<template>
    <div class="container">
        <b-card
                :img-src="item.imageUrl"
                v-for="(item, idx) in items"
                v-bind:key="idx"
                class="item"
                img-left
                style="max-width: 20rem"
        >
            <h4>{{item.status}}</h4>
            <b-card-text>
                {{item.text.substring(0, 100)}}...
            </b-card-text>
            <div class="form-row">
                <div class="col">
                    <b-button
                            class="card-button"
                            style="width: 100%; margin-top: 20px"
                            variant="outline-primary"
                            v-b-modal="'modal' + idx"
                    >View</b-button>
                </div>
                <div class="col">
                    <b-button class="card-button" variant="success" @click="approve(item)" v-if="item.status === 'CREATED'">Approve</b-button>
                </div>
                <div class="col">
                    <b-button class="card-button" variant="danger" @click="decline(item)" v-if="item.status !== 'DECLINED'">Decline</b-button>
                </div>
            </div>
            <b-modal :id="'modal' + idx">
                <b-form-textarea
                        max-rows="10"
                        v-model="item.text"
                >
                </b-form-textarea>
            </b-modal>
        </b-card>
    </div>
</template>

<script>

    export default {
        props: ["image", "text", "source", "sourceId"],
        data: function () {
            return {
                editable: false,
                items: [],
                ed: false
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
                .then(response => {
                    this.items = response.data
                    this.items.forEach(item => item.showModal = false);
                });
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