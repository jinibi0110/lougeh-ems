<template>
  <div id="grade">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <v-app id="inspire">
          <v-data-table
            id="view-grades-table"
            :headers="headers"
            :items="grades"
            :search="search"
            sort-by="subjectid"
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
                <v-dialog v-model="dialog" max-width="300px">
                  <v-card>
                    <v-card-title>
                      <!-- <span class="headline">{{ formTitle }}</span> -->
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="10" md="20">
                            <v-text-field
                              id="subject-code"
                              v-model="editedItem.subjectid"
                              label="Subject Code"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="10" md="20">
                            <v-text-field
                              id="subject-desc"
                              v-model="editedItem.subjectdesc"
                              label="Subject Description"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="10" md="20">
                            <v-text-field
                              id="grade"
                              v-model="editedItem.grade"
                              label="Grade"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="10" md="20">
                            <v-text-field
                              id="mark"
                              v-model="editedItem.mark"
                              label="Mark"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
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
    switch1: "Active",
    dialog: false,
    search: "",
    headers: [
      {
        text: "Subject Code",
        align: "left",
        value: "subjectid",
      },
      { text: "Mark", value: "mark" },
      { text: "Grade", value: "grade" },
    ],
    grades: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
    this.getGrades();
  },

  methods: {
    initialize() {
      this.grades = [
        {
          // subjectid: "IT111",
          // subjectdesc: "Digital Techniques and Fundamentals",
          // grade: "B",
          // mark: "90"
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.grades.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    getGrades() {
      const token = localStorage.token;
      const student = localStorage.uid;
      axios({
        method: "POST",
        url: "http://172.16.4.170:3000/api/students/grade",
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          sid: student,
        },
      }).then((res) => {
        console.log(res.data);
        this.grades = [];
        if (isArray(res.data.view.grades)) {
          res.data.view.grades.forEach((grade) => {
            this.grades.push({
              subjectid: grade.subjectid,
              mark: grade.mark,
              grade: grade.grade,
            });
          });
        }
      });
    },
  },
};
</script>
