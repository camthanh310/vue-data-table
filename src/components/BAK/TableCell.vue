<script setup>
defineProps({
    item: {
        type: [Array, Object],
        default: () => ([])
    },
    cellIndex: {
        type: [String, Number],
        default: ''
    },
    field: {
        type: [Array, Object],
        default: () => ([])
    },
    tag: {
        type: String,
        required: true
    }
})

const slotName = (key) => `cell(${key})`
</script>

<template>
    <component :is="tag">
        <slot
            :name="slotName(field.key)"
            :item="item"
            :index="cellIndex"
        >
            {{ item[field.key] }}
        </slot>
    </component>
</template>


