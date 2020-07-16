<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <center>
              <h1>
                E-STUDYANTE
              </h1>
              <h5>Lou Geh University Enrollment Management System</h5>
            </center>
            <br />
            <v-card class="elevation-12">
              <v-toolbar color="info" dark flat>
                <v-toolbar-title>Sign In</v-toolbar-title>

                &nbsp;
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    id="user-id"
                    label="User ID"
                    name="uid"
                    prepend-icon="person"
                    type="id"
                    v-model="input.uid"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="input.password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn id="btn-sign-in" color="info" @click="login()"
                  >Sign In</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "signin",
  data() {
    return {
      input: {
        uid: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      axios({
        method: "POST",
        headers: { "Content-type": "application/json" },
        url: "http://172.16.4.170:3000/login",
        data: {
          uid: this.input.uid,
          password: this.input.password,
        },
      })
        .then((res) => {
          localStorage.uid = res.data.accountInfo.uid;
          localStorage.courseid = res.data.courseid;
          localStorage.token = res.data.token;
          if (res.data.accountInfo.roleid === 1) {
            this.$router.push("/student");
            this.course.courseid;
          } else if (res.data.accountInfo.roleid === 2) {
            this.$router.push("/registrar");
          } else if (res.data.accountInfo.roleid === 3) {
            this.$router.push("/dashboard");
          }
        })
        .catch((err) => {
          // alert(err.message)
        });
    },
  },
};
</script>
