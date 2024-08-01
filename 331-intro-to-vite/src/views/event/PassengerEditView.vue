<script setup lang="ts">
import type { Passenger } from '@/type'
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const props = defineProps<{
  passenger: Passenger
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { passenger } = toRefs(props)
const router = useRouter()
const store = useMessageStore()
const edit = () => {
  // updating
  store.updateMessage(
    'Please wait.. data for ' + props.passenger.first_name + ' is being updated..'
  )
  setTimeout(() => {
    // done update
    store.resetMessage()
    store.updateMessage('Data edited for ' + props.passenger.first_name + ' has been updated.')
    setTimeout(() => {
      // reset done update message
      store.resetMessage()
    }, 3000)
    router.push({ name: 'passenger-list-view', params: { id: props.passenger.id } })
  }, 3000)
}
</script>

<template>
  <br />
  <button @click="edit">Edit</button>
</template>
