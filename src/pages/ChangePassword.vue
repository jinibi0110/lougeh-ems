<template>
  <div class="ui stackable grid container">
    <div class="eight wide column">
      <div class="ui segment">
        <h2 class="ui dividing header">Change Password</h2>

        <form class="ui form" @submit.prevent="changePassword">
          <div class="field" :class="{ error: errors.has('password') }">
            <label>Current Password</label>
            <input
              id="current-password"
              type="password"
              name="password"
              v-model="password"
              data-vv-as="current password"
              v-validate="'required'"
            />
            <span v-show="errors.has('password')" class="is-danger">{{
              errors.first("password")
            }}</span>
          </div>

          <div class="field" :class="{ error: errors.has('newPassword') }">
            <label>New Password</label>
            <input
              id="new-password1"
              type="password"
              name="newPassword"
              v-model="newPassword"
              data-vv-as="new password"
              v-validate="'required'"
            />
            <span v-show="errors.has('newPassword')" class="is-danger">{{
              errors.first("newPassword")
            }}</span>
          </div>

          <div class="field" :class="{ error: errors.has('confirmPassword') }">
            <label>New Password</label>
            <input
              id="new-password2"
              type="password"
              name="confirmPassword"
              v-model="confirmPassword"
              data-vv-as="confirm password"
              v-validate="'required|confirmed:newPassword'"
            />
            <span v-show="errors.has('confirmPassword')" class="is-danger">{{
              errors.first("confirmPassword")
            }}</span>
          </div>

          <button
            id="btn-password"
            type="submit"
            class="ui button primary"
            :disabled="!isFormValid"
          >
            Change password
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfileEditForm",

  data() {
    return {
      password: "",
      newPassword: "",
      confirmPassword: "",
      notification: {
        message: "",
        type: "",
      },
    };
  },
  computed: {
    isFormValid() {
      return Object.keys(this.fields).every((key) => this.fields[key].valid);
    },
  },
  beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem("token");
    return token ? next() : next("/signin");
  },
  methods: {
    changePassword() {
      const token = localStorage.getItem("token");
      axios
        .post(
          "/api/accounts/updatepass",
          {
            password: this.password,
            newPassword: this.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          // clear form inputs
          this.password = this.newPassword = this.confirmPassword = "";
          // display success notification
          this.notification = Object.assign({}, this.notification, {
            message: response.data.message,
            type: "success",
          });
        })
        .catch((error) => {
          // clear form inputs
          this.password = this.newPassword = this.confirmPassword = "";
          // clear form error messages
          this.$nextTick(() => {
            this.$validator.reset();
          });
          // display error notification
          this.notification = Object.assign({}, this.notification, {
            message: error.response.data.message,
            type: "danger",
          });
        });
    },
  },
};
</script>
