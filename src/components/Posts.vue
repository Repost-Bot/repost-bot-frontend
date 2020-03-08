<template>
    <div class="container">
        <spinner :show="isLoading"></spinner>
        <div :class="{'loading': isLoading}">
            <div class="controls">
                <b-form-select id="source" v-model="source" :options="sources" class="controls"></b-form-select>
                <button
                        type="submit"
                        style="width: 100%"
                        class="btn btn-primary controls"
                        @click="loadMore"
                        :disabled="source == null"
                >More
                </button>

                <div class="form-row">
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Count" v-model="count">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Offset" v-model="offset">
                    </div>
                    <div class="col">
                        <button type="submit" class="btn btn-primary" @click="load" :disabled="source == null">Apply</button>
                    </div>
                </div>
            </div>
            <post-item v-bind:key="idx"
                  v-for="(post, idx) in posts"
                  :img-src="post.images[0]"
                  :text="post.text"
                  class="post">
                <div class="form-row">
                    <div class="col">
                        <b-button class="item-button" variant="outline-primary" @click="sendPost(post)">Edit</b-button>
                    </div>
                    <div class="col">
                        <b-button class="item-button" variant="primary" @click="sendPost(post)">Post</b-button>
                    </div>
                    <div class="col">
                        <b-button class="item-button" variant="primary" @click="sendPost(post)">Post</b-button>
                    </div>
                </div>
            </post-item>

            <button
                    type="submit"
                    style="width: 100%"
                    class="btn btn-primary controls"
                    @click="loadLess"
                    :disabled="offset === 0"
            >Less
            </button>
        </div>
    </div>
</template>

<script>
    import Spinner from "./Spinner.vue";
    import PostItem from "./PostItem";

    export default {
        components: {PostItem, Spinner},
        data: function () {
            return {
                posts: [],
                count: 10,
                offset: 0,
                sources: [],
                source: null,
                isLoading: false
            }
        },
        methods: {
            loadMore: function () {
                this.offset += 10;
                this.load();
            },
            loadLess: function () {
                this.offset -= 10;
                this.load();
            },
            sendPost: function (item) {
                this.isLoading = true;
                this.$http.post(
                    this.$constants.createPost,
                    {
                        domainId: this.source,
                        post: {
                            images: item.images,
                            text: item.text,
                            sourceId: item.sourceId
                        }
                    }
                )
                    .then(() => this.isLoading = false);
            },
            load: function () {
                this.isLoading = true;
                this.$http.get(
                    this.$constants.getPosts + '/' + this.source.domainType + '/' + this.source.domainId,
                    {params: {count: this.count, offset: this.offset}}
                )
                    .then(response => {
                        this.posts = response.data
                    })
                    .then(() => this.isLoading = false);
            },
            getSources: function () {
                this.isLoading = true;
                this.$http.get(
                    this.$constants.getSources,
                )
                    .then(response => {
                        this.sources = response.data;
                        this.sources.forEach(item => {
                            item.text = item.name;
                            item.value = {domainType: item.domainId.domainType, domainId: item.domainId.domainId}
                        });
                    })
                    .then(() => this.isLoading = false);
            }
        },
        mounted() {
            this.getSources();
        }
    }
</script>

<style>
    .controls {
        margin-bottom: 20px;
    }

    .post {
        margin-bottom: 20px;
    }

    .item-button {
        width: 100%;
    }
</style>