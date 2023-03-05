<template>
  <h5>Tower Logo Here! (acct)</h5>

  <div class="container">
    <div class="row">
      <div v-for=" ticket in tickets" class="col">
        <div class="card short">
          <img class="m-2 ticketPic" :src="ticket.event.coverImg" alt="">
          <p> {{ ticket.event.name }}</p>
          <p>{{ ticket.event.location }}</p>
          <!-- <p> {{ ticket.event.startDate }}</p>[[coming in with long date but the homePage has the adjusted and correct date display!]] -->

          <div class="d-flex justify-content-end ">
            <button @click="deleteTicket(ticket.id)" class="btn smaller btn-danger m-2 p-2">Delete ticket!</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { attendeesService } from '../services/AttendeesService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'


export default {

  setup() {

    async function getMyTickets() {
      try {
        await attendeesService.getMyTickets()
        logger.log('[did i get my tickets?]')
      } catch (error) {
        Pop.error(error)
      }
    }
    onMounted(() => {
      getMyTickets();
    });

    return {
      events: computed(() => AppState.events),
      attendees: computed(() => AppState.attendees),
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),

      async deleteTicket(ticketId) {
        try {
          if (await Pop.confirm('Are you sure you want to delete the ticket?')) {
            await attendeesService.deleteTicket(ticketId);
          }
        }
        catch (error) {
          logger.log(error);
          Pop.error(error.message);
        }
      }


      //NOTE do not crossVVVV end of Return//
    }
  }
}
</script>

<style scoped>
.short {
  width: 15 em;
}

.smaller {
  width: 8em;
}

.ticketPic {
  height: 10em;
  object-fit: cover;
}
</style>
