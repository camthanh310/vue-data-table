<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import DataTable from '@/components/Tables/DataTable.vue'

const users = ref([])

onMounted(() => {
  fetchUser()
})

const fields = [
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'email',
    label: 'Email'
  }
]

const fetchUser = async () => {
  try {
    const response = await axios.get('http://user-api.test/api/users')
    users.value = response.data
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <main>
    <data-table :fields="fields" :items="users.data" show-empty>
      <template #empty>
        Record not found
      </template>
      <template #head(name)="row">
        <div class="font-bold text-green-600">
          {{ row.label }}
        </div>
      </template>
      <template #cell(name)="row">
        <div class="font-bold text-red-500">{{ row.item.name }}</div>
      </template>
    </data-table>
  </main>
</template>

