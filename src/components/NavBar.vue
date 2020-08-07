<template>
    <div class="nav-bar">
        <b-navbar toggleable="lg" type="dark" variant="primary">
            <b-navbar-brand>VUE_APP_TITLE Bot</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <router-link to="/posts" tag="b-nav-item" active-class="active">Posts</router-link>
                    <router-link to="/queue" tag="b-nav-item" active-class="active">Queue</router-link>
                    <router-link to="/input-sources" tag="b-nav-item" active-class="active">Sources</router-link>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<style>
    .nav-bar {
        margin-bottom: 60px;
    }
</style>