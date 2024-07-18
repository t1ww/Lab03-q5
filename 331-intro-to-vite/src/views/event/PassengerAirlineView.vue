<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AirlineService from '@/services/AirlineService';
import PassengerService from '@/services/PassengerService';
import type { Airline } from '@/type';
import type { Passenger } from '@/type';

const airline = ref<Airline | null>(null);
const passenger = ref<Passenger | null>(null);
const route = useRoute();

onMounted(() => {
  const id = parseInt(route.params.id as string, 10);
  if (!isNaN(id)) {
    AirlineService.getAirlineById(id)
      .then(response => {
        airline.value = response.data;
      })
      .catch(error => {
        console.error('Failed to fetch airline details:', error);
      });

    PassengerService.getPassengerById(id)
    .then(response => {
      passenger.value = response.data;
    })
    .catch(error => {
      console.error('Failed to fetch passenger details:', error)
    });
  }
});
</script>

<template>
  <div v-if="airline">
    <h1>{{ passenger?.airlineId }}</h1>
    <p>Airline name:: {{ airline.AirlineName }}</p>
    <p>Airline email: {{ airline.email }}</p>
    <p>Airline Addres: {{ airline.address }}</p>
  </div>
  <div v-else>
    <p>Loading airline details...</p>
  </div>
</template>