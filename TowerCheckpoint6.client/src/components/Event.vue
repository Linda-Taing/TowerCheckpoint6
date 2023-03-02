<template>
    <!-- <div class="container">
        <div class="row"> -->
    <div class="card Ecard ">
        <img class="" :src="event.coverImg" :alt="event.name">
        {{ event.name }}
        {{ event.startDate }}
        {{ event.location }}
        {{ event.capacity }}
    </div>
    <!-- </div>
    </div> -->
</template>


<script>
export default {
    props: {
        event: {
            type: Event,
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