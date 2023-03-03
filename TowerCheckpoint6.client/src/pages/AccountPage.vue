<template>
  <h5>Tower Logo Here! (acct)</h5>
  {{ tickets }}
</template>

<script>
import { computed, onMounted } from 'vue'
import { routeLocationKey } from 'vue-router'
import { AppState } from '../AppState'
import { Attendee } from '../models/Attendee.js'
import { attendeesService } from '../services/AttendeesService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
export default {
  props: {
    attendee: {
      type: Attendee,
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
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.attendees),
      async createTicket() {
        try {
          await attendeesService.createTicket({ eventId: route.params.eventId });
        } catch (error) {
          logger.log(error)
          Pop.error(error, '[Am I creating a ticket?]')
        }
      }





      //NOTE do not crossVVVV end of Return//
    }
  }
}
</script>

<style scoped></style>
