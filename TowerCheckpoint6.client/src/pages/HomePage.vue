<template>
  <h5>Tower Logo Here! (home)</h5>
</template>

<script>
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js'
import { logger } from '../utils/Logger.js';
import { onMounted, computed } from 'vue';
import { AppState } from '../AppState.js';

export default {
  setup() {
    async function getAllEvents() {
      try {
        await eventsService.getAllEvents();
      } catch (error) {
        logger.log(error);
        Pop.error(error, '[GETTING ALL EVENTS]');
      }
    }
    onMounted(() => {
      getAllEvents();
    })
    return {
      events: computed(() => AppState.events)

      // ---Do Not Pass --- End of Return VVVV //
    }
  }
}
</script>

<style scoped lang="scss"></style>
