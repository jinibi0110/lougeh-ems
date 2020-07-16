<template>
  <div id="subjects">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <v-app id="inspire">
          <v-data-table
            id="subject-table"
            :headers="headers"
            :items="subjects"
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
                ></v-text-field>

                <div class="flex-grow-1"></div>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      id="add-subject"
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
                              id="subject-code"
                              v-model="editedItem.subjectid"
                              label="Subject Code"
                            ></v-text-field>
                            <v-text-field
                              id="subject-desc"
                              v-model="editedItem.subjectdesc"
                              label="Subject Description"
                            ></v-text-field>
                            <v-text-field
                              id="credit-points"
                              v-model="editedItem.creditpoints"
                              label="Credit Points"
                            ></v-text-field>
                            <v-label><h5>Status</h5></v-label>
                            <v-switch
                              id="status"
                              v-model="editedItem.status"
                              :input-value="true"
                              @change="changeState(editedItem.subjectid)"
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
                id="btn-edit-subject"
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
import axios from "axios";
import { isArray } from "util";

export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "Subject Code",
        align: "left",
        sortable: true,
        value: "subjectid",
      },
      { text: "Subject Description", sortable: false, value: "subjectdesc" },
      { text: "Credit Points", sortable: false, value: "creditpoints" },
      { text: "Status", sortable: false, value: "status" },
      { text: "Action", sortable: false, value: "action" },
    ],
    subjects: [],
    editedIndex: false,
    editedItem: {
      subjectid: "",
      subjectdesc: "",
      creditpoints: null,
      status: "Active",
    },
    defaultItem: {
      subjectid: "",
      subjectdesc: "",
      creditpoints: null,
      status: "Active",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === false ? "Add Subject" : "Edit Details";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize(), this.getSubjects();
  },

  methods: {
    initialize() {
      this.subjects = [{}];
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

    changeState(subjectid) {
      const token = localStorage.token;
      axios({
        method: "DELETE",
        url: `http://172.16.4.170:3000/api/subjects/${
          this.editedItem.subjectid
        }`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          this.getSubjects();
        })
        .catch((error) => console.log(error.res.data));
    },

    getSubjects() {
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
          res.data.forEach((subject) => {
            this.subjects.push({
              subjectid: subject.subjectid,
              subjectdesc: subject.subjectdesc,
              creditpoints: subject.creditpoints,
              status: subject.active ? "Active" : null,
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
          url: `http://172.16.4.170:3000/api/subjects/${
            this.editedItem.subjectid
          }`,
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
            subjectdesc: this.editedItem.subjectdesc,
            creditpoints: this.editedItem.creditpoints,
          },
        })
          .then((res) => {
            this.getSubjects();
          })
          .catch((err) => console.log(err.response.data));
        this.subjects.push(this.editedItem);
      } else {
        axios({
          method: "POST",
          url: "http://172.16.4.170:3000/api/subjects/add",
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
            subjectid: this.editedItem.subjectid,
            subjectdesc: this.editedItem.subjectdesc,
            creditpoints: this.editedItem.creditpoints,
          },
        })
          .then((res) => {
            this.getSubjects();
          })
          .catch((err) => console.log(err.response));
      }
      this.close();
    },
  },
};
</script>
