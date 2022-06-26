<script setup>
import TableHead from '@/components/Tables/TableHead.vue'
import TableBody from '@/components/Tables/TableBody.vue'
import TableFoot from '@/components/Tables/TableFoot.vue'
import { computed } from 'vue'
import { isArray, isFunction, isObject, isString } from '@/helpers/miscellaneous.js'
import { startCase } from '@/helpers/string.js'
import { keys, clone } from '@/helpers/object.js'
import { useTableSlot } from '@/composables/useTableSlot.js'

const { getHeadSlotName, getSlotCellName, getFootSlotName } = useTableSlot()

const props = defineProps({
    fields: {
        type: Array,
        default: () => ([])
    },
    items: {
        type: Array,
        default: () => ([])
    },
    showEmpty: {
        type: Boolean,
        default: false
    },
    footClone: {
        type: Boolean,
        default: false
    }
})

const computedFields = computed(() => normalizeFields(props.fields, props.items))

const processField = (key, value) => {
    let field = null
    if (isString(value)) {
        field = { key, label: value }
    } else if (isFunction(value)) {
        field = { key, formatter: value }
    } else if (isObject(value)) {
        field = clone(value)
        field.key = field.key || key
    } else if (value !== false) {
        field = { key }
    }
    return field
}

const normalizeFields = (orgFields, items) => {
    const fields = []

    if (isArray(orgFields)) {
        orgFields.filter(f => f).forEach(f => {
            if (isString(f)) {
                fields.push({ key: f, label: startCase(f) })
            } else if (isObject(f) && f.key && typeof isString(f)) {
                fields.push(clone(f))
            } else if (isObject(f) && keys(f).length === 1) {
                const key = keys(f)[0]
                const field = processField(key, f[key])
                if (field) {
                    fields.push(field)
                }
            }
        })
    }

    // If no field provided, take a sample from first record (if exits)
    if (fields.length === 0 && isArray(items) && items.length > 0) {
        const sample = items[0]
        keys(sample).forEach(k => {
            fields.push({ key: k, label: startCase(k) })
        })
    }

    // Ensure we have a unique array of fields and that they have String labels
    const memo = {}
    return fields.filter(f => {
        if (!memo[f.key]) {
            memo[f.key] = true
            f.label = isString(f.label) ? f.label : startCase(f.key)
            return true
        }

        return false
    })
}
</script>


<template>
    <table>
        <table-head :fields="computedFields">
            <template #[getHeadSlotName(f.key)]="{ column, field, label }" v-for="f in computedFields" :key="f.key">
                <slot :name="getHeadSlotName(f.key)" :column="column" :field="field" :label="label" />
            </template>
        </table-head>

        <table-body :fields="computedFields" :items="items" :show-empty="showEmpty">
            <template #empty>
                <slot name="empty"></slot>
            </template>
            <template #[getSlotCellName(f.key)]="{ field, item, index }" v-for="f in computedFields" :key="f.key">
                <slot :name="getSlotCellName(field.key)" :item="item" :index="index" :field="field" />
            </template>
        </table-body>

        <table-foot :fields="computedFields" :foot-clone="footClone">
            <template #getFootSlotName[f.key]="{ column, field, label }" v-for="f in computedFields" :key="f.key">
                <slot :name="getFootSlotName(field.key)" :column="column" :field="field" :label="label" />
            </template>
        </table-foot>
    </table>
</template>