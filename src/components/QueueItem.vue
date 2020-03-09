<template>
    <div class="container">
        <spinner :show="isLoading"></spinner>
        <div :class="{'loading': isLoading}">
            <post-item
                    v-for="(item, idx) in items"
                    :key="idx"
                    :text="item.text"
                    :img-src="item.imageUrl.split(',')[0]"
                    :title="item.status"
            >
                <div class="form-row">
                    <div class="col">
                        <b-button
                                class="card-button"
                                variant="outline-primary"
                                v-b-modal="'modal' + idx"
                                :disabled="isLoading"
                        >Edit
                        </b-button>
                    </div>
                    <div class="col">
                        <b-button
                                class="card-button"
                                variant="success"
                                @click="approve(item)"
                                v-if="item.status === 'CREATED'"
                                :disabled="isLoading"
                        >Approve
                        </b-button>
                    </div>
                    <div class="col">
                        <b-button class="card-button" variant="danger" @click="decline(item)"
                                  v-if="item.status !== 'DECLINED'">Decline
                        </b-button>
                    </div>
                </div>
                <b-modal :id="'modal' + idx">
                    <b-form-textarea
                            max-rows="10"
                            v-model="item.text"
                    >
                    </b-form-textarea>
                </b-modal>
            </post-item>
        </div>
    </div>
</template>

<script>

    import Spinner from "./Spinner.vue";
    import PostItem from "./PostItem";

    export default {
        components: {PostItem, Spinner},
        props: ["image", "text", "source", "sourceId"],
        data: function () {
            return {
                editable: false,
                items: [],
                ed: false,
                isLoading: false
            }
        },
        methods: {
            approve: function (item) {
                this.isLoading = true;
                this.$http.post(this.$constants.approveMessage + '/' + item.id)
                    .then(() => this.load())
                    .then(() => this.isLoading = false)
                    .then(() => this.$toast.open({
                        type: 'success',
                        message: 'Item with id ' + item.id + ' approved'
                    }));
            },
            decline: function (item) {
                this.isLoading = true;
                this.$http.post(this.$constants.declineMessage + '/' + item.id)
                    .then(() => this.load())
                    .then(() => this.isLoading = false)
                    .then(() => this.$toast.open({
                        type: 'warning',
                        message: 'Item with id ' + item.id + ' declined'
                    }));
            },
            load: function () {
                this.isLoading = true;
                this.$http.get(this.$constants.queue + "/" + this.$route.params.queueId)
                    .then(response => {
                        this.items = response.data
                            .filter(item => item.status !== 'DECLINED');
                        this.items.forEach(item => item.showModal = false);
                    })
                    .then(() => this.isLoading = false)
                    .then(() => this.$toast.open({
                        type: 'success',
                        message: 'Loaded ' + this.items.length + ' items'
                    }));
            }
        },
        mounted() {
            this.load();
        }
    }
</script>

<style>
    .item {
        margin-bottom: 30px;
    }

    .loading {
        opacity: 0.5;
    }

    .card-button {
        width: 100%;
    }
</style>