<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <v-card class="mx-auto" max-width="100%">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title id="view-sid" v-model="profiles.sid"
                ><strong>{{ profiles.sid }}</strong></v-list-item-title
              >
              <v-list-item-subtitle>Student ID</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title
                id="view-given-name"
                v-model="profiles.givenname"
                ><strong>{{ profiles.givenname }}</strong></v-list-item-title
              >
              <v-list-item-subtitle>Given Name</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title id="view-last-name" v-model="profiles.surname"
                ><strong>{{ profiles.surname }}</strong></v-list-item-title
              >
              <v-list-item-subtitle>Last Name</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title id="view-dob" v-model="profiles.dob"
                ><strong>{{ profiles.dob }}</strong></v-list-item-title
              >
              <v-list-item-subtitle>Date of Birth</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title
                id="view-year-enrolled"
                v-model="profiles.yearenrolled"
                ><strong>{{ profiles.yearenrolled }}</strong></v-list-item-title
              >
              <v-list-item-subtitle>Year Enrolled</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title
                id="view-year-level"
                v-model="profiles.yearlevel"
                ><strong>{{ profiles.yearlevel }}</strong></v-list-item-title
              >
              <v-list-item-subtitle>Year Level</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title
                id="view-course-desc"
                v-model="profiles.coursedesc"
                ><strong>{{ profiles.coursedesc }}</strong></v-list-item-title
              >
              <v-list-item-subtitle>Course Description</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: () => ({
    profiles: {},
    editedIndex: false,
    editedItem: {
      sid: "",
      semester: "sgfdgfdgdf",
      sy: "",
      subjectid: "",
      sectionid: "",
      mark: "",
      grade: "",
    },
  }),
  created() {
    this.initialize(), this.getProfile();
  },

  methods: {
    initialize() {
      this.profiles = [];
    },
    editItem(item) {
      this.editedIndex = this.profiles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    getProfile() {
      const token = localStorage.token;
      const student = localStorage.uid;
      axios({
        method: "GET",
        url: `http://172.16.4.170:3000/api/students/${localStorage.uid}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        localStorage.courseid = res.data.view.course.courseid;
        this.profiles = {
          sid: res.data.view.sid,
          givenname: res.data.view.givenname,
          surname: res.data.view.surname,
          dob: moment(res.data.view.dob).format("YYYY-MM-DD"),
          yearlevel: res.data.view.yearlevel,
          yearenrolled: res.data.view.yearenrolled,
          coursedesc: res.data.view.course.coursedesc,
        };
      });
    },
  },
};
</script>
