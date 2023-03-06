<template>
  <span class="navbar-text drop">
    <button class=" btn btn-success lighten-30 text-uppercase my-2 my-lg-0" @click="login" v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div class="dropdown dropstart my-4 my-lg-0">
        <div type="button" class="bg-dark border-0 selectable no-select" data-bs-toggle="dropdown" aria-expanded="false"
          title="For More Account Information click here.">
          <div v-if="account.picture || user.picture">
            <img :src="account.picture || user.picture" alt="account photo" height="100" width="100" class="square" />
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-lg-left mt-5 offset-e-5 p-0" aria-labelledby="authDropdown">
          <div class="list-group">
            <div class="col-md-12">
              <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
                <i class="mdi mdi-logout"></i>
                logout
              </div>
              <div>
                <button class="w-100 border selectable edit  p-2 rounded-top text-center border-0" data-bs-toggle="modal"
                  data-bs-target="#editProfile" @click="showModal = true">
                  Edit Profile Picture
                </button>
                <Modal id="editProfile" modal-title="Edit Profile Picture">

                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.edit {
  color: blue
}

.drop {
  margin-top: 3em;
}
</style>
