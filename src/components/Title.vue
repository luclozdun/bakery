<template>
    <div>
        <p class="text-3xl font-bold text-title">{{ text }}</p>
    </div>
</template>

<script>
export default {
    name: 'Title',
    props: {
        text: String
    }
}
</script>