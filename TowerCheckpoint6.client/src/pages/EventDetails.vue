<template>
  <h5>Tower Logo here on the Deets Page</h5>
  <!-- TODO make sure to put some styling indication on this page if the event is cancelled as well as sold out(capacity)-->
  <!-- ^^^ you did this for cancelled on your Event component lines 6-8 -->

  <div v-if="event" class="container">
    <div class="row">
      <div class="col-md-12 card">
        <div class="card-title">
          <div v-if="event?.isCanceled">
            <p class="text-danger">Cancelled Event</p>
          </div>
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
        <!-- this will come from the tickets for this event -->
        <h1>Who is attending?:</h1>
      </div>
    </div>
  </div>

  (space between)
  <div class="container">
    <div class="row">
      <div class="mb-3 col-10 ms-5 ">
        <label for="exampleFormControlInput1" class="p-2 fw-bold form-label">Add Comment Here:</label>
        <!-- TODO make sure to bind the appropriate property here to your ref -->
        <input type="email" class="mt-1 form-control" v-model="editable.body" id="exampleFormControlInput1"
          placeholder="Your thoughts here!!">
        <div @click="createComment(event.id)" class="d-flex justify-content-end">
          <button class="btn btn-success p-1 mt-3 ">Add Comment</button>
        </div>
      </div>
      <div v-for="comment in comments" class="col-md-12">
        <h1>Comments:</h1>
        <div class="card rounded-0">
          <div>
            <div class="mt-3 p-2 card rounded-0">
              <img class="p-3 rounded-circle" title="Profile Picture" height="100" width="100"
                :src="comment.creator.picture" alt="">
              <p class="p-3">{{ comment?.creator.name }}</p>
              <p class="ms-3">{{ comment?.body }} </p>
              <div class="d-flex justify-content-end">
                <!-- TODO make sure that we are hiding this button from other -->
                <button @click="deleteEventCommentsById(comment?.id)" class="btn btn-danger ms-3">Delete Comment</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { onMounted, computed, ref } from 'vue';
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
    const editable = ref({})
    // NOTE useRoute allows me to access anything in the current URL [👍🏼]
    const route = useRoute();

    async function getEventById() {
      try {
        // TODO make sure we are accessing the correct parameter here, refer to what you called in the router.js...whatever comes after the ':' is the name of your param. [CORRECTED]
        const eventId = route.params.eventId;
        await eventsService.getEventById(eventId);
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

    // TODO need to get tickets for this event
    // refer to 'get event tickets' test in postman for what route to send this request to in the service

    onMounted(() => {
      getEventComments();
      getEventById(eventId);
    });
    return {
      editable,
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),
      event: computed(() => AppState.currentEvent),

      async cancelEvent() {
        // TODO need a button to call this method
        // make sure to pass the id;  where do I get the eventId on this page?

        try {
          if (await Pop.confirm('Are you sure you want to delete this event?')) {
            await eventsService.cancelEvent(eventId);
          }
        } catch (error) {
          logger.log(error);
          Pop.error(error.message);
        }
      },
      async deleteEventCommentsById(commentId) {
        try {
          debugger
          if (await Pop.confirm('Are you sure you want to delete this comment?')) {
            await commentsService.deleteEventCommentsById(commentId);
          }
        }
        catch (error) {
          logger.log("[comments with IDs]");
          Pop.error(error);
        }
      },
      async createComment(eventId) {
        try {
          // ANCHOR we will get the body from the input field, we also need to add the eventId to 
          const formData = editable.value
          // NOTE ^^ this line will add 'body' to form data, we also need to add the eventId
          // TODO grab the eventId and add it to the object I'm sending to the service.... where on this page can I access the id for the event?
          await commentsService.createComment(formData)
          editable.value = {}
        } catch (error) {
          Pop.error(error)
        }
      }

      // TODO need a method for creating a ticket, the server will handle the account id, you are responsible for providing the eventId
      // where can I access the id of the event of whose page I am currently on?
      // check postman for what type of req. we need to send here
      // ANCHOR make sure this button for creating a ticket goes away or disables if I have one, the event is cancelled, or capacity == 0



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
