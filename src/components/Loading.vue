<template>
    <div class="container-loading">
    </div>
</template>

<script>
export default {
    name: 'loading'
}
</script>

<style scoped>
div.container-loading{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.548);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10000000;
    display: block;
}
</style>