<template>
  <div class="ms-5">

    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#test-modal">
      Create Event
    </button>
    <Modal id="test-modal" modal-title="Create Event">
      <createEvent />
    </Modal>
  </div>
</template>

<script>
// import { eventsService } from '../services/EventsService.js';
// import Pop from '../utils/Pop.js';
// import { ref } from 'vue';
// import { AppState } from '../AppState.js';
// import { computed } from 'vue';


export default {


  setup() {
    // const editable = ref({})
    return {
      // editable,
      // events: computed(() => AppState.events),

      // async createEvent() {
      //   try {
      //     const formData = editable.value
      //     const towerEvent = await eventsService.createEvent(formData)
      //     editable.value = {}
      //     router.push({ name: 'EventDetails', params: { eventId: towerEvent.id } })
      //   } catch (error) {
      //     logger.log(error)
      //     Pop.error(error)
      //   }
      // },

      // ---Do not pass-- VVVVV End Of Return //
    }
  }
}
</script>


<style lang="scss" scoped></style>
