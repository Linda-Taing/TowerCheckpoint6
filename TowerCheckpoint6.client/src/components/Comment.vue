<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                {{ comments }}
            </div>
        </div>
    </div>
</template>


<script>

export default {
    props: {
        comment: {
            type: Comment,
        }
    },

    setup() {

        return {






            // NOTE do not pass end of return!!//
        }
    }
}
</script>


<style lang="scss" scoped></style>