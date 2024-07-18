<script setup lang="ts">
import type { EventItem } from '@/type';
import type { Prototype } from 'vue';

defineProps({
    event: {
        type: Object as Prototype<EventItem>,
        required: true
    }
})

</script>

<template>
    <p>Edit the event here</p>
</template>