<script setup lang="ts">
import PassengersCard from '@/components/PassengerCard.vue'
import type { Passenger } from '@/type'
import { ref, onMounted, watchEffect, computed } from 'vue';
import PassengerService from '@/services/PassengerService'
import type { Axios, AxiosResponse } from 'axios';
import { RouterLink } from 'vue-router';

const passengers = ref<Passenger[]>([])
const totalPassenger = ref<number>(0)

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  limit: {
    type: Number,
    required: true
  }
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalPassenger.value / props.limit)
  return props.page < totalPages && passengers.value.length > 0
})

watchEffect(() => {
  PassengerService.getPassengers(props.limit, props.page)
    .then((response: AxiosResponse<Passenger[]>) => {
      passengers.value = response.data
      totalPassenger.value = parseInt(response.headers['x-total-count'])
    })
})
    

</script>

<template>
  <h1>Passengers</h1>
  <!--new element-->
  <div class="passengers">
    <PassengerCard v-for="passenger in passengers" :key="passenger.id" :passenger="passenger"></PassengerCard>
    <div class="panigation">
      <RouterLink :to="{name: 'passenger-list-view', query: { page: page - 1} }" rel="prev" v-if="page != 1">Prev page</RouterLink>
      <RouterLink :to="{name: 'passenger-list-view', query: { page: page + 1} }" rel="next" v-if="hasNextPage">Next page</RouterLink>
    </div>

  </div>
</template>

<style scoped>
.passengers {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.panigation {
  display: flex;
  width: 290px;
}
.panigation a {
  flex: 1;
  text-decoration: none;
  color: #2c3E50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>