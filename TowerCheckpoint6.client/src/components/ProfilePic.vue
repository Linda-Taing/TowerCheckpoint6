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
            <div class="modal-footer">
                <button type="reset" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Create Album</button>
            </div>
        </div>
    </form>
</template>


<script>
export default {
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped></style>