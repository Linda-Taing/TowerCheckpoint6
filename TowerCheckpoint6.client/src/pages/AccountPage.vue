<template>
  <h5>Tower Logo Here! (acct)</h5>


  <div class="container">
    <div class="row">
      <div v-for=" tick in tickets" class="col">
        <div class="card short">
          <!-- ANCHOR you may reuse your event component as long as you pass down an event -->
          Tickets Are Here! but they come in Raw data. Need to dig through tickets.event
          <div class="d-flex justify-content-end">
            <!-- make sure that you pass down the ticket id here -->
            <button @click="deleteTicket()" class="btn smaller btn-danger m-2 p-2">Delete ticket!</button>
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
import { Ticket } from '../models/Ticket.js'


export default {
  props: {
    tickets: {
      type: Ticket,
    }
  },

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
      attendees: computed(() => AppState.attendees),
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),

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
</style>
