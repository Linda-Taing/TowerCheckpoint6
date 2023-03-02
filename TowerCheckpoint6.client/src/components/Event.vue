<template>
    <!-- <div class="container">
        <div class="row"> -->
    <div class="selectable card Ecard my-2 ">
        <img class="" :src="event.coverImg" :alt="event.name">
        <div class="card-body">
            <p>{{ event.name }}</p>
            <p>{{ event.startDate }}</p>
            <p> {{ event.location }}</p>
            <p>{{ event.capacity }}</p>




        </div>
    </div>
    <!-- </div>
    </div> -->
</template>


<script>
import { TowerEvent } from '../models/Event.js';
export default {
    props: {
        event: {
            type: TowerEvent,
        }
    },
    setup() {
        return {}
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