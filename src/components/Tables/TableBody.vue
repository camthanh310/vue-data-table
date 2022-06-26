<script setup>
import { useTableSlot } from '@/composables/useTableSlot'

defineProps({
    fields: {
        type: Array,
        default: () => ([])
    },
    items: {
        type: Array,
        default: () => ([])
    },
    emptyText: {
        type: String,
        default: 'There are no records to show'
    },
    showEmpty: {
        type: Boolean,
        default: false
    }
})

const { getSlotCellName } = useTableSlot()
</script>

<template>
    <tbody>
        <tr v-if="showEmpty && !items.length">
            <td :colspan="fields.length">
                <slot name="empty">
                    {{ emptyText }}
                </slot>
            </td>
        </tr>
        <tr v-for="(item, idx) in items" :key="idx">
            <td
                v-for="(field, $idx) in fields"
                :key="$idx"
            >
                <slot :name="getSlotCellName(field.key)" :field="field" :item="item" :index="idx">
                    {{ item[field.key] }}
                </slot>
            </td>
        </tr>
    </tbody>
</template>

