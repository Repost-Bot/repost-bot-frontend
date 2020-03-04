<template>
    <b-card :img-src="image" img-left>
        <b-form-textarea
                max-rows="10"
                v-model="text"
                v-if="editable"
        >
        </b-form-textarea>
        <b-card-text v-if="!editable">
            {{text}}
        </b-card-text>
        <div class="form-row" v-if="!editable">
            <div class="col">
                <b-button class="card-button" variant="primary" @click="editable = !editable">Edit</b-button>
            </div>
            <div class="col">
                <b-button class="card-button" variant="primary" @click="post">Post</b-button>
            </div>
            <div class="col">
                <b-button class="card-button" variant="primary">Schedule</b-button>
            </div>
        </div>
        <div class="form-row" v-if="editable">
            <div class="col">
                <b-button class="card-button" variant="primary" @click="editable = !editable">Finish</b-button>
            </div>
        </div>
    </b-card>
</template>

<script>

    export default {
        props: ["image", "text", "source", "sourceId"],
        data: function () {
            return {
                editable: false
            }
        },
        methods: {
            post: function () {
                this.$http.post(
                    this.$constants.createPost,
                    {
                        domainId: this.source,
                        post: {
                            images: [this.image],
                            text: this.text,
                            sourceId: this.sourceId
                        }
                    }
                )
            }
        }
    }
</script>

<style>
    .card-img-left {
        height: 100%;
    }
</style>