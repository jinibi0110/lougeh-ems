<template>
  <div id="grade">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <v-app id="inspire">
          <v-data-table
            id="encode-grade-table"
            :headers="headers"
            :items="grades"
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
                ></v-text-field>

                <div class="flex-grow-1"></div>
                <v-dialog v-model="dialog" max-width="400px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="10" md="12">
                            <v-text-field
                              id="mark"
                              v-model="editedItem.mark"
                              label="Mark"
                            ></v-text-field>
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
                id="btn-encode"
                color="primary"
                dark
                class="mb-2"
                @click="editItem(item)"
                >Encode</v-btn
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
    switch1: "Active",
    dialog: false,
    search: "",
    headers: [
      {
        text: "Student ID",
        align: "left",
        sortable: true,
        value: "sid",
      },
      { text: "Semester", sortable: false, value: "semester" },
      { text: "School Year", sortable: false, value: "sy" },
      { text: "Subject Code", sortable: false, value: "subjectid" },
      { text: "Section", sortable: false, value: "sectionid" },
      { text: "Mark", sortable: false, value: "mark" },
      { text: "Grade", sortable: false, value: "grade" },
      { text: "Action", sortable: false, value: "action" },
    ],
    grades: [],
    editedIndex: false,
    editedItem: {
      sid: "",
      semester: "",
      sy: "",
      subjectid: "",
      sectionid: "",
      mark: "",
      grade: "",
    },
    defaultItem: {
      sid: "",
      semester: "",
      sy: "",
      subjectid: "",
      sectionid: "",
      mark: "",
      grade: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === false ? "" : "Encode Grade";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize(), this.getGrades();
  },

  methods: {
    initialize() {
      this.grades = [{}];
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
        this.editedIndex = false;
      }, 300);
    },

    getGrades() {
      const token = localStorage.token;
      axios({
        method: "GET",
        url: "http://172.16.4.170:3000/api/attempts/list",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        this.grades = [];
        if (isArray(res.data)) {
          res.data.forEach((grade) => {
            this.grades.push({
              sid: grade.student.sid,
              semester: grade.semester,
              sy: grade.sy,
              subjectid: grade.subjectid,
              mark: grade.mark,
              grade: grade.grade,
              sectionid: grade.sectionid,
            });
          });
        }
      });
    },

    save() {
      const token = localStorage.token;
      if (this.editedIndex >= 0) {
        axios({
          method: "POST",
          url: "http://172.16.4.170:3000/api/attempts/encodegrade",
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
            sid: this.editedItem.sid,
            semester: this.editedItem.semester,
            sy: this.editedItem.sy,
            subjectid: this.editedItem.subjectid,
            sectionid: this.editedItem.sectionid,
            mark: this.editedItem.mark,
          },
        })
          .then((res) => {
            this.getGrades();
          })
          .catch((err) => console.log(err.response.data));
        this.grades.push(this.editedItem);
      } else {
        //   axios ({
        //   method: "POST",
        //   url: "http://172.16.4.170:3000/api/attempts/encodegrade",
        //   headers:{
        //   authorization: `Bearer ${token}`
        //   },
        //   data: {
        //     sid:  this.editedItem.sid,
        //     semester: this.editedItem.semester,
        //     sy: this.editedItem.sy,
        //     subjectid: this.editedItem.subjectid,
        //     sectionid: this.editedItem.sectionid,
        //     mark: this.editedItem.mark
        //   }
        // }).then( res => {
        //   console.log(res)
        //   this.getGrades();
        // }).catch(err => console.log(err.response.data))
        //   this.grades.push(this.editedItem)
      }
      this.close();
    },
  },
};
</script>
