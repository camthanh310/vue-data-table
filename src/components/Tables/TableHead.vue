<script setup>
import { useTableSlot } from '@/composables/useTableSlot'

defineProps({
    fields: {
        type: Array,
        default: () => ([])
    }
})

const { getHeadSlotName } = useTableSlot()
</script>

<template>
    <thead>
        <tr>
            <th v-for="field in fields" :key="field.key">
                <slot :name="getHeadSlotName(field.key)" :column="field.key" :field="field" :label="field.label">
                    {{ field.label }}
                </slot>
            </th>
        </tr>
    </thead>
</template>