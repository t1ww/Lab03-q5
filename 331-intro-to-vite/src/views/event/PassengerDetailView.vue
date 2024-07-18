<script setup lang="ts">
import type { Passenger } from '@/type';
import type { Prototype } from 'vue';

defineProps({
    event: {
        type: Object as Prototype<Passenger>,
        required: true
    }
})

</script>

<template>
    <div v-if="event">
        <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
        <p>{{ event.description }}</p>
    </div>
</template>