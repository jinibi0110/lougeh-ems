<template>
  <div id="subjects">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <v-app id="inspire">
          <v-data-table
            id="course-table"
            :headers="headers"
            :items="courses"
            :search="search"
            sort-by="date"
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
                ></v-text-field>

                <div class="flex-grow-1"></div>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      id="btn-add-course"
                      color="info"
                      dark
                      class="mb-2"
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
                              id="course-code"
                              v-model="editedItem.courseid"
                              label="Course Code"
                            ></v-text-field>
                            <v-text-field
                              id="course-desc"
                              v-model="editedItem.coursedesc"
                              label="Course Description"
                            ></v-text-field>
                            <v-label><h5>Status</h5></v-label>
                            <v-switch
                              id="status"
                              v-model="editedItem.status"
                              :input-value="true"
                              @change="changeState(editedItem.courseid)"
                            ></v-switch>
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
                id="btn-edit-course"
                color="success"
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
import axios from "axios";
import { isArray } from "util";

export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "Course Code",
        align: "left",
        sortable: true,
        value: "courseid",
      },
      { text: "Course Description", sortable: false, value: "coursedesc" },
      { text: "Year Commenced", sortable: false, value: "yearcommenced" },
      { text: "Status", sortable: false, value: "status" },
      { text: "Action", sortable: false, value: "action" },
    ],
    courses: [],
    editedIndex: false,
    editedItem: {
      courseid: "",
      coursedesc: "",
      yearcommenced: null,
      status: null,
    },
    defaultItem: {
      courseid: "",
      coursedesc: "",
      yearcommenced: null,
      status: "Active",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === false ? "Add Course" : "Edit Details";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize(), this.getCourses();
  },

  methods: {
    initialize() {
      this.courses = [];
    },

    editItem(item) {
      this.editedIndex = this.courses.indexOf(item);
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

    changeState(courseid) {
      const token = localStorage.token;
      axios({
        method: "DELETE",
        url: `http://172.16.4.170:3000/api/courses/${this.editedItem.courseid}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          this.getCourses();
        })
        .catch((error) => console.log(error.res));
    },

    getCourses() {
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
          res.data.view.forEach((course) => {
            this.courses.push({
              courseid: course.courseid,
              coursedesc: course.coursedesc,
              yearcommenced: course.yearcommenced,
              status: course.active ? "Active" : null,
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
          url: `http://172.16.4.170:3000/api/courses/${
            this.editedItem.courseid
          }`,
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
            courseid: this.editedItem.courseid,
            coursedesc: this.editedItem.coursedesc,
            status: this.editedItem.status,
          },
        })
          .then((res) => {
            this.getCourses();
          })
          .catch((err) => console.log(err.response.data));
        this.courses.push(this.editedItem);
      } else {
        axios({
          method: "POST",
          url: "http://172.16.4.170:3000/api/courses/add",
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
            courseid: this.editedItem.courseid,
            coursedesc: this.editedItem.coursedesc,
            yearcommenced: this.editedItem.yearcommenced,
          },
        })
          .then((res) => {
            this.getCourses();
          })
          .catch((err) => console.log(err.response));
      }
      this.close();
    },
  },
};
</script>
