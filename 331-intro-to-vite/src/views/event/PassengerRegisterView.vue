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
    <p>register from here</p>
</template>