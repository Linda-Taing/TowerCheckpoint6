<template>
  <h-5>Tower Logo Here! (acct)</h-5>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import Pop from '../utils/Pop.js'
export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      async getMyTickets() {
        try {


        } catch (error) {
          Pop.error(error)
        }
      }





      //NOTE do not crossVVVV end of Return//
    }
  }
}
</script>

<style scoped></style>
