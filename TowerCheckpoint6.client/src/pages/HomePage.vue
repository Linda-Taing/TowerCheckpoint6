<template>
  <div class="p-2 d-flex justify-content-between bg-dark">
    <h1>Tower</h1>
    <button v-if="account.id" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#test-modal">
      Create Event
    </button>

  </div>
  <Modal id="test-modal" modal-title="Create Event">
    <createEvent />
  </Modal>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <img class="img-fluid cover mb-4"
          src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y29uY2VydHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          alt="" srcset="">
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-10 m-auto ">
        <div class="bg-secondary rounded p-3 d-flex justify-content-around">
          <button @click="changeFilterType('')" class="btn btn-outline-light">All</button>
          <button @click="changeFilterType('concert')" class="btn btn-outline-light">Concert</button>
          <button @click="changeFilterType('sport')" class="btn btn-outline-light">Sport</button>
          <button @click="changeFilterType('digital')" class="btn btn-outline-light">Digital</button>
          <button @click="changeFilterType('convention')" class="btn btn-outline-light">Convention</button>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <h2>Events </h2>
        </div>
      </div>
      <div v-for="eve in events" class="col-md-4">
        <Event :event="eve" />
      </div>
    </div>
  </div>
</template>

<script>
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js'
import { logger } from '../utils/Logger.js';
import { onMounted, computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute()
    const filterType = ref('')

    async function getAllEvents() {
      try {
        await eventsService.getAllEvents();
      } catch (error) {
        logger.log(error);
        Pop.error(error, '[GETTING ALL EVENTS]');
      }
    }

    onMounted(() => {
      getAllEvents();
    })

    return {
      account: computed(() => AppState.account),
      events: computed(() => {
        if (!filterType.value) {
          return AppState.events
        }
        else {
          return AppState.events.filter(e => e.type == filterType.value)
        }
      }),
      changeFilterType(type) {
        filterType.value = type
      },

      // ---Do Not Pass --- End of Return VVVV //
    }
  }
}
</script>

<style scoped lang="scss">
.cover {
  height: 20em;
  width: 100%;
  object-fit: cover;


}
</style>
