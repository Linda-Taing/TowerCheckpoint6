<template>
    <form @submit.prevent="createEvent()">
        <div class="modal-body">
            <div class="mb-3">
                <label for="name" class="form-label">Event Name</label>
                <input v-model="editable.name" required type="text" class="form-control" id="name"
                    aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="coverImg" class="form-label">Event Image</label>
                <input v-model="editable.coverImg" required type="url" class="form-control" id="coverImg"
                    aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="location" class="form-label">Location</label>
                <input v-model="editable.location" required type="text" class="form-control" id="location"
                    aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="capacity" class="form-label">Capacity</label>
                <input v-model="editable.capacity" required type="number" class="form-control" id="capacity"
                    aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <input v-model="editable.description" required type="text" textarea name="description" class="form-control"
                    id="description" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="startDate" class="form-label">Date</label>
                <input v-model="editable.startDate" required type="date" class="form-control" id="startDate"
                    aria-describedby="emailHelp">
            </div>
            <label for="type" class="form-label">Event Type:</label>
            <select v-model="editable.type" class="form-select mb-3" aria-label="Default select example" id="type">
                <option value="view-types">View Types</option>
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
</template>


<script>
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';
import { ref } from 'vue';
import { router } from '../router.js';

export default {

    setup() {
        const editable = ref({})
        return {
            editable,
            async createEvent() {
                try {
                    const formData = editable.value
                    const towerEvent = await eventsService.createEvent(formData)
                    editable.value = {}
                    if (towerEvent?.id) {
                        router.push({ name: 'EventDetails', params: { eventId: towerEvent.id } })
                    }
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