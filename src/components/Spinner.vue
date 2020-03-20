<template>
    <div class="spinner" v-if="show">
        <b-spinner style="width: 10rem; height: 10rem;" variant="primary" label="Spinning"></b-spinner>
    </div>
</template>

<script>
    export default {
        props: {
            show: Boolean
        }
    }
</script>

<style>
    .spinner {
        position: fixed;
        left: 40%;
        top: 35%;
    }
</style>