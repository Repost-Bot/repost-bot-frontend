<template>
    <div class="container">
        <spinner :show="isLoading"></spinner>
        <div :class="{'loading': isLoading}">
            <post-item
                    v-for="item in items"
                    :key="item.id"
                    :text="item.text"
                    :img-src="item.imageUrl.split(',')[0]"
                    :title="item.status + ' -- post date: ' + formatDate(item.dateRetrieve)"
            >
                <div class="form-row" v-if="!['DELIVERED', 'DECLINED'].includes(item.status) ">
                    <div class="col">
                        <b-button
                                class="card-button"
                                variant="outline-primary"
                                v-b-modal="'modal' + item.id"
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
                        <b-button class="card-button"
                                  variant="danger"
                                  @click="decline(item)"
                                  v-if="item.status !== 'DECLINED'"
                                  :disabled="isLoading"
                        >Decline
                        </b-button>
                    </div>
                </div>
                <b-modal :ref="'modal' + item.id" :id="'modal' + item.id">
                    <b-form-textarea
                            max-rows="10"
                            v-model="item.text"
                    >
                    </b-form-textarea>
                    <template v-slot:modal-footer>
                        <div class="w-100">
                            <b-button variant="primary" @click="editPost(item)">
                                Edit
                            </b-button>
                        </div>
                    </template>
                </b-modal>
            </post-item>
        </div>
    </div>
</template>

<script>

    import Spinner from "./Spinner.vue";
    import PostItem from "./PostItem";
    import moment from 'moment';

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
            closeModal: function(id) {
                this.$refs['modal' + id][0].hide();
            },
            editPost: function (item) {
                this.isLoading = true;
                this.$http.put(this.$constants.queuePost + '/' + item.id, item)
                    .then(() => this.load())
                    .then(() => this.isLoading = false)
                    .then(() => this.closeModal(item.id))
                    .then(() => this.$toast.open({
                        type: 'success',
                        message: 'Item with id ' + item.id + ' updated'
                    }));
            },
            approve: function (item) {
                this.isLoading = true;
                this.$http.post(this.$constants.queuePost + '/' + item.id + '/approve')
                    .then(() => this.load())
                    .then(() => this.isLoading = false)
                    .then(() => this.$toast.open({
                        type: 'success',
                        message: 'Item with id ' + item.id + ' approved'
                    }));
            },
            decline: function (item) {
                this.isLoading = true;
                this.$http.post(this.$constants.queuePost + '/' + item.id + '/decline')
                    .then(() => this.load())
                    .then(() => this.isLoading = false)
                    .then(() => this.$toast.open({
                        type: 'warning',
                        message: 'Item with id ' + item.id + ' declined'
                    }));
            },
            formatDate: function (date) {
                return moment(String(date)).format('MMMM Do YYYY, HH:mm');
            },
            load: function () {
                this.isLoading = true;
                this.$http.get(this.$constants.queue + "/" + this.$route.params.queueId)
                    .then(response => {
                        this.items = response.data;
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