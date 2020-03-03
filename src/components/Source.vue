<template>
    <b-card
            :title="name"
            :img-src="image"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
    >
    </b-card>
</template>

<script>
    export default {
        props: ['image', 'name'],
        data: function () {
            return {

            }
        }
    }
</script>