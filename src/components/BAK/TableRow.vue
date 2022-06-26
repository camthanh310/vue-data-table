<script setup>
import TableCell from '@/components/Tables/TableCell.vue'

defineProps({
    item: {
        type: [Array, Object],
        default: () => ([])
    },
    fields: {
        type: Array,
        default: () => ([])
    },
    tag: {
        type: String,
        required: true
    }
})
</script>

<template>
    <tr>
        <TableCell
            v-for="(field, index) in fields"
            :key="field.key"
            :field="field"
            :cell-index="index"
            :item="item"
            :tag="tag"
        />
    </tr>
</template>