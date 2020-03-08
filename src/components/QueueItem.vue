<template>
    <div class="container">
        <spinner :show="isLoading"></spinner>
        <div :class="{'loading': isLoading}">
            <post-item
                    v-for="(item, idx) in items"
                    :key="idx"
                    :text="item.text"
                    :img-src="item.imageUrl.split(',')[0]"
            >
                <div class="form-row">
                    <div class="col">
                        <b-button
                                class="card-button"
                                variant="outline-primary"
                                v-b-modal="'modal' + idx"
                                :disabled="isLoading"
                        >View
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
            </post-item>
            <!--            <b-card
                                border-variant="primary"
                                :img-src="item.imageUrl.split(',')[0]"
                                v-for="(item, idx) in items"
                                v-bind:key="idx"
                                class="item"
                        >
                            <h4>{{item.status}}</h4>
                            <b-card-text>
                                {{item.text.substring(0, 100)}}r...
                            </b-card-text>

                            <b-modal :id="'modal' + idx">
                                <b-form-textarea
                                        max-rows="10"
                                        v-model="item.text"
                                >
                                </b-form-textarea>
                            </b-modal>
                        </b-card>-->
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
                    .then(() => this.isLoading = false);
            },
            decline: function (item) {
                this.isLoading = true;
                this.$http.post(this.$constants.declineMessage + '/' + item.id)
                    .then(() => this.load())
                    .then(() => this.isLoading = false);
            },
            load: function () {
                this.isLoading = true;
                this.$http.get(this.$constants.queue + "/" + this.$route.params.queueId)
                    .then(response => {
                        this.items = response.data
                            .filter(item => item.status !== 'DECLINED');
                        this.items.forEach(item => item.showModal = false);
                    })
                    .then(() => this.isLoading = false);
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