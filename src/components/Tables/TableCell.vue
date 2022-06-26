<script setup>
defineProps({
    tagName: {
        type: String,
        required: true
    },
    fields: {
        type: Array,
        default: () => ([])
    },
    defaultSlotName: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <component :is="tagName">
        <slot :name="defaultSlotName" />
    </component>
</template>