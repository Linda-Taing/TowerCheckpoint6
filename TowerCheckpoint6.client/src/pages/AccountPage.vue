<template>
  <h5>Tower Logo Here! (acct)</h5>


  <div class="container">
    <div class="row">
      <div v-for=" tick in tickets" class="col">
        <div class="card short">
          <!-- ANCHOR you may reuse your event component as long as you pass down an event -->
          <!-- Tickets Are Here! but they come in Raw data. Need to dig through tickets.event -->
          <!-- <img :src="tickets.events.coverImg" alt=""> 3-4 9:05 [tried to dig in as the example to the one above it will not allow me to dig into that next property. but when I have {{ tickets }} stil all raw data.] -->
          <div class="d-flex justify-content-end">
            {{ tickets }}
            <!-- make sure that you pass down the ticket id here 3-4 9:07 am[[tried to delete and came back with a 400 error saying the ticket is undefined even though I passed the ticket.id as value. It has props and I computed to be able to obtain its properties from Model and AppState and is still not accessible. error: http://localhost:3000/api/tickets/undefined]] -->
            <button @click="deleteTicket(tickets.id)" class="btn smaller btn-danger m-2 p-2">Delete ticket!</button>
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
      events: computed(() => AppState.events),
      attendees: computed(() => AppState.attendees),
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),
      // NOTE 3-4 10am[[moved this method to eventDetails page to be able to draw attendees to page there.]]
      // async createTicket() {
      //   try {
      //     await attendeesService.createTicket({ eventId: route.params.eventId });
      //   } catch (error) {
      //     logger.log(error)
      //     Pop.error(error, '[Am I creating a ticket?]')
      //   }
      // },

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
