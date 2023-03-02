<template>
    <!-- <div class="container">
        <div class="row"> -->
    <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }">
        <div class="selectable card Ecard my-2 ">
            <img class="img-fluid" :src="event.coverImg" :alt="event.name">
            <div class="card-body">
                <p>{{ event.name }}</p>
                <p>{{ event.startDate }}</p>
                <p> {{ event.location }}</p>
                <p>{{ event.capacity }}</p>
                <button class="btn btn-danger">Cancel Event
                </button>
            </div>
        </div>

    </router-link>


    <!-- </div>
    </div> -->
</template>


<script>
import { TowerEvent } from '../models/TowerEvent.js';
import { useRoute } from 'vue-router';
export default {
    props: {
        event: {
            type: TowerEvent,
        }
    },
    setup() {
        const route = useRoute()
        return {
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