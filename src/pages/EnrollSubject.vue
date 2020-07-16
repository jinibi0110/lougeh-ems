<template>
  <div id="enroll">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <v-app id="inspire">
          <v-data-table
            id="enroll-subjects-table"
            :headers="headers"
            :items="enrolls"
            :search="search"
            sort-by="sid"
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
                <v-dialog v-model="dialog" max-width="400px">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      id="btn-add-subject"
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
                            <v-autocomplete
                              id="student-id"
                              :items="students"
                              v-model="editedItem.sid"
                              label="Student ID"
                              clearable
                            ></v-autocomplete>
                            <v-autocomplete
                              id="subject-code"
                              :items="subjects"
                              v-model="editedItem.subjectid"
                              @change="selectSection()"
                              label="Subject Code"
                              clearable
                            ></v-autocomplete>
                            <v-autocomplete
                              id="section"
                              :items="sections"
                              v-model="editedItem.sectionid"
                              label="Section"
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
    students: [],
    subjects: [],
    sections: [],
    headers: [
      {
        text: "Student ID",
        align: "left",
        sortable: true,
        value: "sid",
      },
      { text: "Subject Code", sortable: false, value: "subjectid" },
      { text: "Section", sortable: false, value: "sectionid" },
    ],
    enrolls: [],
    editedIndex: false,
    editedItem: {
      sid: "",
      subjectid: "",
      sectionid: "",
    },
    defaultItem: {
      sid: "",
      subjectid: "",
      sectionid: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === false ? "Enroll Subject" : "";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize(),
      this.getEnroll(),
      this.selectStudent(),
      this.selectSubject();
  },
  methods: {
    selectSubject() {
      const token = localStorage.token;
      axios({
        method: "GET",
        url: "http://172.16.4.170:3000/api/subjects/list",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        this.subjects = [];
        if (isArray(res.data)) {
          res.data.forEach((sub) => {
            this.subjects.push(sub.subjectid);
          });
        }
      });
    },

    selectStudent() {
      const token = localStorage.token;
      axios({
        method: "GET",
        url: "http://172.16.4.170:3000/api/students/list",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        this.students = [];
        if (isArray(res.data)) {
          res.data.forEach((sub) => {
            this.students.push(sub.sid);
          });
        }
      });
    },

    selectSection() {
      const token = localStorage.token;
      axios({
        method: "GET",
        url: `http://172.16.4.170:3000/api/subjects/sections/${
          this.editedItem.subjectid
        }`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        console.log(res.data);
        this.sections = [];

        if (isArray(res.data.view.subjectsections)) {
          res.data.view.subjectsections.forEach((sub) => {
            this.sections.push(sub.sectionid);
          });
        }
      });
    },

    initialize() {
      this.enrolls = [];
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = false;
      }, 300);
    },

    getEnroll() {
      const token = localStorage.token;
      axios({
        method: "GET",
        url: "http://172.16.4.170:3000/api/attempts/listcurrent",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        this.enrolls = [];
        if (isArray(res.data)) {
          res.data.forEach((subject) => {
            this.enrolls.push({
              sid: subject.student.sid,
              subjectid: subject.subjectid,
              sectionid: subject.sectionid,
            });
          });
        }
      });
    },

    save() {
      const token = localStorage.token;
      if (this.editedIndex) {
      } else {
        axios({
          method: "POST",
          url: "http://172.16.4.170:3000/api/attempts/enroll",
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
            sid: this.editedItem.sid,
            subjectid: this.editedItem.subjectid,
            sectionid: this.editedItem.sectionid,
          },
        })
          .then((res) => {
            this.getEnroll();
          })
          .catch((err) => console.log(err.response));
      }
      this.close();
    },
  },
};
</script>
