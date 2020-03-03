<template>
    <div class="container">
        <div class="controls">
            <b-form-select id="source" v-model="source" :options="sources" class="controls"></b-form-select>
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
        <post v-bind:key="post.text" v-for="post in posts" :image="post.images[0]" :text="post.text" :source="source"
              class="post"></post>

        <button
                type="submit"
                style="width: 100%"
                class="btn btn-primary controls"
                @click="loadLess"
                :disabled="offset === 0"
        >Less
        </button>
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
                offset: 0,
                sources: [],
                source: null
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
                console.log(this.source);
                this.$http.get(
                    this.$constants.getPosts + '/' + this.source.domainType + '/' + this.source.domainId,
                    {params: {count: this.count, offset: this.offset}}
                )
                    .then(response => {
                        this.posts = response.data
                    })
            },
            getSources: function () {
                this.$http.get(
                    this.$constants.getSources,
                )
                    .then(response => {
                        this.sources = response.data;
                        this.sources.forEach(item => {
                            item.text = item.name;
                            item.value = {domainType: item.domainId.domainType, domainId: item.domainId.domainId}
                        });
                    });
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
</style>