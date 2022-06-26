<script setup>
import { useTableSlot } from '@/composables/useTableSlot'

defineProps({
    fields: {
        type: Array,
        default: () => ([])
    },
    footClone: {
        type: Boolean,
        default: false
    }
})

const { getFootSlotName } = useTableSlot()
</script>

<template>
    <tfoot>
        <tr v-if="footClone">
            <th v-for="field in fields" :key="field.key">
                <slot :name="getFootSlotName(field.key)" :column="field.key" :field="field" :label="field.label">
                    {{ field.label }}
                </slot>
            </th>
        </tr>
    </tfoot>
</template>

