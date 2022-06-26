<script setup>
import TableRow from '@/components/Tables/TableRow.vue'
defineProps({
    items: {
        type: Array,
        default: () => ([])
    },
    fields: {
        type: Array,
        default: () => ([])
    }
})
</script>

<template>
    <tbody>
        <TableRow
            v-for="(item, idx) in items"
            :key="idx"
            :item="item"
            :fields="fields"
            tag="td"
        />
    </tbody>
</template>