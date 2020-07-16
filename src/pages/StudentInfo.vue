<template>
  <div id="student">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <v-app id="inspire">
          <v-data-table
            id="student-info-table"
            :headers="headers"
            :items="students"
            :search="search"
            sort-by="sectionid"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-text-field
                  id="search"
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                >
                </v-text-field>

                <div class="flex-grow-1"></div>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      id="add-student-info"
                      color="info"
                      dark
                      class="mb-1"
                      v-on="on"
                      >Add</v-btn
                    >
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="10" md="12">
                            <v-text-field
                              id="given-name"
                              v-model="editedItem.givenname"
                              label="Given Name"
                            ></v-text-field>
                            <v-text-field
                              id="last-name"
                              v-model="editedItem.surname"
                              label="Last Name"
                            ></v-text-field>
                            <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              :return-value.sync="date"
                              transition="scale-transition"
                              offset-y
                              full-width
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  id="dob"
                                  v-model="editedItem.dob"
                                  label="Date of Birth"
                                  readonly
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                id="date-picker"
                                v-model="editedItem.dob"
                                @input="menu = false"
                              >
                              </v-date-picker>
                            </v-menu>
                            <v-text-field
                              id="year-level"
                              v-model="editedItem.yearlevel"
                              label="Year Level"
                            ></v-text-field>
                            <v-autocomplete
                              id="course-code"
                              :items="courses"
                              v-model="editedItem.courseid"
                              label="Course Code"
                              clearable
                            ></v-autocomplete>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn
                        id="btn-cancel"
                        color="default darken-1"
                        text
                        @click="close"
                        >Cancel</v-btn
                      >
                      <v-btn
                        id="btn-save"
                        color="blue darken-1"
                        text
                        @click="save"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn
                id="btn-edit-student-info"
                color="primary"
                dark
                class="mb-2"
                @click="editItem(item)"
                >Edit</v-btn
              >
            </template>
          </v-data-table>
        </v-app>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { isArray } from "util";

export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    switch1: "Active",
    dialog: false,
    courses: [],
    search: "",
    headers: [
      {
        text: "Student ID",
        align: "left",
        sortable: true,
        value: "sid",
      },
      { text: "Given Name", sortable: true, value: "givenname" },
      { text: "Last Name", sortable: true, value: "surname" },
      { text: "Date of Birth", sortable: false, value: "dob" },
      { text: "Year Level", sortable: false, value: "yearlevel" },
      { text: "Year Enrolled", sortable: false, value: "yearenrolled" },
      { text: "Course Code", sortable: true, value: "courseid" },
      { text: "Action", sortable: false, value: "action" },
    ],
    students: [],
    editedIndex: false,
    editedItem: {
      sid: null,
      givenname: null,
      surname: null,
      dob: null,
      yearlevel: null,
      yearenrolled: null,
      courseid: null,
    },
    defaultItem: {
      sid: null,
      givenname: null,
      surname: null,
      dob: null,
      yearlevel: null,
      yearenrolled: null,
      courseid: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === false
        ? "Add Student Information"
        : "Edit Details";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize(), this.getInfo(), this.selectCourse();
  },

  methods: {
    selectCourse() {
      const token = localStorage.token;
      axios({
        method: "GET",
        url: "http://172.16.4.170:3000/api/courses/list",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        this.courses = [];
        if (isArray(res.data.view)) {
          res.data.view.forEach((sub) => {
            this.courses.push(sub.courseid);
          });
        }
      });
    },

    initialize() {
      this.students = [{}];
    },

    editItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = false;
      }, 300);
    },

    getInfo() {
      const token = localStorage.token;
      axios({
        method: "GET",
        url: "http://172.16.4.170:3000/api/students/list",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        this.students = [];
        //console.log(res)
        if (isArray(res.data)) {
          res.data.forEach((student) => {
            this.students.push({
              sid: student.sid,
              givenname: student.givenname,
              surname: student.surname,
              dob: moment(student.dob).format("YYYY-MM-DD"),
              yearlevel: student.yearlevel,
              yearenrolled: student.yearenrolled,
              courseid: student.course.courseid,
            });
          });
        }
      });
    },

    save() {
      const token = localStorage.token;
      if (this.editedIndex) {
        axios({
          method: "PUT",
          url: `http://172.16.4.170:3000/api/students/${this.editedItem.sid}`,
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
            sid: this.editedItem.sid,
            givenname: this.editedItem.givenname,
            surname: this.editedItem.surname,
            dob: this.editedItem.dob,
            yearlevel: parseInt(this.editedItem.yearlevel),
            yearenrolled: this.editedItem.yearenrolled,
            courseid: this.editedItem.courseid,
          },
        })
          .then((res) => {
            if (res.status === 200) {
              this.getInfo();
            }
          })
          .catch((err) => console.log(err.response.data));
        this.students.push(this.editedItem);
      } else {
        axios({
          method: "POST",
          url: "http://172.16.4.170:3000/api/students/add",
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
            givenname: this.editedItem.givenname,
            surname: this.editedItem.surname,
            dob: this.editedItem.dob,
            yearlevel: parseInt(this.editedItem.yearlevel),
            yearenrolled: this.editedItem.yearenrolled,
            courseid: this.editedItem.courseid,
          },
        })
          .then((res) => {
            this.getInfo();
          })
          .catch((err) => console.log(err.response));
      }
      this.close();
    },
  },
};
</script>
