<script setup lang="ts">
import { ref } from 'vue';
import PassengerService from '@/services/PassengerService';
import { RouterView } from 'vue-router';
import { useRouter } from 'vue-router';
import type { Passenger } from '@/type'

const passenger = ref<Passenger | null> (null)
const router = useRouter()

const props = defineProps({
    id: String
})

    PassengerService.getPassengerById(Number(props.id))
    .then((response)=> {
        passenger.value = response.data
    }).catch(error => {
        console.log(error)
        if (error.response && error.response.status === 404) {
            router.push({ name: '404-resource', params: { resource: 'passenger' } })
        } else {
            router.push({ name: 'network-error' })
        }
    })

</script>

<template>
    <div v-if="passenger">
        <h1>{{ passenger.first_name }}</h1>

        <div id="nav">
        <RouterLink :to="{name: 'passenger-detail', params: { id } }">Details</RouterLink> |
        <RouterLink :to="{name: 'passenger-register', params: { id } }">Register</RouterLink> |
        <RouterLink :to="{name: 'passenger-edit', params: { id } }">Edit</RouterLink>
       </div>
        
        <RouterView :passenger="passenger" ></RouterView>
    </div>
</template>