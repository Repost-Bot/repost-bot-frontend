<template>
    <div class="container">
        <b-card
                :title="title"
                class="item"
                border-variant="primary"
        >
            <b-card-img
                    :src="imgSrc"
                    :class="{'collapsed': collapsed}"
                    @click="collapsed = !collapsed"
            ></b-card-img>
            <b-card-text v-if="collapsed">
                {{text.substring(0, 100)}}...
            </b-card-text>
            <b-card-text v-if="!collapsed">
                {{text}}
            </b-card-text>
            <slot></slot>
        </b-card>
    </div>
</template>

<script>
    export default {
        props: {
            text: String,
            imgSrc: String,
            title: String
        },
        data: () => {
            return {
                collapsed: true
            }
        }
    }
</script>

<style>
    .item {
        margin-bottom: 30px;
    }

    .collapsed {
        height: 200px;
        object-fit: cover;
        cursor: pointer;
    }

    .collapsed:hover {
        opacity: 0.7;
    }
</style>