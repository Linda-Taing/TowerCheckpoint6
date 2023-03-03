<template>
  <h5>Tower Logo here on the Deets Page</h5>

  <button @click="cancelEvent()" class="btn btn-danger">Remove Event</button>
  <div v-if="event" class="container">
    <div class="row">
      <div class="col-md-12 card">
        <img :src="event?.coverImg" alt="">
        {{ event?.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { onMounted, computed } from 'vue';
import Pop from '../utils/Pop.js';
import { commentsService } from '../services/CommentsService.js';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import { TowerEvent } from '../models/TowerEvent.js';


export default {
  props: {
    event: {
      type: TowerEvent,
    }
  },

  setup() {
    const route = useRoute();

    async function getEventById() {
      try {
        const currentEventId = route.params.currentEventId
        await eventsService.getEventById(currentEventId);
      } catch (error) {
        Pop.error(error, '[GETTING EVENT BY ID]')
      }
    }

    async function getEventComments() {
      try {
        const eventId = route.params.eventId;
        await commentsService.getEventComments(eventId);
      }
      catch (error) {
        Pop.error(error, "[GETTING EVENT COMMENTS]");
      }
    }

    onMounted(() => {
      getEventComments();
      getEventById();
    });
    return {

      comments: computed(() => AppState.comments),
      event: computed(() => AppState.currentEvent),

      async cancelEvent(eventId) {
        try {
          if (await Pop.confirm('Are you sure you want to delete this event?')) {
            await eventsService.cancelEvent(eventId);
          }
        } catch (error) {
          logger.log(error);
          Pop.error(error.message);
        }
      },
      async deleteEventCommentsById() {
        try {
          const commentId = route.params.commentId;
          await commentsService.deleteEventCommentsById(commentId);
        }
        catch (error) {
          logger.log("[comments with IDs]");
          Pop.error(error);
        }
      }
      // ---Do not pass-- VVVVV End Of Return //
    };
  },
}
</script>


<style lang="scss" scoped></style>
