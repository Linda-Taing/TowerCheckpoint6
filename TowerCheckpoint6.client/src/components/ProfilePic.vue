<template>
    <form @submit.prevent="createProfilePic()">
        <div class="modal-body">
            <div class="mb-3">
                <label for="coverImg" class="form-label">Event Image</label>
                <input v-model="editable.coverImg" required type="url" class="form-control" id="coverImg"
                    aria-describedby="emailHelp">
            </div>
            <div class="modal-footer">
                <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Create Album</button>
            </div>
        </div>
    </form>
</template>


<script>
import { ref } from 'vue';
import { router } from '../router.js';
import { accountService } from '../services/AccountService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
export default {
    setup() {
        const editable = ref({})
        return {
            editable




            // <<<<<<<<<<<<----------end of return--------------->>>>>>>>
        }
    }
}

</script>


<style lang="scss" scoped></style>