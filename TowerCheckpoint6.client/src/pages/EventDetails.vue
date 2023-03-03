<template>
  <h5>Tower Logo here on the Deets Page</h5>

  <div v-if="comments" class="container">
    <div class="row">
      <div class="col-md-12">
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { onMounted, computed } from 'vue';
import Pop from '../utils/Pop.js';
import { commentsService } from '../services/CommentsService.js';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';


export default {

  setup() {
    const route = useRoute();
    async function getEventComments() {
      try {
        const eventId = route.params.eventId;
        await commentsService.getEventComments(eventId);
      }
      catch (error) {
        Pop.error(error, "[GETTING EVENT COMMENTS]");
      }
    }
    async function getEventCommentsById() {
      try {
        const commentId = route.params.commentId;
        await commentsService.getEventCommentsById(commentId);
      }
      catch (error) {
        logger.log("[comments with IDs]");
        Pop.error(error);
      }
    }
    onMounted(() => {
      getEventComments();
      getEventCommentsById();
    });
    return {
      comments: computed(() => AppState.comments)
      // ---Do not pass-- VVVVV End Of Return //
    };
  },
}
</script>


<style lang="scss" scoped></style>
