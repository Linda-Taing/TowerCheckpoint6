<template>
  <h5>Tower Logo here on the Deets Page</h5>

  <div v-if="event" class="container">
    <div class="row">
      <div class="col-md-12 card">
        <div class="card-title">
          <h2>{{ event?.name }}</h2>
        </div>
        <img class="pic p-2 " :src="event?.coverImg" alt="">
        <!-- <div class="d-flex justify-content-end p-2">
          <div v-if="account.id && ticket.id" class="d-flex justify-content-end p-2">
          <button @click="cancelEvent()" class="btn btn-danger w-25 ">Remove Event</button>
        </div> -->
        <p>Date of event: {{ event?.startDate }}</p>
        <p>Type of event: {{ event?.type }}</p>
        <p class="fw-bold pb-0">Description:
        <p class="pt-0">{{ event?.description }}</p>
        </p>

        <p class="fw-bold">capacity: {{ event?.capacity }}</p>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1>Who is attending?:</h1>
      </div>
    </div>
  </div>

  (space between)
  <div class="container">
    <div class="row">
      <div v-for="comment in comments" class="col-md-12">
        <h1>Comments:</h1>
        <div class="card rounded-0">
          <p>Comment:</p>
          <p>{{ comment?.creator.name }}</p>
          <img class="rounded-circle" height="100" width="100" :src="comment.creator.picture" alt="">
          <p>{{ comment?.body }} </p>
          <button @click="deleteEventCommentsById()" class="btn btn-danger w-50">Delete Comment</button>
        </div>

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
      account: computed(() => AppState.account),
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
      async deleteEventCommentsById(commentId, creatorId) {
        try {
          if (await Pop.confirm('Are you sure you want to delete this comment?')) {
            const commentId = route.params.comments.creatorId;
            await commentsService.deleteEventCommentsById(commentId);
          }
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



<style lang="scss" scoped>
.pic {
  height: 50vh;
  width: 100%;
  object-fit: cover;
}
</style>
