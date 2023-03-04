<template>
  <h5>Tower Logo here on the Deets Page</h5>
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
        <div class=" p-2">
          <div v-if="account.id" class=" p-2">
            <button @click="createTicket(event?.id)">Attend Event</button>
            <button @click="cancelEvent(event?.id)" class="btn btn-danger w-25 ">Remove
              Event</button>
          </div>
          <p>Date of event: {{ event?.startDate }}</p>
          <p>Type of event: {{ event?.type }}</p>
          <p class="fw-bold pb-0">Description:
          <p class="pt-0">{{ event?.description }}</p>
          </p>
          <div v-if="event?.capacity == 0">
            <p class="text-danger"> Sold-Out</p>
          </div>
          <p class="fw-bold">capacity: {{ event?.capacity }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <!-- TODO 3-4 8:30am -->
        <!-- this will come from the tickets for this event -->
        <h1>Who is attending?:</h1>
        {{ tickets }}
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="mb-3 col-10 ms-5 ">
        <label for="exampleFormControlInput1" class="p-2 fw-bold form-label">Add Comment Here:</label>
        <!-- TODO make sure to bind the appropriate property here to your ref [looking for eventId still....added v-model editable.body]-->
        <!-- FIXME  3-4 AT 8:30 [looking for eventId still....added v-model editable.body]-->
        <input type="email" class="mt-1 form-control" v-model="editable.body" id="exampleFormControlInput1"
          placeholder="Your thoughts here!!">
        <div @click="createComment()" class="d-flex justify-content-end">
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
                <div v-if="account.id">
                  <button @click="deleteEventCommentsById(comment?.id)" class="btn btn-danger ms-3">Delete
                    Comment</button>
                </div>
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
import { attendeesService } from '../services/AttendeesService.js';
import { TowerEvent } from '../models/TowerEvent.js';
import { router } from '../router.js';


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
        // TODO make sure we are accessing the correct parameter here, refer to what you called in the router.js...whatever comes after the ':' is the name of your param. 
        // FIXME 3-4 8:30AM [CORRECTED but not responding when I refresh it is still disappearing from page and leaves only the hard code template.]
        const eventId = route.params.eventId;
        await eventsService.getEventById(eventId);
      } catch (error) {
        Pop.error(error, '[GETTING EVENT BY ID]')
      }
    }
    //FIXME - 3-4 @ 8:30 AM comments come in network as http://localhost:3000/api/events/:eventId/comments ... VVVV
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
    async function getEventTickets() {
      try {
        const eventId = route.params.eventId;
        await attendeesService.getEventTickets(eventId);

      } catch (error) {
        Pop.error(error, '[GETTING ATTENDEES?]')

      }
    }

    onMounted(() => {
      getEventComments();
      getEventById();
      getEventTickets();
    });
    return {
      editable,
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),
      event: computed(() => AppState.currentEvent),
      events: computed(() => AppState.events),
      tickets: computed(() => AppState.tickets),

      async cancelEvent(eventId) {
        // TODO need a button to call this method
        // make sure to pass the id;  where do I get the eventId on this page?
        // FIXME 3-4 @ 8:35am [I updated the eventId in params and in the @click I can cancel event but it won't router.push me back to HomePage.]
        try {
          const eventId = route.params.eventId
          if (await Pop.confirm('Are you sure you want to delete this event?')) {
            await eventsService.cancelEvent(eventId);
          }
        } catch (error) {
          logger.log(error);
          Pop.error(error.message);
          router.push("/")
        }
      },
      async deleteEventCommentsById(commentId) {
        try {
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
          const eventId = route.params.eventId
          await commentsService.createComment(formData)
          editable.value = {}
        } catch (error) {
          Pop.error(error)
        }
      },
      // TODO need a method for creating a ticket, the server will handle the account id, you are responsible for providing the eventId
      // where can I access the id of the event of whose page I am currently on?
      // check postman for what type of req. we need to send here
      // ANCHOR make sure this button for creating a ticket goes away or disables if I have one, the event is cancelled, or capacity == 0
      async createTicket(eventId) {
        try {
          const eventId = await attendeesService.createTicket({ eventId: route.params.eventId });
        } catch (error) {
          logger.log(error)
          Pop.error(error, '[Am I creating a ticket?]')
        }
      },


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
