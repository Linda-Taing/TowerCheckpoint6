<template>
    <!-- <div class="container">
        <div class="row"> -->
    <!-- <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }"> -->
    <div @click="setCurrentEvent()" class="selectable card Ecard my-2 ">
        <div v-if="event?.isCanceled">
            <p class="text-danger">Cancelled Event</p>
        </div>
        <img class="img-fluid" :src="event?.coverImg" :alt="event?.name">
        <div class="card-body">
            <div v-if="event?.capacity == 0">
                <p class="text-danger"> Sold-Out</p>
            </div>
            <p>{{ event?.name }}</p>
            <p>{{ event?.startDate }}</p>
            <p> {{ event?.location }}</p>
            <p>{{ event?.capacity }}</p>
            {{ event?.comments }}
        </div>
    </div>
    <!-- </router-link> -->


    <!-- </div>
    </div> -->
</template>


<script>
import { TowerEvent } from '../models/TowerEvent.js';
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import { AppState } from '../AppState.js';
import { computed } from 'vue';
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
                console.log(props);
                eventsService.setCurrentEvent(props.event)
                //FIXME router push
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