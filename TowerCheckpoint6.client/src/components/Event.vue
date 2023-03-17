<template>
    <div @click="setCurrentEvent(event.id)" class="selectable card Ecard my-2 ">
        <div v-if="event?.isCanceled">
            <p class="text-danger fs-3 text-center fw-bold">Cancelled Event</p>
        </div>
        <div v-if="event?.capacity == 0">
            <p class="text-danger fs-3 text-center fw-bold"> Sold-Out</p>
        </div>
        <img class="img-fluid" :src="event?.coverImg" :alt="event?.name">
        <div class="card-body">
            <p>{{ event?.name }}</p>
            <p>{{ event.type }}</p>
            <p>{{ event?.startDate }}</p>
            <p> {{ event?.location }}</p>
            <p>{{ event?.capacity }}</p>
            {{ event?.comments }}
        </div>
    </div>
</template>


<script>
import { TowerEvent } from '../models/TowerEvent.js';
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import { router } from '../router.js';
export default {
    props: {
        event: {
            type: TowerEvent,
        }
    },
    setup(props) {
        const route = useRoute()
        return {
            setCurrentEvent() {
                eventsService.setCurrentEvent(props.event)
                router.push({ name: 'EventDetails', params: { eventId: props.event.id } })
            },


            //-----NOTE end of return----------//
        }
    }
}
</script>


<style lang="scss" scoped>
.ECard {
    height: 40vh;
    overflow: hidden;
    text-shadow: 0 0 4px black;
    letter-spacing: .07rem;

    img {
        height: 30vh;
        object-fit: cover;
        object-position: bottom;
    }
}
</style>