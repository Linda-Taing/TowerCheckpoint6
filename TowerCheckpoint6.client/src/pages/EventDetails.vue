<template>
  <section v-if="currentEvent">
    <h1 class="bg-dark p-2">Tower: Event Details</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-12 card">
          <div class="card-title">
            <div v-if="currentEvent.isCanceled">
              <p class="text-danger fs-1 text-center">Cancelled Event</p>
            </div>
            <h2>{{ currentEvent.name }}</h2>
          </div>
          <img class="pic p-2 " :src="currentEvent.coverImg" alt="">
          <div class=" p-2">
            <div v-if="account.id && !currentEvent.isCanceled" class=" p- 2">
              <div v-if="currentEvent.capacity == 0"></div>
              <button v-else="account.id && comment.creatorId" @click="createTicket(currentEvent.id)"
                class="btn btn-success">Attend Event
              </button>
              <!-- <div v-if="account.id && !currentEvent.isCanceled"></div> -->
              <button v-if="!currentEvent.isCanceled" @click="cancelEvent(currentEvent.id)"
                class="btn btn-danger w-25 ">Remove
                Event</button>

            </div>
            <p class="fw-bold">Date of event: {{ currentEvent.startDate }}</p>
            <p class="fw-bold">Type of event: {{ currentEvent.type }}</p>
            <p class="fw-bold pb-0">Description:
            <p class="pt-0">{{ currentEvent.description }}</p>
            </p>
            <div v-if="currentEvent.capacity == 0">
              <p class="text-danger fs-1 text-center"> Sold-Out</p>
            </div>
            <p class="fw-bold">capacity: {{ currentEvent.capacity }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container Attending-Section">
      <div class="row">
        <div class="col-md-12 card">
          <!-- TODO 3-4 8:30am -->
          <!-- this will come from the tickets for this event -->
          <h1>Who is attending?:</h1>
          <div class="p-3 " v-for="ticket in tickets">
            {{ ticket.profile.name }}
            <img class="rounded-circle" height="50" width="50" :src="ticket.profile.picture" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="container ">
      <div class="row">
        <div class="mb-3 col-10 ms-5 ">
          <h1>Comments:</h1>
          <label for="exampleFormControlInput1" class="p-2 fw-bold form-label">Add Comment Here:</label>
          <input type="email" class="mt-1 form-control" v-model="editable.body" id="exampleFormControlInput1"
            placeholder="Your thoughts here!!">
          <div @click="createComment()" class="d-flex justify-content-end">
            <button class="btn btn-success p-1 mt-3 ">Add Comment</button>
          </div>
        </div>
        <div v-for="comment in comments" class="col-md-12">
          <div>
            <div class="mt-3 p-2 card rounded-0">
              <img class="p-3 rounded-circle" title="Profile Picture" height="100" width="100"
                :src="comment.creator.picture" alt="">
              <p class="p-3">{{ comment?.creator.name }}</p>
              <p class="ms-3">{{ comment?.body }} </p>
              <div class="d-flex justify-content-end">
                <!-- TODO make sure that we are hiding this button from other -->
                <div v-if="account.id == comment.creatorId">
                  <button @click="deleteEventCommentsById(comment?.id)" class="btn btn-danger ms-3">Delete
                    Comment</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
  <section class="loading" v-else>
    <h1 class="text-center">loading...</h1>
  </section>
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
import { router } from '../router.js';


export default {


  setup() {
    //  useRoute allows me to access anything in the current URL [👍🏼]
    const editable = ref({})
    const route = useRoute();

    async function getEventById() {
      try {
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
      currentEvent: computed(() => AppState.currentEvent),
      tickets: computed(() => AppState.tickets),

      async cancelEvent(eventId) {
        try {
          const eventId = route.params.eventId
          if (await Pop.confirm('Are you sure you want to delete this event?')) {
            await eventsService.cancelEvent(eventId);
          }
        } catch (error) {
          logger.log(error);
          Pop.error('You CANNOT cancel an event you did not create', error);
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
          logger.log('[ARE YOU DELETED?]')
        }
      },

      async createComment() {
        try {
          const formData = editable.value
          // NOTE ^^ this line will add 'body' to form data, we also need to add the eventId
          // TODO grab the eventId and add it to the object I'm sending to the service.... where on this page can I access the id for the event?
          formData.eventId = route.params.eventId
          await commentsService.createComment(formData)
          editable.value = {}
        } catch (error) {
          Pop.error(error)
        }
      },

      async createTicket() {
        try {
          await attendeesService.createTicket({ eventId: route.params.eventId });
        } catch (error) {
          logger.log(error)
          Pop.error(error, '[Am I creating a ticket?]')
        }
      },

      async deleteTicket(ticketId) {
        try {
          if (await Pop.confirm('Are you sure you DO NOT want to attend?')) {
            await attendeesService.deleteTicket(ticketId);
          }
        }
        catch (error) {
          logger.log(error);
          Pop.error(error.message);
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
