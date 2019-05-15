<template>
  <div class="max-w-lg m-auto my-8">
    <div class="border p-10 border-gray-100 shadow rounded">
      <h3 class="text-2xl mb-6 text-gray-800">Sign Up</h3>
      <form @submit.prevent="signup">
        <div class="text-red" v-if="error">{{error}}</div>
        <div class="mb-6">
          <label for="email" class="label">E-mail</label>
          <input type="email" v-model="email" class="input" id="email" placeholder="Email">
        </div>
        <div class="mb-6">
          <label for="password" class="label">Password</label>
          <input
            type="password"
            v-model="password"
            class="input"
            id="password"
            placeholder="Password"
          >
        </div>
        <div class="mb-6">
          <label for="password" class="label">Password Confirmation</label>
          <input
            type="password"
            v-model="password_confirmation"
            class="input"
            id="password_confirmation"
            placeholder="Password Confirmation"
          >
        </div>
        <button
          type="submit"
          class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green-500 hover:bg-green-dark block w-full py-4 text-white items-center justify-center"
        >Sign Up</button>

        <div class="my-4">
          <router-link to="/signin" class="link link-gray-900">Sign In</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      email: "",
      password: "",
      password_confirmation: "",
      error: ""
    };
  },
  created() {
    this.checkSignedIn();
  },
  updated() {
    this.checkSignedIn();
  },
  methods: {
    signup() {
      this.$http.plain
        .post("/signup", {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
        .then(response => {
          this.signSuccessfull(response);
        })
        .catch(error => {
          this.signinFailed(error);
        });
    },
    signSuccessfull(response) {
      if (!response.data.csrf) {
        this.signinFailed(response);
        return;
      }
      window.localStorage.csrf = response.data.csrf;
      window.localStorage.signedIn = true;

      this.error = "";
      this.$router.replace("/records");
    },
    signinFailed(error) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        "Something went wrong";
      delete window.localStorage.csrf;
      delete window.localStorage.signedIn;
    },
    checkSignedIn() {
      if (window.localStorage.signedIn) {
        this.$router.replace("/records");
      }
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
