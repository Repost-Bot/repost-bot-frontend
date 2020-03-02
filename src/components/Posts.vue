<template>
    <div class="container">
        <div class="controls">
            <button type="submit" style="width: 100%" class="btn btn-primary controls" @click="loadMore">More</button>

            <div class="form-row">
                <div class="col">
                    <input type="text" class="form-control" placeholder="Count" v-model="count">
                </div>
                <div class="col">
                    <input type="text" class="form-control" placeholder="Offset" v-model="offset">
                </div>
                <div class="col">
                    <button type="submit" class="btn btn-primary" @click="load">Apply</button>
                </div>
            </div>
        </div>
        <post v-bind:key="post.text" v-for="post in posts" :image="post.image" :text="post.content" class="post"></post>

        <button
                type="submit"
                style="width: 100%"
                class="btn btn-primary controls"
                @click="loadLess"
                :disabled="offset === 0"
        >Less</button>
    </div>
</template>

<script>
    import Post from "./Post";

    export default {
        components: {Post},
        data: function () {
            return {
                posts: [],
                count: 10,
                offset: 0
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
            load: function () {
                this.$http.get(
                    this.$constants.getPosts,
                    {params: {count: this.count, offset: this.offset}}
                )
                    .then(response => {
                        this.posts = response.data
                    })
            }
        },
        mounted() {
            this.$http.get(
                this.$constants.getPosts,
                {params: {count: this.count, offset: this.offset}}
            )
                .then(response => {
                    this.posts = response.data
                })
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
</style>