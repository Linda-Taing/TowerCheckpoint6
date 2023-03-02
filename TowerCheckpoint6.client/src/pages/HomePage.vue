<template>
  <h5>Tower Logo Here! (home)</h5>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h2>Events </h2>
      </div>
      <div v-for="eve in events" class="col-md-3">
        <Event :event="eve" />
      </div>
    </div>
  </div>
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
