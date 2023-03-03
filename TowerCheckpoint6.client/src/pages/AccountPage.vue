<template>
  <h5>Tower Logo Here! (acct)</h5>
  <button @click="deleteTicket()" class="btn btn-danger p-2">Delete ticket!</button>


  <div class="container">
    <div class="row">
      <div v-for=" tick in tickets" class="col">
        {{ tickets }}
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

      async deleteTicket(attendeeId) {
        try {
          if (await Pop.confirm('Are you sure you want to delete the ticket?')) {
            await attendeesService.deleteTicket(attendeeId);
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

<style scoped></style>
