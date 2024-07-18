<script setup lang="ts">
import PassengersCard from '@/components/PassengerCard.vue'
import EventInfo from '@/components/EventInfo.vue'
import Event from '@/types/Event'
import { ref, onMounted, watchEffect, computed } from 'vue';
import EventService from '@/services/EventService'
import type { Axios, AxiosResponse } from 'axios';
import type { EventItem } from '@/type';
import { RouterLink } from 'vue-router';

const events = ref<Event[]>(null)
const totalEvent = ref<number>(0)

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
  const totalPages = Math.ceil(totalEvent.value / props.limit)
  return props.page < totalPages && events.value.length > 0
})

watchEffect(() => {
  EventService.getEvents(props.limit, props.page)
    .then((response: AxiosResponse<EventItem[]>) => {
      events.value = response.data
      totalEvent.value = parseInt(response.headers['x-total-count'])
    })
})
    

</script>

<template>
  <h1>Passengers</h1>
  <!--new element-->
  <div class="events">
    <PassengersCard v-for="event in events" :key="event.id" :event="event"></PassengersCard>
    <div class="panigation">
      <RouterLink :to="{name: 'passenger-list-view', query: { page: page - 1} }" rel="prev" v-if="page != 1">Prev page</RouterLink>
      <RouterLink :to="{name: 'passenger-list-view', query: { page: page + 1} }" rel="next" v-if="hasNextPage">Next page</RouterLink>
    </div>

  </div>
</template>

<style scoped>
.events {
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