<template>
    <div class="container">
        <b-card :img-src="item.imageUrl" img-left v-for="(item, idx) in items" v-bind:key="idx" class="item">
            <h4>{{item.status}}</h4>
            <b-form-textarea
                    max-rows="10"
                    v-model="item.text"
                    v-if="item.editable"
            >
            </b-form-textarea>
            <b-card-text v-if="!item.editable">
                {{item.text}}
            </b-card-text>
            <div class="form-row" v-if="!item.editable">
                <div class="col">
                    <b-button class="card-button" variant="primary" @click="item.editable = !item.editable">Edit</b-button>
                </div>
                <div class="col">
                    <b-button class="card-button" variant="success" @click="approve(item)" v-if="item.status === 'CREATED'">Approve</b-button>
                </div>
                <div class="col">
                    <b-button class="card-button" variant="danger" @click="decline(item)" v-if="item.status === 'CREATED'">Decline</b-button>
                </div>
            </div>
            <div class="form-row" v-if="item.editable">
                <div class="col">
                    <b-button class="card-button" variant="primary" @click="item.editable = !item.editable">Finish</b-button>
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>

    export default {
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