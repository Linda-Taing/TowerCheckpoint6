<template>
  <h5>Tower Logo here on the Deets Page</h5>
</template>

<script>
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { commentsService } from '../services/CommentsService.js';
import { logger } from '../utils/Logger.js';


export default {


  setup() {
    const route = useRoute();
    async function getEventComments() {
      try {
        const eventId = route.params.eventId
        await commentsService.getEventComments(eventId);
      }
      catch (error) {
        Pop.error(error, '[GETTING EVENT COMMENTS]')
      }
    }

    async function getEventCommentsById() {
      try {
        const commentId = route.params.commentId;
        await commentsService.getEventCommentsById(commentId)
      } catch (error) {
        logger.log('[comments with IDs]')
        Pop.error(error)

      }
    }


    onMounted(() => {
      getEventComments();
    });
    return {


      // ---Do not pass-- VVVVV End Of Return //
    }
  }
}
</script>


<style lang="scss" scoped></style>
