<template>
  <h5>Tower Logo here! (event deets)</h5>
  <div class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">New Event</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <form @submit.prevent="createEvent()">
      <div class="modal-body">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input v-model="editable.name" required type="text" class="form-control" id="name" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="coverImg" class="form-label">coverImg</label>
          <input v-model="editable.coverImg" required type="url" class="form-control" id="coverImg"
            aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="location" class="form-label">location</label>
          <input v-model="editable.location" required type="text" class="form-control" id="location"
            aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="capacity" class="form-label">capacity</label>
          <input v-model="editable.capacity" required type="number" class="form-control" id="capacity"
            aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="startDate" class="form-label">startDate</label>
          <input v-model="editable.startDate" required type="date" class="form-control" id="startDate"
            aria-describedby="emailHelp">
        </div>
        <label for="type" class="form-label">type</label>
        <select v-model="editable.type" class="form-select mb-3" aria-label="Default select example" id="type">
          <option value="all types">All Types</option>
          <option value="concert">Concert</option>
          <option value="convention">Conventions</option>
          <option value="digital">Digital</option>
          <option value="sports">Sports</option>
        </select>
      </div>
      <div class="modal-footer">
        <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Create Album</button>
      </div>
    </form>
  </div>
</template>

<script>
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';
import { ref } from 'vue';


export default {

  setup() {
    const editable = ref({})
    return {
      editable,
      async createEvent() {
        try {
          const formData = editable.value
          await eventsService.createEvent(formData)
          editable.value = {}
        } catch (error) {
          Pop.error(error)
        }
      },

      // ---Do not pass-- VVVVV End Of Return //
    }
  }
}
</script>


<style lang="scss" scoped></style>
