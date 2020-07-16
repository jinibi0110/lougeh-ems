<template>
  <div id="subjects">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <v-app id="inspire">
          <v-data-table
            id="view-prospectus-table"
            :headers="headers"
            :items="subs"
            :search="search"
            sort-by="year"
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
                              id="year-level"
                              v-model="editedItem.year"
                              label="Year Level"
                            ></v-text-field>
                            <!-- </v-col>
                        <v-col cols="12" sm="10" md="20"> -->
                            <v-text-field
                              id="semester"
                              v-model="editedItem.semester"
                              label="Semester"
                            ></v-text-field>
                            <!-- </v-col>
                        <v-col cols="12" sm="10" md="20"> -->
                            <v-text-field
                              id="subject-code"
                              v-model="editedItem.subjectid"
                              label="Subject Code"
                            ></v-text-field>
                            <!-- </v-col>
                        <v-col cols="12" sm="10" md="20"> -->
                            <v-text-field
                              id="subject-desc"
                              v-model="editedItem.subjectdesc"
                              label="Subject Description"
                            ></v-text-field>
                            <!-- </v-col>
                        <v-col cols="12" sm="10" md="20"> -->
                            <v-text-field
                              id="creadit-points"
                              v-model="editedItem.creditpoints"
                              label="Credit Points"
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
        text: "Year Level",
        align: "left",
        sortable: true,
        value: "year",
      },
      { text: "Semester", sortable: false, value: "semester" },
      { text: "Subject Code", sortable: false, value: "subjectid" },
      { text: "Subject Description", sortable: false, value: "subjectdesc" },
      { text: "Credit Points", sortable: false, value: "creditpoints" },
    ],
    subs: [],
    editedIndex: false,
    editedItem: {
      courseid: null,
      year: null,
      semester: null,
      subjectid: "",
      subjectdesc: "",
      creditpoints: null,
    },
    defaultItem: {
      courseid: null,
      year: null,
      semester: null,
      subjectid: "",
      subjectdesc: "",
      creditpoints: null,
    },
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
    this.getSubs();
  },

  methods: {
    initialize() {
      this.subjects = [];
    },

    editItem(item) {
      this.editedIndex = this.subjects.indexOf(item);
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

    getSubs() {
      const token = localStorage.token;
      const course = localStorage.courseid;
      console.log(course);
      axios({
        method: "GET",
        url: `http://172.16.4.170:3000/api/courses/curriculum/${course}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        console.log(res.data);
        this.subs = [];
        if (isArray(res.data.view.subjects)) {
          this.subs = res.data.view.subjects.map((sub) => {
            return {
              year: sub.year,
              semester: sub.semester,
              subjectid: sub.subjectid,
              subjectdesc: sub.subjectinfo[0].subjectdesc,
              creditpoints: sub.subjectinfo[0].creditpoints,
            };
          });
          // console.log("SUBS",this.subs)
        }
      });
    },
  },
};
</script>
