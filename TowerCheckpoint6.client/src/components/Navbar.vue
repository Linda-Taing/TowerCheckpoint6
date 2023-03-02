<template>
  <div class="container">
    <div class="row">
      <div class="col-md-11">
        <div class="d-flex justify-content-center mt-3">
          <Login />
        </div>
        <!-- NOTE hide later when turning in project -->
        <!-- NOTE do not need this as a client choosing page. -->
        <div>
          <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="d-flex justify-content-center mt-3" id="navbarText">
                <ul class="navbar-nav ">
                  <li>
                    <router-link :to="{ name: 'Event Details' }"
                      class="btn text-success lighten-30 selectable text-uppercase">
                      Event Details
                    </router-link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md-11 d-flex justify-content-center">
              <nav class=" navbar navbar-expand-lg navbar-dark bg-dark mt-3 mb-0">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                  aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                  <ul class="navbar-nav ">
                    <li>
                      <router-link :to="{ name: 'Home' }"
                        class=" mt-3 btn text-success lighten-30 selectable text-uppercase">
                        <div class="d-flex flex-column align-items-center">
                          <p>home</p>
                        </div>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md-11 d-flex justify-content-center">
              <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                  aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                  <ul class="navbar-nav ">
                    <li>
                      <router-link :to="{ name: 'Account' }"
                        class=" btn text-success lighten-30 selectable text-uppercase">
                        <div class="list-group-item dropdown-item list-group-item-action">
                          Account
                        </div>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState.js';
import Login from './Login.vue'
import { ref } from 'vue';
import { computed } from 'vue';
import { router } from '../router.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      events: computed(() => AppState.events),

      async createEvent() {
        try {
          const formData = editable.value
          await eventsService.createEvent(formData)
          editable.value = {}
          router.push({ name: 'Events Page', params: { eventId: TowerEvent.id } })
        } catch (error) {
          logger.log(error)
          Pop.error(error)
        }
      },
      //NOTE do not go below end of return VVV//
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
