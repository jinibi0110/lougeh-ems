<template>
  <div id="syear">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <v-app id="inspire">
          <v-data-table
            id="school-year-table"
            :headers="headers"
            :items="schools"
            :search="search"
            sort-by="sy"
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
                  <template v-slot:activator="{ on }">
                    <v-btn
                      id="add-school-year"
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
                              id="school-year"
                              v-model="editedItem.sy"
                              label="School Year"
                            ></v-text-field>
                            <v-text-field
                              id="semester"
                              v-model="editedItem.semester"
                              label="Semester"
                            ></v-text-field>
                            <v-switch
                              id="status"
                              v-model="editedItem.status"
                              :input-value="true"
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
                      <v-btn color="btn-save" text @click="save">Save</v-btn>
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
    //switch1: 'Active',
    dialog: false,
    search: "",
    headers: [
      {
        text: "School Year",
        align: "left",
        sortable: true,
        value: "sy",
      },
      { text: "Semester", sortable: false, value: "semester" },
      { text: "Status", sortable: false, value: "status" },
    ],
    schools: [],
    editedIndex: false,
    editedItem: {
      sy: "",
      semester: null,
      status: "Active",
    },
    defaultItem: {
      sy: "",
      semester: null,
      status: "Active",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === true ? "" : "Add School Year";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize(), this.getSchoolYears();
  },

  methods: {
    initialize() {
      this.schools = [{}];
    },

    editItem(item) {
      this.editedIndex = this.schools.indexOf(item);
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

    getSchoolYears() {
      const token = localStorage.token;
      axios({
        method: "GET",
        url: "http://172.16.4.170:3000/api/sy/list",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        this.schools = [];
        if (isArray(res.data.view)) {
          res.data.view.forEach((school) => {
            this.schools.push({
              sy: school.sy,
              semester: school.semester,
              status: school.active ? "Active" : null,
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
          url: "http://172.16.4.170:3000/api/sy/add",
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
            sy: this.editedItem.sy,
            semester: this.editedItem.semester,
          },
        })
          .then((res) => {
            this.getSchoolYears();
          })
          .catch((err) => console.log(err.response));
      }
      this.close();
    },
  },
};
</script>
