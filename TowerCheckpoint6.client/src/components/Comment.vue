<template>
    <div class="component">


    </div>
</template>


<script>
import { onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { useRoute } from 'vue-router';

export default {

    setup() {
        async function getEventComments() {
            try {
                const eventId = route.params.eventId
                await commentsService.getEventComments(eventId);
            }
            catch (error) {
                Pop.error(error, '[GETTING EVENT COMMENTS]')
            }
        }
        onMounted(() => {
            getEventComments();
        });
        const route = useRoute();
        return {






            // NOTE do not pass end of return!!//
        }
    }
}
</script>


<style lang="scss" scoped></style>