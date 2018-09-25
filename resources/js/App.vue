<template>
    <div id="main">
        <Header></Header>
        <div class="page-content d-flex align-items-stretch">

            <div class="side-bar">
                sidebar lugar del sidebar
            </div>
            <div class="container-fluid">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from './components/navigation/Header';

    export default {
        components: {Header},
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
